import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Program, Provider } from '@project-serum/anchor';
import {
   getHashedName,
   getNameAccountKey,
   NameRegistryState,
} from "@bonfida/spl-name-service";

import NFTShowCase from "components/spot/nftshowcase/nftshowcase"
import ProfileHeader from "components/spot/profileHeader/profileHeader"
import BackgroundElements from "components/spot/backgroundElements/backgroundElements"
import StatisticsWidget from "components/spot/statisticsWidget/statisticsWidget"


import * as SupportFunctions from "services/general";
import idl from 'idl.json';
import './spot.css'
import { set } from 'react-ga';
import SolSpotLogoIcon from 'assets/solspot_logo_icon';

// Get our program's id from the IDL file.
const programID = new PublicKey(idl.metadata.address);

// Set our network to devnet.
// Set for searching for data.
const network = clusterApiUrl('devnet');


// Controls how we want to acknowledge when a transaction is "done".
const opts = {
   preflightCommitment: "processed"
}

// A67Ry58HhJs9FAz14K38cHRKoCFsnWyppRcCZD87B5Rf

const Spot = (props) => {
   const { searchedKey } = useParams();
   const [address, setAddress] = useState(null);
   const [loading, setLoading] = useState(true);
   const [profileData, setProfileData] = useState(null);
   const [nftData, setNftData] = useState(null);

   const getProvider = () => {
      const connection = new Connection(network, opts.preflightCommitment);
      const provider = new Provider(
         connection, window.solana, opts.preflightCommitment,
      );
      return provider;
   }

   const formatURL = (givenURL) => {
      if (givenURL == "") return;

      let url;
      if (givenURL.slice(0, 8) == "https://") {
         url = givenURL;
      }
      else {
         url = "https://" + givenURL;
      }
      return url;
   }

   const loadProfile = async (address) => {
      try {
         if (address !== undefined) {
            const provider = getProvider();
            const program = new Program(idl, programID, provider);
            const profile = await program.account.profile.all([
               {
                  memcmp: {
                     offset: 8, // Discriminator.
                     bytes: address,
                  }
               }
            ]);
            setProfileData(profile[0].account);
            setLoading(false);
         }
      } catch (error) {
         console.log("Error Loading Profile", error)
      }
   }

   const renderContentList = () => {
      if (profileData !== null && profileData.linkList.length > 0) {
         return (
            <div className="spot-content-list">
               {profileData.linkList.map((item, index) => (
                  <a href={formatURL(item.url)} className="spot-content-list-item" key={item.id} target="_blank" rel="noopener">
                     {item.name}
                  </a>
               ))}
            </div>
         )
      }
   }

   const renderYouTubeWidget = () => {

      if (profileData == null) return;

      const formatYoutubeEmbed = (url) => {
         let embedURL = "https://www.youtube.com/embed/" + url;
         return embedURL;
      }

      if (profileData.youtubeVid !== "") {
         return (
            <iframe
               className="spot-youtube"
               allow="fullscreen"
               mozallowfullscreen="mozallowfullscreen"
               msallowfullscreen="msallowfullscreen"
               oallowfullscreen="oallowfullscreen"
               webkitallowfullscreen="webkitallowfullscreen"
               src={formatYoutubeEmbed(profileData.youtubeVid)}
            />
         )
      }
   }


   // Long live Solana cookbook.
   const domainSearch = async (domain) => {
      const hashedName = await getHashedName(domain.replace(".sol", ""));
      const nameAccountKey = await getNameAccountKey(
         hashedName,
         undefined,
         new PublicKey("58PwtjSDuFHuUkYjH9BYnnQKHfwo9reZhC2zMJv9JPkx") // SOL TLD Authority
      );
      const owner = await NameRegistryState.retrieve(
         new Connection("https://ssc-dao.genesysgo.net/", "confirmed"),
         nameAccountKey
      );
      let address = owner.owner.toBase58();
      return address;
   }


   // UseEffects
   useEffect(async () => {
      // this is not a good check, but its hackathon time. need a real check in the future;
      if (searchedKey.length == 44) {
         // assume is solana address
         setAddress(searchedKey)
         loadProfile(searchedKey);
         setLoading(false);
         setNftData(await SupportFunctions.getNFTData(searchedKey));
      }
      else {
         // assume domain name
         let domain = searchedKey;
         let temp_address = await domainSearch(domain);
         setAddress(temp_address);
         setLoading(false);
         setNftData(await SupportFunctions.getNFTData(temp_address));
      }
   }, []);


   if (!loading)
      return (
         <div className="spot-main">
            <ProfileHeader wallet_address={address} profile={profileData} nftData={nftData} />
            {renderContentList()}

            {renderYouTubeWidget()}

            <StatisticsWidget wallet_address={address} nftData={nftData} />

            <NFTShowCase wallet_address={address} nftData={nftData} />
            <Link to={"/"} onClick={() => { window.scrollTo(0, 0); }} className="spot-solspot-footer-logo"><SolSpotLogoIcon style={{ width: 100, marginTop: 80 }} /></Link>
            <BackgroundElements profile_data={profileData} />
         </div>
      )
   else
      return (
         <div></div>
      )
};

export default Spot;

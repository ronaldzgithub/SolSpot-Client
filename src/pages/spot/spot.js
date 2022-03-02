import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import NFTShowCase from "components/spot/nftshowcase/nftshowcase"
import ProfileHeader from "components/spot/profileHeader/profileHeader"
import BackgroundElements from "components/spot/backgroundElements/backgroundElements"

import './spot.css'
import * as SupportFunctions from "services/general";
import idl from 'idl.json';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Program, Provider } from '@project-serum/anchor';
import { Link } from 'react-router-dom';

// Get our program's id from the IDL file.
const programID = new PublicKey(idl.metadata.address);

// Set our network to devnet.
const network = clusterApiUrl('devnet');


// Controls how we want to acknowledge when a transaction is "done".
const opts = {
   preflightCommitment: "processed"
}

// A67Ry58HhJs9FAz14K38cHRKoCFsnWyppRcCZD87B5Rf

const Spot = () => {
   const { searchedPublicKey } = useParams();
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
      let url = "https://" + givenURL;
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
                  <a href={formatURL(item.url)} className="spot-content-list-item" key={item.id}>

                     {item.name}

                  </a>
               ))}
            </div>
         )
      }
   }

   // UseEffects
   useEffect(async () => {
      loadProfile(searchedPublicKey);
      setNftData(await SupportFunctions.getNFTData(searchedPublicKey));
   }, []);

   return (
      <div className="spot-main">
         <ProfileHeader wallet_address={searchedPublicKey} profile={profileData} nftData={nftData} />
         {renderContentList()}

         <iframe
            className="spot-youtube"
            allow="fullscreen"
            mozallowfullscreen="mozallowfullscreen"
            msallowfullscreen="msallowfullscreen"
            oallowfullscreen="oallowfullscreen"
            webkitallowfullscreen="webkitallowfullscreen"
            src="https://www.youtube.com/embed/gVhtB0W8sMk"
         />

         <NFTShowCase wallet_address={searchedPublicKey} nftData={nftData} />
         <Link to={"/"} className="spot-solspot-footer-logo">solspot</Link>
         <BackgroundElements />
      </div>
   )
};

export default Spot;

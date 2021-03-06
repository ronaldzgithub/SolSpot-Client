import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { ChromePicker } from "react-color"
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import Alert from '@mui/material/Alert';

import BackgroundElements from 'components/spot/backgroundElements/backgroundElements';
import FloatingSpeedDial from "components/speedDial/speedDial"
import WelcomePopup from 'components/welcomePopup/welcomePopup';
import Domain from "components/domain/domain"
import NFTShowCase from 'components/spot/nftshowcase/nftshowcase';
import CreateContentList from "components/createContentList/createContentList";
import CreateYoutubeWidget from "components/create/youtubeWidget/youtubeWidget"
import StatisticsWidget from "components/spot/statisticsWidget/statisticsWidget"


import * as SupportFunctions from "services/general"
import PlanetSVG from "assets/planetSVG";

import ExpandMoreIcon from "assets/svgs/expandMoreIcon"

import idl from 'idl.json';
import "./create.css"
import SolSpotLogoIcon from 'assets/solspot_logo_icon';


// SystemProgram is a reference to the Solana runtime!
const { SystemProgram } = web3;

// Get our program's id from the IDL file.
const programID = new PublicKey(idl.metadata.address);

// Set our network to devnet.
const network = clusterApiUrl('devnet');

// Controls how we want to acknowledge when a transaction is "done".
const opts = {
   preflightCommitment: "processed"
}

const getItemStyle = (isDragging, draggableStyle) => ({
   // some basic styles to make the items look a bit nicer
   userSelect: "none",
   borderRadius: 10,
   // change background colour if dragging
   background: isDragging && 'gray',

   // styles we need to apply on draggables
   ...draggableStyle
});


const Create = () => {

   // profile address of the loaded profile
   const [profileAddress, setProfileAddress] = useState("");

   // loaded profile data from the blockchain
   const [currentProfile, setCurrentProfile] = useState(null);
   const [loadedProfile, setLoadedProfile] = useState(null);
   const [hasInitialized, setHasInitialized] = useState(false);

   // is or is not loading
   const [profileHasChanged, setProfileHasChanged] = useState(false);
   const [nftData, setNftData] = useState(null);
   const [loading, setLoading] = useState(true);

   // public key of wallet
   const { publicKey } = useWallet();

   const handleContentListUpdate = (arr) => {
      let obj = currentProfile;
      obj.linkList = arr;
      setCurrentProfile({ ...obj })
   }

   const resetProfileData = () => {
      setCurrentProfile(loadedProfile);
   }

   const deleteProfileAccount = async () => {
      try {
         console.log("delete profile")
         const provider = getProvider();
         const program = new Program(idl, programID, provider);
         const user = program.provider.wallet.publicKey;

         // update the profile
         await program.rpc.deleteProfile({
            accounts: {
               profile: profileAddress,
               user,
            },
         });
         setHasInitialized(false);
         console.log("Updated the profile at the following address: ", profileAddress)
      } catch (error) {
         console.log("Error updating the Profile account:", error)
      }
   }



   const getProvider = () => {
      try {
         const connection = new Connection(network, opts.preflightCommitment);
         const provider = new Provider(
            connection, window.solana, opts.preflightCommitment,
         );
         return provider;
      } catch (error) {
         console.log("Get Provider Error: ", error)
      }

   }


   const loadProfile = async (passed_public_key) => {
      try {
         const provider = getProvider();
         const program = new Program(idl, programID, provider);
         let profile_data = await program.account.profile.all([
            {
               memcmp: {
                  offset: 8, // Discriminator.
                  bytes: passed_public_key,
               }
            }
         ]);
         console.log(profile_data)

         if (profile_data.length > 0 && profile_data !== []) {
            setProfileAddress(profile_data[0].publicKey);
            setCurrentProfile(profile_data[0].account);
            let profile_item = profile_data[0].account;
            let obj = {
               "bio": profile_item.bio,
               "color": profile_item.color,
               "lightTheme": profile_item.lightTheme,
               "individual": profile_item.individual,
               "youtubeVid": profile_item.youtubeVid,
               "linkList": []
            }
            let itemf;
            for (let i = 0; i < profile_item.linkList.length; i++) {
               itemf = { "id": profile_item.linkList[i].id, "name": profile_item.linkList[i].name, "url": profile_item.linkList[i].url }
               obj.linkList.push(itemf)
            }
            console.log(obj)

            setLoadedProfile(obj);
         }
         return profile_data;
      } catch (error) {
         console.log("LOAD PROFILE ERROR: ", error);
      }
   }

   const checkIfChanged = () => {
      let profileChanged = true;
      if (loadedProfile.bio === currentProfile.bio &&
         loadedProfile.color === currentProfile.color &&
         loadedProfile.individual === currentProfile.individual &&
         loadedProfile.lightTheme === currentProfile.lightTheme
      ) {
         // not checking inner content. oh well
         profileChanged = false;
      }
      setProfileHasChanged(profileChanged);
   }

   const checkIfInit = async (passed_public_key) => {
      try {
         let profile = await loadProfile(passed_public_key);

         if (profile.length > 0 && profile !== []) {
            setHasInitialized(true);
         } else {
            setHasInitialized(false)
         }
         setLoading(false);
      } catch (error) {
         setHasInitialized(true);
         setLoading(false);
         console.log("CHECK IF INIT ERROR: ", error)
      }
   }


   /* Initialize the profile if there is not one associated to their wallet ID */
   const initializeProfile = async () => {
      if (!hasInitialized) {
         try {
            const provider = getProvider();
            const program = new Program(idl, programID, provider);

            const user = program.provider.wallet.publicKey;
            const profile_address = web3.Keypair.generate();

            await program.rpc.initialize({
               accounts: {
                  profile: profile_address.publicKey,
                  user,
                  systemProgram: SystemProgram.programId,
               },
               signers: [profile_address],
            });

            console.log("Created a new Profile w/ address:", profile_address.publicKey.toString())
            setProfileAddress(profile_address.publicKey);
            checkIfInit(publicKey);

         } catch (error) {
            console.log("Error creating Profile account:", error)
         }
      } else {
         console.log("Trying to initialize an account that already has a profile associated with it.")
      }
   }


   const updateProfileOnChain = async () => {
      try {
         const provider = getProvider();
         const program = new Program(idl, programID, provider);
         const user = program.provider.wallet.publicKey;

         // update the profile
         await program.rpc.updateProfile(currentProfile.bio, currentProfile.color,
            currentProfile.lightTheme, currentProfile.individual, currentProfile.youtubeVid, currentProfile.linkList, {
            accounts: {
               profile: profileAddress,
               user,
            },
         });
         setProfileHasChanged(false);
         console.log("Updated the profile at the following address: ", profileAddress)
      } catch (error) {
         console.log("Error updating the Profile account:", error)
      }
   }


   const changeBio = (event) => {
      if (event.target.value.length > 150) {
         console.log("greater than 150 ", event.target.value.length)
      }
      else {
         let tempProfileFromCurrentProfile = currentProfile;
         tempProfileFromCurrentProfile.bio = event.target.value;
         setCurrentProfile(tempProfileFromCurrentProfile => ({ ...tempProfileFromCurrentProfile, bio: event.target.value }));
      }
   };


   const changeColor = (event) => {
      let hex = "" + event.substring(1);
      setCurrentProfile(prevCurrentProfile => ({ ...prevCurrentProfile, color: hex }));
   };


   const youtubeVideo = (event) => {
      let obj = currentProfile;
      obj.youtubeVid = event.target.value;
      setCurrentProfile(prevCurrentProfile => ({ ...prevCurrentProfile, youtubeVid: event.target.value }));
   };

   const conditionalBtn = {
      styles: {
         paddingTop: !profileHasChanged ? "14px" : "6px",
         paddingBottom: !profileHasChanged ? "0px" : "6px",
      }
   };


   const profileContent = () => {
      return (
         <div className="c-overall-profile-container">
            <WelcomePopup />
            <div className="c-header">
               <Link to={"/" + publicKey} onClick={() => { window.scrollTo(0, 0); }} style={conditionalBtn.styles} className="c-publicViewBtn">
                  View Profile

               </Link>
               <WalletMultiButton className="wallet-btn-on-profile-page" />
            </div>
            <div className="c-profile-card">
               {nftData !== null && <img className="c-profile-card-pfp" src={nftData[0].img_url} />}
               {nftData == null && <div className="spot-profile-header-img" />}
               <Domain wallet_address={publicKey} />
               <p className="spot-profile-header-wallet">{SupportFunctions.formatAddress(publicKey.toString())}</p>
               <textarea
                  value={currentProfile.bio}
                  onChange={changeBio}
                  className="c-bio-input"
                  placeholder="Your Bio"
                  rows={5}
               />
               <Accordion sx={{ all: 'unset', width: '80%', shadow: 'none', marginBottom: "15px" }}>
                  <AccordionSummary sx={{ height: 20, borderRadius: "10px", marginBottom: "15px", backgroundColor: "#" + currentProfile.color, }} expandIcon={<ExpandMoreIcon />}>
                     <p className="c-color-square">#{currentProfile.color}</p>

                  </AccordionSummary>
                  <AccordionDetails sx={{ all: 'unset', marginBottom: "15px", width: '100%' }}>
                     <ChromePicker color={currentProfile.color} disableAlpha onChange={(event) => changeColor(event.hex)} className="c-color-picker-box" />
                  </AccordionDetails>
               </Accordion>
            </div>
            <CreateContentList contentList={currentProfile.linkList} handleContentListUpdate={handleContentListUpdate} />
            <CreateYoutubeWidget profile_data={currentProfile} update_youtube={youtubeVideo} />
            <div className="c-save-btns">
               <FloatingSpeedDial sx={{ all: 'unset', backgroundColor: 'green' }} reset_profile={resetProfileData} update_profile={updateProfileOnChain} delete_account={deleteProfileAccount} />
            </div>

            <StatisticsWidget wallet_address={publicKey} nftData={nftData} />

            <NFTShowCase wallet_address={publicKey} nftData={nftData} />
            <BackgroundElements profile_data={currentProfile} />
            <Link to={"/"} onClick={() => { window.scrollTo(0, 0); }} className="spot-solspot-footer-logo"><SolSpotLogoIcon style={{ width: 100, marginTop: 80 }} /></Link>

         </div >
      )
   };

   const initializeContent = () => {
      return (
         <div className="c-login-card">
            <PlanetSVG className="c-card-spaceSVG" />
            <div>
               <h1>You have not created a SolSpot yet!</h1>
               <p>Creating a profile costs 0.062 DevSOL.</p>
               <p>Go to https://solfaucet.com/ for free DevSOL</p>
               <button className="c-initialize-btn" onClick={() => initializeProfile()}>Create</button>
            </div>
         </div>
      )
   }

   const loginNeededContent = () => {
      return (
         <div className="c-login-card">
            <PlanetSVG className="c-card-spaceSVG" />
            <div>
               <h1>Welcome to SolSpot</h1>
               <p>Log in with any wallet!</p>
               <WalletMultiButton className="c-login-card-wallet-btn" />
            </div>
         </div>
      )
   };


   /* Oof. This hurt head. */
   const Content = () => {
      if (publicKey === undefined || publicKey === null) {
         return loginNeededContent();
      }
      else {
         if (hasInitialized) {
            return profileContent();
         }
         else if (!hasInitialized && !loading) {
            return initializeContent();
         }
      }
   }

   // UseEffects
   useEffect(async () => {
      if (publicKey) {
         checkIfInit(publicKey);
         setNftData(await SupportFunctions.getNFTData(publicKey));
      }

      if (publicKey == null) {
         setHasInitialized(false);
      }
   }, [publicKey]);

   // UseEffects
   useEffect(async () => {
      checkIfChanged()
   }, [currentProfile]);


   return (
      <div className="c-main">
         <Alert severity="info" sx={{ marginTop: "10px", position: 'absolute' }}>Solspot is using the Solana devnet. Get dev SOL at https://solfaucet.com/</Alert>
         {
            (publicKey !== null && !hasInitialized) &&
            <div className="c-header">
               <WalletMultiButton className="wallet-btn-initialize" />
            </div>
         }
         {Content()}
         {publicKey == null && <BackgroundElements profile_data={null} />}
         {!hasInitialized && <BackgroundElements profile_data={null} />}
      </div >
   )
};

export default Create;

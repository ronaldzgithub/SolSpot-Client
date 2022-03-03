import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';

import BackgroundElements from 'components/spot/backgroundElements/backgroundElements';
import FloatingSpeedDial from "components/speedDial/speedDial"
import WelcomePopup from 'components/welcomePopup/welcomePopup';
import Domain from "components/domain/domain"
import NFTShowCase from 'components/spot/nftshowcase/nftshowcase';
import CreateContentList from "components/createContentList/createContentList";

import * as SupportFunctions from "services/general"
import Space_Img from "assets/login_space.png";
import PlanetSVG from "assets/planetSVG";

import idl from 'idl.json';
import "./create.css"

let item = "https://arweave.net/WHiOxMtFT0zjA-IO2BQbKqE7Lm2bDBy20NUdH_lJ-JE";
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


const Spot = () => {

   // profile address of the loaded profile
   const [profileAddress, setProfileAddress] = useState("");

   // loaded profile data from the blockchain
   const [currentProfile, setCurrentProfile] = useState(null);
   const [loadedProfile, setLoadedProfile] = useState(null);
   const [hasInitialized, setHasInitialized] = useState(false);

   // is or is not loading
   const [profileHasChanged, setProfileHasChanged] = useState(true);
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
         for (let i = 0; i < loadedProfile.linkList.length; i++) {
            if (loadedProfile.linkList[i].name === loadedProfile.linkList[i].name
               && loadedProfile.linkList[i].url === loadedProfile.linkList[i].url
               && loadedProfile.linkList[i].id === loadedProfile.linkList[i].id
            ) {
               console.log('he')
            }
         }
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
            currentProfile.lightTheme, currentProfile.individual, currentProfile.linkList, {
            accounts: {
               profile: profileAddress,
               user,
            },
         });
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
      let obj = currentProfile;
      obj.color = event.target.value;
      setCurrentProfile(prevCurrentProfile => ({ ...prevCurrentProfile, color: event.target.value }));
   };


   const profileContent = () => {
      return (
         <div className="c-overall-profile-container">
            <WelcomePopup />
            <div className="c-header">
               <WalletMultiButton className="wallet-btn-initialize" />
            </div>

            <div className="c-profile-card">



               {nftData !== null && <img className="c-profile-card-pfp" src={nftData[0].img_url} />}
               {nftData == null && <div className="spot-profile-header-img" />}
               <Domain />
               <p className="spot-profile-header-wallet">{SupportFunctions.formatAddress(publicKey.toString())}</p>

               <textarea
                  value={currentProfile.bio}
                  onChange={changeBio}
                  className="c-bio-input"
                  placeholder="Your Bio"
                  rows={5}
               />
               <input
                  value={currentProfile.color}
                  onChange={changeColor}
                  className="c-color-input"
                  placeholder="Your color"
               />
            </div>
            <CreateContentList contentList={currentProfile.linkList} handleContentListUpdate={handleContentListUpdate} />
            <div className="c-save-btns">
               <FloatingSpeedDial reset_profile={resetProfileData} update_profile={updateProfileOnChain} />
            </div>
            <NFTShowCase wallet_address={publicKey} nftData={nftData} />
            <BackgroundElements profile_data={currentProfile} />
         </div>
      )
   };

   const initializeContent = () => {
      return (
         <div className="c-login-card">
            <PlanetSVG className="c-card-spaceSVG" />
            <div>
               <h1>You have not created a SolSpot yet!</h1>
               <p>Click create to start now!</p>
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

   return (
      <div className="c-main">
         {(publicKey !== null && !hasInitialized) &&
            <div className="c-header">
               <WalletMultiButton className="wallet-btn-initialize" />
            </div>
         }
         {Content()}
         {publicKey == null && <BackgroundElements profile_data={null} />}
      </div>
   )
};

export default Spot;

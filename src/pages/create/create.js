import React, { useState, useEffect } from 'react';
import Logo from "components/logo/logo.js";
import ConnectWallet from "components/connectWallet/connectWallet.js";
import CreateContentList from "components/createContentList/createContentList";
import idl from 'idl.json';

import "./create.css"

import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';

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


const Spot = () => {
   // wallet address of the user
   const [walletAddress, setWalletAddress] = useState("");

   // profile address of the loaded profile
   const [profileAddress, setProfileAddress] = useState("");

   // loaded profile data from the blockchain
   const [currentProfile, setCurrentProfile] = useState(null);
   const [loadedProfile, setLoadedProfile] = useState(null);

   const [bio, setBio] = useState("");
   const [contentList, setContentList] = useState([]);

   // is the user initialized or not
   // used on first load to determine what to show user
   const [userInit, setUserInit] = useState(false);

   // is or is not loading
   const [profileHasChanged, setProfileHasChanged] = useState(true);
   const [loading, setLoading] = useState(true);

   const handleWalletUpdate = (address) => {
      let newAddress = address;
      setWalletAddress(newAddress);
   }

   const handleContentListUpdate = (arr) => {
      let obj = currentProfile;
      obj.linkList = arr;
      setCurrentProfile({ ...obj })
      setContentList(arr);
      console.log("content list in parent", contentList)
   }

   const resetProfileData = () => {
      setCurrentProfile(loadedProfile);
   }


   const getProvider = () => {
      const connection = new Connection(network, opts.preflightCommitment);
      const provider = new Provider(
         connection, window.solana, opts.preflightCommitment,
      );
      return provider;
   }


   const loadProfile = async (user_wallet_address) => {
      try {
         const provider = getProvider();
         const program = new Program(idl, programID, provider);
         let profile_data = await program.account.profile.all([
            {
               memcmp: {
                  offset: 8, // Discriminator.
                  bytes: user_wallet_address,
               }
            }
         ]);

         if (profile_data.length > 0 && profile_data !== []) {

            setCurrentProfile(profile_data[0].account);
            let profile_item = profile_data[0].account;
            let obj = {
               "bio": profile_item.bio,
               "color": profile_item.bio,
               "lightTheme": profile_item.lightTheme,
               "individual": profile_item.individual,
               "linkList": []
            }
            for (let i = 0; i < profile_item.linkList.length; i++) {
               obj.linkList.push({ "name": profile_item[i].name, "url": profile_item[i].url, "id": profile_item[i].id })
            }

            setLoadedProfile(obj);


            setProfileAddress(profile_data[0].publicKey);
            // setContentList(profile_data[0].account.linkList);
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
            if (loadedProfile.linkList[i].name === contentList[i].name
               && loadedProfile.linkList[i].url === contentList[i].url
               && loadedProfile.linkList[i].id === contentList[i].id
            ) {
               console.log('he')
            }
         }
      }
      setProfileHasChanged(profileChanged);
   }

   const checkIfInit = async (init_address) => {
      try {
         let profile = await loadProfile(init_address)
         if (profile.length > 0 && profile !== []) {
            setUserInit(true);
         } else {
            setUserInit(false)
         }
         setLoading(false);
      } catch (error) {
         setUserInit(true);
         setLoading(false);
         console.log("CHECK IF INIT ERROR: ", error)
      }
   }


   /* Initialize the profile if there is not one associated to their wallet ID */
   const initializeProfile = async () => {
      if (!userInit) {
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
            checkIfInit(walletAddress);

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
            currentProfile.lightTheme, currentProfile.individual, contentList, {
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
      let tempProfileFromCurrentProfile = currentProfile;
      tempProfileFromCurrentProfile.bio = event.target.value;
      setCurrentProfile(tempProfileFromCurrentProfile => ({ ...tempProfileFromCurrentProfile, bio: event.target.value }));
   };


   const changeColor = (event) => {
      let obj = currentProfile;
      obj.color = event.target.value;
      setCurrentProfile(prevCurrentProfile => ({ ...prevCurrentProfile, color: event.target.value }));
   };


   const profileContent = () => {
      return (
         <div className="c-profile-content-container">
            <div className="c-pfp" />
            <div className="c-inputContainer">
               <input
                  value={currentProfile.bio}
                  onChange={changeBio}
                  className="c-bio-input"
                  placeholder="Your Bio"
               />
            </div>
            <div className="c-inputContainer">
               <input
                  value={currentProfile.color}
                  onChange={changeColor}
                  className="c-color-input"
                  placeholder="Your color"
               />
            </div>
            <CreateContentList contentList={contentList} handleContentListUpdate={handleContentListUpdate} />
            <div className="c-save-btns">
               <button className="c-form-submit-btn" onClick={() => resetProfileData()}>RESET</button>
               <button className="c-form-submit-btn" onClick={() => updateProfileOnChain()}>SAVE</button>
            </div>
         </div>
      )
   };

   const initializeContent = () => {
      return (
         <div>
            <button className="btn" onClick={() => initializeProfile()}>Initialize</button>
         </div>
      )
   }

   const loginNeededContent = () => {
      return (
         <div className="c-login-card">
            <h1>Login to Create Your SolSpot</h1>
            <p>You can use any wallet!</p>
            <ConnectWallet handleWalletUpdate={handleWalletUpdate} v={"connect"} />
         </div>
      )
   };

   const loadingContent = () => {
      return (
         <div>
            <p>loading bro</p>
         </div>
      )
   };


   /* Oof. This hurt head. */
   const Content = () => {
      if (!walletAddress) {
         return loginNeededContent();
      }
      else {
         if (!loading) {
            if (userInit) {
               return profileContent();
            }
            else if (!userInit) {
               return initializeContent();
            }
         } else {
            return loadingContent();
         }
      }
   }


   // UseEffects
   useEffect(() => {
      if (walletAddress) {
         checkIfInit(walletAddress);
      }
   }, [walletAddress]);


   return (
      <div className="c-main">
         <div className="c-logoContainer">
            <Logo />
            <ConnectWallet handleWalletUpdate={handleWalletUpdate} v={"disconnect"} />

         </div>
         {Content()}
      </div>
   )
};

export default Spot;

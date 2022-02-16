import React, { useState, useEffect } from 'react';
import Logo from "components/logo/logo.js";
import ConnectWallet from "components/connectWallet/connectWallet.js";
import CreateContentList from "components/createContentList/createContentList";
import idl from 'idl.json';

import "./create.css"

import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';

// SystemProgram is a reference to the Solana runtime!
const { SystemProgram, Keypair } = web3;

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
  const [loadedProfile, setLoadedProfile] = useState([]);

  const [bio, setBio] = useState("");
  const [contentList, setContentList] = useState([]);

  // is the user initialized or not
  // used on first load to determine what to show user
  const [userInit, setUserInit] = useState(false);

  // is or is not loading
  const [loading, setLoading] = useState(true);

  const handleWalletUpdate = (address) => {
    let newAddress = address;
    setWalletAddress(newAddress);
  }

  const handleContentListUpdate = (arr) => {
    setContentList(arr);
    console.log("content list in parent", contentList)
  }


  const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new Provider(
      connection, window.solana, opts.preflightCommitment,
    );
    return provider;
  }

  const checkIfInit = async () => {
    try {
      const provider = getProvider();
      const program = new Program(idl, programID, provider);
      const profile = await program.account.profile.all([
        {
          memcmp: {
            offset: 8, // Discriminator.
            bytes: walletAddress,
          }
        }
      ]);

      if (profile !== null) {
        setUserInit(true);
        setProfileAddress(profile[0].publicKey)
        setLoadedProfile(profile[0]);
        setBio(profile[0].account.bio);
        setContentList(profile[0].account.linkList);
      } else {
        setUserInit(false)
      }
      setLoading(false);
      console.log(profile[0]);

    } catch (error) {
      setUserInit(false);
      console.log("Error checking init", error)
    }

  }

  {/* Initialize the profile if there is not one associated to their wallet ID */ }
  const initializeProfile = async () => {
    console.log(userInit)
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

      } catch (error) {
        console.log("Error creating Profile account:", error)
      }
    } else {
      console.log("Trying to initialize an account that already has a profile associated with it.")
    }
  }

  /*
  const updateProfileBio = async (input) => {
    try {
      const provider = getProvider();
      const program = new Program(idl, programID, provider);

      const user = program.provider.wallet.publicKey;
      console.log("adding bio")
      // update the profile
      await program.rpc.updateBio(input, {
        accounts: {
          profile: profileAddress,
          user,
        },
      });

      console.log("Created a new Profile w/ address:", profileAddress)

    } catch (error) {
      console.log("Error creating Profile account:", error)
    }

  }
  */

  const updateProfileOnChain = async () => {
    try {
      const provider = getProvider();
      const program = new Program(idl, programID, provider);
      const user = program.provider.wallet.publicKey;

      let temp = [
        { "name": "my constructed name 0", "url": "constructed url 0", id: '0' },
        { "name": "my constructed name 1", "url": "constructed url 1", id: '1' },
        { "name": "my constructed name 2", "url": "constructed url 2", id: '2' },
      ]

      // update the profile
      await program.rpc.updateProfile(bio, contentList, {
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
    setBio(event.target.value);
  };


  const profileContent = () => {
    return (
      <div className="c-profile-content-container">

        <div className="c-pfp" />
        <div className="inputContainer">
          <input
            value={bio}
            onChange={changeBio}
            className="input"
            placeholder="Your Bio"
          />
        </div>
        <CreateContentList contentList={contentList} handleContentListUpdate={handleContentListUpdate} />
        <button className="c-form-submit-btn" onClick={() => updateProfileOnChain()}>SAVE</button>

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
      checkIfInit();
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

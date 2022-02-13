import React, { useState, useEffect } from 'react';
import Logo from "components/logo/logo.js"
import ConnectWallet from "components/connectWallet/connectWallet.js"
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
  const [bio, setBio] = useState("");
  const [walletAddress, setWalletAddress] = useState(null);
  const [profileAddress, setProfileAddress] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [userInit, setUserInit] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleWalletUpdate = (address) => {
    setWalletAddress(address);
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

      if (profile.length !== 0)
      {
        setUserInit(true);
        setProfileAddress(profile[0].publicKey)
        setProfileData(profile);
        setBio(profile[0].account.bio);
      } else {
        setUserInit(false)
      }
      setLoading(false);
      console.log(profile);

    } catch(error) {
      setUserInit(false);
      console.log("Error checking init")
    }
    
  }

  {/* Initialize the profile if there is not one associated to their wallet ID */} 
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
      
        } catch(error) {
          console.log("Error creating Profile account:", error)
        }
    } else {
      console.log("Trying to initialize an account that already has a profile associated with it.")
    }
  }

    {/* Initialize the profile if there is not one associated to their wallet ID */} 
    const addBio = async (input) => {
      if (true) {
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
        
          } catch(error) {
            console.log("Error creating Profile account:", error)
          }
      } else {
        console.log("Trying to initialize an account that already has a profile associated with it.")
      }
    }


  const changeSearch = (event) => {
      setBio(event.target.value);
  };


  const handleSubmit = () => {
      addBio(bio);
  };


  const profileContent = () => {
    return (
          <div>
          
            <div className="c-pfp" />
            <div className="searchContainer">
                <div className="inputContainer">
                    <input
                        value={bio}
                        onChange={changeSearch}
                        className="input"
                        placeholder="Your Bio"
                    />
                </div>
                <button className="btn" onClick={() => handleSubmit()}>SAVE</button>
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
      <div>
        <p>you need to login bro</p>
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


  const Content = () => {
    if (!loading)
    {
      if (!walletAddress) {
          return loginNeededContent();
        }
        else {
          if (userInit) {
            return profileContent();
          } else if (!userInit) {
            return initializeContent();
          } 
        }
    }
    else {
      return loadingContent();
    }
    
  }

  // UseEffects
  useEffect(() => {
    if (walletAddress) 
    {
      checkIfInit();
    }
  }, [walletAddress]);

  return (
    <div className="c-main">
        <div className="c-logoContainer">
          <Logo />
          <ConnectWallet handleWalletUpdate={handleWalletUpdate} />
        </div>
        {Content()}
        {walletAddress}
    </div>
  )
};

export default Spot;

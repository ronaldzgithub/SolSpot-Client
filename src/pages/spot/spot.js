import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Logo from "components/logo/logo.js"
import NFTShowCase from "components/nftshowcase/nftshowcase"
import Domain from "components/domain/domain"
import Twitter from "components/twitter/twitter"

import CopySVG from "assets/copySVG.js"
import './spot.css'
import idl from 'idl.json';
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

// A67Ry58HhJs9FAz14K38cHRKoCFsnWyppRcCZD87B5Rf

const Spot = () => {
  const { id } = useParams();
  let item = "https://arweave.net/WHiOxMtFT0zjA-IO2BQbKqE7Lm2bDBy20NUdH_lJ-JE"
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [bio, setBio] = useState("");

  const formatAddress = (address) => {
    let str = address.slice(0,4) + "...." + address.slice(-4)
    return str;
  }

  const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new Provider(
      connection, window.solana, opts.preflightCommitment,
    );
    return provider;
  }

  const loadProfile = async (address) => {
    try {
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

      setProfileData(profile);
      setBio(profile[0].account.bio);

      setLoading(false);
      console.log(profile);

    } catch(error) {
      console.log("Error checking init")
    }
    
  }

  // UseEffects
  useEffect(() => {
    if (id) 
    {
      loadProfile(id);
    }
  }, [id]);

  return (
    <div className="main">
        <div className="logoContainer">
          <Logo />
        </div>

        <div className="spot-header-card">
            <div className="col1">
              <img src={item} className="pfp" />
            </div>
            
            <div className="col2">
              <Domain id={id}  />
              <div className="address-chip">
                <CopySVG className="copy-svg" />
                <p className="address-text">{formatAddress(id)}</p>
              </div>
              <Twitter id={id}  />
              {bio}
              
            </div>
            
        </div>
        
        <NFTShowCase id={id} />
    </div>
  )
};

export default Spot;

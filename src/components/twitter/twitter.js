import React, { useState, useEffect } from 'react';
import * as web3 from "@solana/web3.js";
import { getHandleAndRegistryKey } from "@bonfida/spl-name-service";
import TwitterSVG from "assets/twitterSVG.js"
import './twitter.css'


const Twitter = (props) => {
   const [twitterHandle, setTwitterHandle] = useState("");
   const [twitterURL, setTwitterURL] = useState("");
   const [urlLoaded, setUrlLoaded] = useState(null);

   const wallet_address = props.wallet_address;
   let connection = new web3.Connection(web3.clusterApiUrl("mainnet-beta"));


   const getTwitterHandle = async (passed_wallet_address) => {
      try {
         if (wallet_address === undefined) return;
         if (wallet_address === null) return;

         const pubkey = new web3.PublicKey(passed_wallet_address);
         const data = await getHandleAndRegistryKey(connection, pubkey);
         setTwitterHandle(data[0]);
         setTwitterURL(formatTwitterURL(data[0]));
         setUrlLoaded(true);
      } catch (error) {
         console.log("No Twitter Handle for: ", props.wallet_address)
      }

   }


   const formatTwitterURL = (input) => {
      let result = input;
      result = "https://twitter.com/" + result
      return result;
   }


   // UseEffects
   useEffect(() => {
      getTwitterHandle(wallet_address);
   }, []);


   // urlLoaded
   const RenderTwitter = () => {
      if (urlLoaded) {
         return (
            <a href={twitterURL} target="_blank" rel="noreferrer" className="twitter-chip">
               <TwitterSVG className="twitter-svg" />
            </a>
         )
      }
      else {
         return (
            <div className="twitter-chip">
               <p className="twitter-name">NA</p>
            </div>
         )
      }
   }

   return (
      <div>
         <RenderTwitter />
      </div>
   )
};

export default Twitter;

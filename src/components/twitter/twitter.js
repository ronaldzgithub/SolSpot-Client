import React, { useState, useEffect } from 'react';
import * as web3 from "@solana/web3.js";
import { getHandleAndRegistryKey } from "@bonfida/spl-name-service";
import TwitterSVG from "assets/twitterSVG.js"
import './twitter.css'


const Twitter = (props) => {
   const [twitterHandle, setTwitterHandle] = useState("");
   const [twitterURL, setTwitterURL] = useState("");
   const [urlLoaded, setUrlLoaded] = useState(null);

   const address = props.wallet_id;
   let connection = new web3.Connection(web3.clusterApiUrl("mainnet-beta"));


   const getTwitterHandle = async () => {
      try {
         const pubkey = new web3.PublicKey(address);
         const data = await getHandleAndRegistryKey(connection, pubkey);
         console.log(data[0])
         setTwitterHandle(data[0]);
         setTwitterURL(formatTwitterURL(data[0]));
         setUrlLoaded(true);
      } catch (error) {
         console.log("No Twitter Handle for: ", props.id)
      }

   }


   const formatTwitterURL = (input) => {
      let result = input;
      result = "https://twitter.com/" + result
      return result;
   }


   // UseEffects
   useEffect(async () => {
      getTwitterHandle();
   }, props.id);


   const RenderTwitter = () => {
      if (urlLoaded) {
         return (
            <a href={twitterURL} target="_blank" rel="noreferrer" className="twitter-chip">
               <TwitterSVG className="twitter-svg" />
            </a>
         )
      }
      if (null) {
         return (
            <a className="twitter-chip">
               <TwitterSVG className="twitter-svg" />
               <p className="twitter-name">Loading</p>
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

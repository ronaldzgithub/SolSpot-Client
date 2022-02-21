import React, { useState, useEffect } from 'react';
import * as web3 from "@solana/web3.js";
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
import './nftshowcase.css'


const dud = ['', '', '', '']


const NFTShowCase = (props) => {
   const [solArr, setSolArr] = useState([]);
   const [imgArr, setImgArr] = useState([]);
   const [loaded, setLoaded] = useState(false)

   const getData = async () => {
      // mainnet-beta or devnet
      let address = props.id
      let connection = new web3.Connection(web3.clusterApiUrl("mainnet-beta"));


      if (address !== null) {
         const nftMetadata = await Metadata.findDataByOwner(
            connection,
            address
         );
         setSolArr([]);
         setImgArr([]);
         setSolArr(nftMetadata);
         let end = 4;
         if (nftMetadata.length < 4) {
            end = nftMetadata.length;
         }
         for (let i = 0; i < end; i++) {
            fetch(nftMetadata[i].data.uri)
               .then(response => response.json())
               .then(data => {
                  // console.log(data.image);
                  // console.log(data.attributes[0].value);
                  setImgArr(imgArr => [...imgArr, data.image])
               })
               .catch(error => {
                  console.error(error);
               });
         }
         setLoaded(true);
      }
   }

   const RenderImages = () => {
      if (false) {
         return (
            <div className="words">
               {imgArr.map((item, id) => (
                  <img src={item} key={id} className="img" />
               ))}
            </div>
         )
      }
      else {
         return (
            <div className="nft-row">
               {dud.map((item, id) => (
                  <span key={id} className="spot-nft-img" />
               ))}
            </div>
         )
      }
   }

   // UseEffects
   useEffect(async () => {
      getData()
   }, [props.id]);

   return (
      <div className="nft-show-main">
         <div className="upperWords">
            <p className="title">NFT Showcase</p>
            <p className="titleBtn">SEE ALL</p>
         </div>

         <RenderImages />
      </div>
   )
};

export default NFTShowCase;

import React, { useState, useEffect } from 'react';
import * as web3 from "@solana/web3.js";
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
import './nftshowcase.css'
const NFTShowCase = (props) => {
   const [fullNftArr, setFullNftArr] = useState([]);
   const [renderedNFTs, setRenderedNFTs] = useState(4);
   const [loaded, setLoaded] = useState(false)

   const getData = async (address) => {
      try {
         if (address !== undefined) {
            // mainnet-beta or devnet
            let connection = new web3.Connection(web3.clusterApiUrl("mainnet-beta"));

            if (address !== null) {
               const nftMetadata = await Metadata.findDataByOwner(
                  connection,
                  address
               );


               let temp_nftArr = [];
               for (let i = 0; i < nftMetadata.length; i++) {
                  temp_nftArr.push({
                     "name": nftMetadata[i].data.name,
                     "token_id": nftMetadata[i].mint,
                     "img_url": "init"
                  })
               }

               let end = nftMetadata.length;

               for (let i = 0; i < end; i++) {
                  await fetch(nftMetadata[i].data.uri)
                     .then(response => response.json())
                     .then(data => {

                        temp_nftArr[i].img_url = "" + data.image;
                     })
                     .catch(error => {
                        console.error(error);
                     });
               }
               setFullNftArr(temp_nftArr);
            }
         }

      }
      catch (error) {
         console.log("Error in getting NFTs: ", error)
      }
   }

   const formatURL = (url) => {
      let link = "https://explorer.solana.com/address/" + url;
      return link;
   }

   const RenderImages = () => {
      if (loaded) {
         return (
            <div className="nft-row-loaded">
               {fullNftArr.slice(0, renderedNFTs).map((item, id) => (
                  <a className="nft-card" key={id} href={formatURL(item.token_id)} target="_blank" rel="noopener">
                     <img src={item.img_url} alt="nfts owned by this profile" className="spot-nft-img" />
                     <p className="spot-nft-name">{item.name}</p>
                  </a>
               ))}
               {!(renderedNFTs >= fullNftArr.length) &&
                  <p onClick={() => setRenderedNFTs(renderedNFTs + 4)} className="nft-view-more">Load More</p>
               }
            </div>
         )
      }
      else if (!loaded) {
         return (
            <div className="nft-row-loading">
               <div className="nft-card-loading" />
               <div className="nft-card-loading" />
               <div className="nft-card-loading" />
               <div className="nft-card-loading" />
            </div>
         )
      }
   }

   // UseEffects
   useEffect(() => {
      getData(props.wallet_address);
      setLoaded(true);
      console.log(fullNftArr);
   }, [props.wallet_address]);

   return (
      <div className="nft-show-main">
         {fullNftArr.length > 0 && <p className="nft-title">NFTs</p>}

         <RenderImages />
      </div>
   )
};

export default NFTShowCase;

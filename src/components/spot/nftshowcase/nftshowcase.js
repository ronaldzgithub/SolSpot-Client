import React, { useState, useEffect } from 'react';
import './nftshowcase.css'

const NFTShowCase = (props) => {
   const [fullNftArr, setFullNftArr] = useState([]);
   const [renderedNFTs, setRenderedNFTs] = useState(4);
   const [loaded, setLoaded] = useState(false);

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
                  <p onClick={() => setRenderedNFTs(renderedNFTs + 4)} className="nft-view-more">View More</p>
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
      if (props.nftData !== null) {
         setFullNftArr(props.nftData);
         setLoaded(true);
      }
   }, [props.nftData]);

   return (
      <div className="nft-show-main">
         {fullNftArr.length > 0 && <p className="nft-title">NFTs</p>}
         <RenderImages />
      </div>
   )
};

export default NFTShowCase;

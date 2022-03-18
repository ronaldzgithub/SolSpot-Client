import React, { useState, useEffect } from 'react';
import styles from './nftshowcase.module.css'

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
            <div className={styles.nftRow_loaded}>
               {fullNftArr.length > 0 && <p className={styles.nftTitle}>Gallery</p>}
               {fullNftArr.slice(0, renderedNFTs).map((item, id) => (
                  <a className={styles.nftCard} key={id} href={formatURL(item.token_id)} target="_blank" rel="noopener">
                     <img src={item.img_url} alt="nfts owned by this profile" className={styles.nftImg} />
                     <p className={styles.nftName}>{item.name}</p>
                  </a>
               ))}
               {!(renderedNFTs >= fullNftArr.length) &&
                  <p onClick={() => setRenderedNFTs(renderedNFTs + 4)} className={styles.seeAllBtn}>View More</p>
               }
            </div>
         )
      }
      else if (!loaded) {
         return (
            <div className={styles.cardRow_loading}>
               {fullNftArr.length > 0 && <p className={styles.nftTitle}>Gallery</p>}
               <div className={styles.loadingCard} />
               <div className={styles.loadingCard} />
               <div className={styles.loadingCard} />
               <div className={styles.loadingCard} />
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
      <div className={styles.nftShowcaseRoot}>
         < RenderImages />
      </div >
   )
};

export default NFTShowCase;

// 

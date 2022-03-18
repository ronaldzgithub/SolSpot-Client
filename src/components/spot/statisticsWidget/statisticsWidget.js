import React, { useState, useEffect } from 'react';
import styles from './statisticsWidget.module.css'
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

const StatisticsWidget = (props) => {
   const [loading, setLoading] = useState(true);
   const [statsObj, setStatsObj] = useState(null);

   const RenderWidget = () => {
      if (!loading && statsObj !== null) {
         return (
            <div className={styles.statsContainer}>
               <h2 className={styles.title}>Overview</h2>
               <div className={styles.row}>
                  <div className={styles.statCard}>
                     <p className={styles.statTitle}>NFTs</p>
                     <p className={styles.statInfoLg}>{statsObj.nftCount}</p>
                  </div>
                  <div className={styles.statCard}>
                     <p className={styles.statTitle}>Transactions</p>
                     <p className={styles.statInfoLg}>{statsObj.transactionCount}</p>
                  </div>
               </div>
               <div className={styles.statCard}>
                  <p className={styles.statTitle}>SOL Balance</p>
                  <p className={styles.statInfoSm}>{statsObj.solBalance} SOL</p>
               </div>
               <div className={styles.row}>
                  <div className={styles.statCard}>
                     <p className={styles.statTitle}>First Transaction</p>
                     <p className={styles.statInfoSm}>{statsObj.firstTransaction}</p>
                  </div>
                  <div className={styles.statCard}>
                     <p className={styles.statTitle}>Last Transaction</p>
                     <p className={styles.statInfoSm}>{statsObj.lastTransaction}</p>
                  </div>

               </div>
            </div>
         )
      }

      else {
         return (
            <div style={{ height: 'auto' }}>
               <h2 className={styles.title}>Overview</h2>
               <div className={styles.row}>
                  <div className={styles.statCard_loading} />
                  <div className={styles.statCard_loading} />
               </div>
               <div className={styles.statCard_loading} />
               <div className={styles.row}>
                  <div className={styles.statCard_loading} />
                  <div className={styles.statCard_loading} />
               </div>
            </div>
         )
      }
   }

   const formatDate = (date) => {
      let transactionDate = new Date(date);
      let dateString = transactionDate.toString();

      let returnString = dateString.slice(4, 15);

      return returnString;
   }


   const getAccountData = async (nft, address) => {
      let temp_stats_obj;
      let connection = new Connection("https://ssc-dao.genesysgo.net/", "confirmed");

      const transactionInfo = await connection.getConfirmedSignaturesForAddress2(
         new PublicKey(address)
      );

      console.log(transactionInfo);

      if (transactionInfo == undefined) {
         console.log("undefined transactions");
         return;
      };

      const solBalance = await connection.getBalance(
         new PublicKey(address)
      );

      let lastTransaction = transactionInfo[0].blockTime * 1000;
      let firstTransaction = transactionInfo[transactionInfo.length - 1].blockTime * 1000;

      temp_stats_obj = {
         "nftCount": nft.length,
         "transactionCount": transactionInfo.length,
         "solBalance": (solBalance / 1000000000),
         "firstTransaction": formatDate(firstTransaction),
         "lastTransaction": formatDate(lastTransaction),
      }

      setStatsObj(temp_stats_obj)
   }

   // UseEffects
   useEffect(async () => {
      if (props.nftData !== null) {
         await getAccountData(props.nftData, props.wallet_address);
         setLoading(false);
      }
   }, [props.nftData]);


   return (
      <div className={styles.root}>
         <RenderWidget />
      </div >
   )
};

export default StatisticsWidget;

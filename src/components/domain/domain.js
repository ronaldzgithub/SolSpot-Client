import React, { useState, useEffect } from 'react';
import * as web3 from "@solana/web3.js";
import { NAME_PROGRAM_ID, performReverseLookup } from "@bonfida/spl-name-service";
import styles from './domain.module.css'


const Domain = (props) => {
   const [domains, setDomains] = useState([]);
   const [domainLoaded, setDomainLoaded] = useState(false);
   const wallet_address = props.wallet_address;
   let connection = new web3.Connection("https://ssc-dao.genesysgo.net/", "confirmed");

   const findOwnedNameAccountsForUser = async (passed_wallet_address) => {
      try {
         if (passed_wallet_address == undefined) return;

         let userAccount = new web3.PublicKey(passed_wallet_address);
         const filters = [
            {
               memcmp: {
                  offset: 32,
                  bytes: userAccount.toBase58(),
               },
            },
         ];

         const domainAccounts = await connection.getProgramAccounts(NAME_PROGRAM_ID, {
            filters,
         });
         return domainAccounts;

      } catch (error) {
         console.log("Domain Parse Error");
      }
   }

   const getDomainNames = async (passed_wallet_address) => {
      try {
         if (passed_wallet_address == undefined) return;

         let domainList = [];
         let domainAccounts = await findOwnedNameAccountsForUser(passed_wallet_address);

         for (let i = 0; i < domainAccounts.length; i++) {
            const domainKey = new web3.PublicKey(domainAccounts[i].pubkey.toBase58());
            try {
               const domainName = await performReverseLookup(connection, domainKey);
               domainList.push(domainName);
            } catch {
               console.log("Invalid Domain Lookedup")
            }
         }

         if (domainList.length > 0) {
            console.log("Domains Found: ", domainList);
            setDomains(domainList);
            setDomainLoaded(true);
         }
         else {

            setDomainLoaded(null);
         }
      }
      catch (error) {
         setDomainLoaded(null);
         console.log("Domain Fetch Error: ", error)
      }
   }


   // UseEffects
   useEffect(async () => {
      getDomainNames(wallet_address);
   }, [props.wallet_address]);


   const RenderDomains = () => {
      if (domainLoaded) {
         return (
            <p className={styles.domainName}>{domains[0]}.sol</p>
         )
      }
      else if (domainLoaded == null) {
         return (
            <></>
         )
      }
      else {
         return (
            <p className={styles.domainName}>Loading</p>
         )
      }
   }

   return (
      <>
         <RenderDomains />
      </>
   )
};

export default Domain;

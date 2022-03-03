import React, { useState, useEffect } from 'react';
import * as web3 from "@solana/web3.js";
import { NAME_PROGRAM_ID, performReverseLookup } from "@bonfida/spl-name-service";
import './domain.css'


const Domain = (props) => {
   const [domains, setDomains] = useState([]);
   const [domainLoaded, setDomainLoaded] = useState(null);
   const wallet_address = props.wallet_address;
   let connection = new web3.Connection(web3.clusterApiUrl("mainnet-beta"));

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

            setDomainLoaded(false);
         }
      }
      catch (error) {
         setDomainLoaded(false);
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
            <p className="domain-name">{domains[0]}.sol</p>
         )
      }
      else if (!domainLoaded) {
         return (
            <p className="domain-name">no domain</p>
         )
      }
      else {
         return (
            <p className="domain-name-loading">Loading</p>
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

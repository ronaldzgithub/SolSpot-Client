import React, { useState, useEffect } from 'react';
import * as web3 from "@solana/web3.js";
import { NAME_PROGRAM_ID, performReverseLookup } from "@bonfida/spl-name-service";
import './domain.css'


const Domain = (props) => {
   const [domains, setDomains] = useState([]);
   const [domainLoaded, setDomainLoaded] = useState(null);
   const address = props.id;
   let connection = new web3.Connection(web3.clusterApiUrl("mainnet-beta"));


   const findOwnedNameAccountsForUser = async () => {
      try {
         if (address !== undefined) {
            let userAccount = new web3.PublicKey(address);
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
         }
      } catch (error) {
         console.log("Domain Parse Error");
      }
   }


   const getDomainNames = async () => {
      try {
         if (address !== undefined) {
            let domainList = [];
            let domainAccounts = await findOwnedNameAccountsForUser();

            for (let i = 0; i < domainAccounts.length; i++) {
               const domainKey = new web3.PublicKey(domainAccounts[i].pubkey.toBase58());
               const domainName = await performReverseLookup(connection, domainKey)
               domainList.push(domainName + ".sol");
            }

            if (domainList.length > 0) {
               setDomains(domainList);
               setDomainLoaded(true);
            }
         }
      }
      catch {
         console.log("Domain Fetch Error")
      }
   }


   // UseEffects
   useEffect(async () => {
      getDomainNames()
   }, props.id);


   const RenderDomains = () => {
      if (domainLoaded) {
         return (
            <p className="domain-name">{domains[0]}</p>
         )
      }
      if (null) {
         return (
            <p className="domain-name-loading">Loading</p>
         )
      }
      else {
         return (
            <p className="domain-name">no domain</p>
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

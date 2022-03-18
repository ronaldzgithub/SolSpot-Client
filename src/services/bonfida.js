import * as web3 from "@solana/web3.js";
import { NAME_PROGRAM_ID, getHandleAndRegistryKey, performReverseLookup } from "@bonfida/spl-name-service";

let connection = new web3.Connection("https://ssc-dao.genesysgo.net/", "confirmed");


// Gets all domain accounts from an address
const findOwnedNameAccountsForUser = async (address) => {
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

const getTwitterHandle = async (address) => {
   const pubkey = new web3.PublicKey(address);
   const data = await getHandleAndRegistryKey(connection, pubkey);
   return data[0]
}

export { findOwnedNameAccountsForUser, getTwitterHandle }

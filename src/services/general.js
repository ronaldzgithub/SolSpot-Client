
import * as web3 from "@solana/web3.js";
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';

const formatAddress = (address) => {
   let str = address.slice(0, 4) + "...." + address.slice(-4)
   return str;
}

const initConnection = () => {
   return new web3.Connection("https://ssc-dao.genesysgo.net/", "confirmed");
}

const getNFTData = async (address) => {
   try {
      if (address == undefined) return

      // mainnet-beta or devnet
      let connection = new web3.Connection("https://ssc-dao.genesysgo.net/", "confirmed");

      if (address !== null) {
         const nftMetadata = await Metadata.findDataByOwner(
            connection,
            address
         );


         let nftArray = [];
         for (let i = 0; i < nftMetadata.length; i++) {
            nftArray.push({
               "name": nftMetadata[i].data.name,
               "token_id": nftMetadata[i].mint,
               "img_url": "init"
            })
         }

         console.log(nftMetadata);
         let end = nftMetadata.length;

         if (end > 8) {
            end = 8;
         }

         // Get url of each image
         for (let i = 0; i < end; i++) {
            await fetch(nftMetadata[i].data.uri)
               .then(response => response.json())
               .then(data => {
                  nftArray[i].img_url = "" + data.image;
               })
               .catch(error => {
                  console.error(error);
               });
         }
         return nftArray;
      }


   }
   catch (error) {
      console.log("Error in getting NFTs: ", error)
   }
}

export { formatAddress, getNFTData }



// helper functions
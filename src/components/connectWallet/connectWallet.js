import React, { useState, useEffect } from 'react';
import './connectWallet.css'

const ConnectWallet = (props) => {
   const [walletAddress, setWalletAddress] = useState(null);


   const formatAddress = (input) => {
      let address
      try {

         address = input.substring(0, 4) + "..." + input.substring(input.length - 4)
      } catch (err) {
         console.log(err)
         address = ""
      }
      return address
   }


   // Actions
   const checkIfWalletIsConnected = async () => {
      try {
         const { solana } = window;

         if (solana) {
            if (solana.isPhantom) {
               console.log('Phantom wallet found!');
               const response = await solana.connect({ onlyIfTrusted: true });
               console.log(
                  'Connected with Public Key:',
                  response.publicKey.toString()
               );

               /*
                   * Set the user's publicKey in state to be used later!
                   */
               setWalletAddress(response.publicKey.toString());
               let tempAddress = response.publicKey.toString();
               props.handleWalletUpdate(tempAddress)
            }
         } else {
            alert('Solana object not found! Get a Phantom Wallet 👻');
         }
      } catch (error) {
         console.error(error);
      }
   };

   const connectWallet = async () => {
      const { solana } = window;

      if (solana) {
         const response = await solana.connect();
         console.log('Connected with Public Key:', response.publicKey.toString());
         setWalletAddress(response.publicKey.toString());
         props.handleWalletUpdate(response.publicKey.toString())
      }
   };


   // UseEffects
   useEffect(() => {
      const onLoad = async () => {
         await checkIfWalletIsConnected();
      };
      window.addEventListener('load', onLoad);
      return () => window.removeEventListener('load', onLoad);
   }, [walletAddress]);


   const renderConnect = () => {
      if (!walletAddress) {
         return (
            <button
               className="wallet-login-button"
               onClick={connectWallet}
            >
               Connect Wallet
            </button>
         )
      }
   }

   const renderDisconnect = () => {
      if (walletAddress || props.wallet_address !== "") {
         return (
            <button className="wallet-login-button-absolute">
               {formatAddress(props.wallet_address)}
            </button>
         )
      }
   }



   return (
      <>
         {props.v == "connect" && renderConnect()}
         {props.v == "disconnect" && renderDisconnect()}
      </>
   )
};

export default ConnectWallet;
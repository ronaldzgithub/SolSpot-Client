import React, { useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
   LedgerWalletAdapter,
   PhantomWalletAdapter,
   SlopeWalletAdapter,
   SolflareWalletAdapter,
   SolletExtensionWalletAdapter,
   SolletWalletAdapter,
   TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
   WalletModalProvider,
   WalletDisconnectButton,
   WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app

import Home from "../home/home.js"
import Spot from "../spot/spot.js"
import Create from "../create/create.js"
import './App.css';
require('@solana/wallet-adapter-react-ui/styles.css');

const App = () => {

   // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
   const network = WalletAdapterNetwork.Devnet;

   // You can also provide a custom RPC endpoint.
   const endpoint = useMemo(() => clusterApiUrl(network), [network]);

   // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
   // Only the wallets you configure here will be compiled into your application, and only the dependencies
   // of wallets that your users connect to will be loaded.
   const wallets = useMemo(
      () => [
         new PhantomWalletAdapter(),
         new SlopeWalletAdapter(),
         new SolflareWalletAdapter({ network }),
         new TorusWalletAdapter(),
         new LedgerWalletAdapter(),
         new SolletWalletAdapter({ network }),
         new SolletExtensionWalletAdapter({ network }),
      ],
      [network]
   );

   return (
      <ConnectionProvider endpoint={endpoint}>
         <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
               <Router>
                  <Routes>
                     <Route path='/' element={<Home />} />
                     <Route path='/create' element={<Create />} />
                     <Route path='/:searchedKey' element={<Spot />} />
                     <Route path="*" element={<Home />} />
                  </Routes>
               </Router>
            </WalletModalProvider>
         </WalletProvider>
      </ConnectionProvider>
   );
}

export default App;

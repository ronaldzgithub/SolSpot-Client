import React, { useState, useEffect } from 'react';
import './connectWallet.css'

const ConnectWallet = (props) => {
    const [walletAddress, setWalletAddress] = useState(null);

    const formatAddress = (input) => {
        let address = input.substring(0, 4) + "..." + input.substring(input.length-4)
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
            props.handleWalletUpdate(response.publicKey.toString())
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

        }
      };
    

    // UseEffects
    useEffect(() => {
        const onLoad = async () => {
            await checkIfWalletIsConnected();
        };
        window.addEventListener('load', onLoad);
        return () => window.removeEventListener('load', onLoad);
    }, []);
    

    const RenderDomains = () => {
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
        else {
            return (
                <button
                    className="wallet-login-button"
                    >
                    {formatAddress(walletAddress)}
                </button>
            )
        }
    }   

    return (
        <>
            <RenderDomains />
        </>
    )
};

export default ConnectWallet;

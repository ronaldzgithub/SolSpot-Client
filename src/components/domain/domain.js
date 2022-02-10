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


    const getDomainNames = async () => {
        if (address !== null)
            {
                let domainList = [];
                let domainAccounts = await findOwnedNameAccountsForUser();
                console.log(domainAccounts);

                for (let i = 0; i < domainAccounts.length; i++ ) {

                    try {
                        const domainKey = new web3.PublicKey(domainAccounts[i].pubkey.toBase58());
                        const domainName = await performReverseLookup(connection, domainKey)
                        domainList.push(domainName + ".sol");
                    }
                    catch {
                        console.log("Oh no, ERROR")
                    }


                }
                console.log(domainList)
                
                if (domainList.length > 0) {
                    setDomains(domainList);
                    setDomainLoaded(true);
                }
            }
    }


    // UseEffects
    useEffect(async () => {
        getDomainNames()
    }, props.id);
    

    const RenderDomains = () => {
        if (domainLoaded) {
            return (
                <p className="domain-card">{domains[0]}</p>
            )
        }
        if (null) {
            return (
                <p className="domain-card">Loading</p>
            )
        }
        else {
            return (
                <p className="domain-card-null">No Solana Domain</p>
            )
        }
    }   

    return (
        <div>
            <RenderDomains />
        </div>
    )
};

export default Domain;

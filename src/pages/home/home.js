import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import Header from "../../components/header/header.js"
import "./home.css"
import SearchIcon from "../../assets/search"

const Home = () => {


    const [account, setAcount] = useState("");
    const [valid, setValid] = useState(false);

    const changeSearch = (event) => {
        setAcount(event.target.value);
    };



    useEffect(() => {
        if (account.length === 44) {
            setValid(true);
        } else {
            setValid(false);
        }
      }, [account]);

    return (
        <div className="main">
            <Header />

            <div className="searchContainer">
                <div className="inputContainer">
                    <SearchIcon className="searchIcon" />
                    <input
                        value={account}
                        onChange={changeSearch}
                        className="input"
                        placeholder="Enter Solana Account"
                    />
                </div>

                
                {valid && 
                    <Link className="activeSearchBtn" to={`/${account}`}>Search</Link>
                }
                {!valid && 
                    <p className="inactiveSearchBtn">Search</p>
                }
            </div>
            
            
            
 
        </div>
    )
};

export default Home;

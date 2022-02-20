import React, { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import Header from "../../components/header/header.js"
import SolSpotLogo from "assets/solspot_logo"
import "./home.css"
import SearchIcon from "../../assets/search"

const Home = () => {
   let navigate = useNavigate();
   const [account, setAcount] = useState("");
   const [valid, setValid] = useState(false);

   const changeSearch = (event) => {
      event.preventDefault();
      setAcount(event.target.value);
   };

   const handleSubmit = (event) => {
      event.preventDefault();
      if (account.length === 44) {
         navigate(`/${account}`);
      }
   }


   const SearchBtn = () => {
      if (valid) {
         return (
            <Link className="go-search-btn" to={`/${account}`}>Search</Link>
         )
      } else {
         return (
            <Link className="no-search-btn" to={'/'} >Search</Link >
         )

      }
   };

   const HighlightItem = () => {
      return (
         <div className="highlight-item"></div>
      )
   };



   useEffect(() => {
      if (account.length === 44) {
         setValid(true);
      } else {
         setValid(false);
      }
   }, [account]);

   return (
      <div className="home-main">
         <div className="home-upper-container">
            <div className="hero-content">
               <SolSpotLogo className="solspot-logo" />
               <h1>create your digital identity</h1>
               <h4>Your forever you,</h4>
               <h4>stored on the Solana blockchain.</h4>
               <h4 style={{ marginBottom: 30 }}>Share your story and increase your clout.</h4>
               <Link className="home-create-btn" to={`/create`}>create now</Link>
            </div>
            <div className="gradient-container">
               <div className="menu-row">

                  <Link className="menu-item" to={`/create`}>profile</Link>
                  <Link className="menu-item" to={`/`}>about</Link>
                  <div className="search-container">
                     <form onSubmit={handleSubmit}>
                        <div className="input-container">
                           <SearchIcon className="searchIcon" />
                           <input
                              value={account}
                              onChange={changeSearch}
                              className="input"
                              placeholder="Enter Solana Account"
                           />
                           <SearchBtn type="submit" value="Submit" />
                        </div>
                     </form>
                  </div>
               </div>
               <div className="hero-img">
                  "put the img here"
               </div>
            </div>
         </div>
         <div className="community-highlights-outer">
            <h2 className="comm-highlights-tag">community highlights</h2>
            <div className="community-highlights">
               <HighlightItem />
               <HighlightItem />
               <HighlightItem />
            </div>
            <div className="community-highlights">
               <HighlightItem />
               <HighlightItem />
               <HighlightItem />
            </div>
         </div>
      </div>
   )
};

export default Home;

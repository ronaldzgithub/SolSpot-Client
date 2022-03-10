import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import solSpotMobileImg from "assets/solspot_hero.png"
import SearchIcon from "../../assets/search"
import SolSpotLogo from "assets/solspot_logo"
import "./home.css"

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

   const WidgetExampleCard = (props) => {
      return (
         <div className="highlight-item">

         </div>
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
               <div className="h-header-search-bar">
                  <SolSpotLogo className="solspot-logo" />

                  <div className="h-search-container">
                     <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                        <div className="home-search-input-container">
                           <SearchIcon className="searchIcon" />
                           <input
                              value={account}
                              onChange={changeSearch}
                              className="input"
                              placeholder="Search by user address or domain name"
                           />
                           <SearchBtn type="submit" value="Submit" />
                        </div>
                     </form>
                  </div>
               </div>
               <div>

               </div>
               <h1>Create your digital identity</h1>
               <h4>Your forever you, stored on the Solana blockchain. Share your story and increase your clout.</h4>
               <div className="h-search-container" style={{ marginLeft: 96 }}>
                  <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                     <div className="home-search-input-container">
                        <SearchIcon className="searchIcon" />
                        <input
                           value={account}
                           onChange={changeSearch}
                           className="input"
                           placeholder="Search by user address or domain name"
                        />
                        <SearchBtn type="submit" value="Submit" />
                     </div>
                  </form>
               </div>
            </div>
            <div className="right-container">
               <div className="menu-row">
                  <a href="https://solspot.gitbook.io/solspot/" target="_blank" className="menu-item">Whitepaper</a>
                  <Link className="menu-item-manage" to={`/create`}>Manage Profile</Link>
               </div>
               <img src={solSpotMobileImg} className="hero-img" />
            </div>

         </div>

         <div className="h-pane-2">
            <h2>What is SolSpot?</h2>
            <p className="h-pane-2-subtitle">
               SolSpot is a snapshot of who you are in the Solana metaverse.
               All your activity, from which communities you belong to on the blockchain to what
               missions your P2E assets have been sent on, brought together into one profile card.
               Incredibly intuitive and customizable, as all things should be.
            </p>
            <div className="h-pane-2-item-container">
               <div className="h-pane-2-item">
                  <h4>CREATE</h4>
                  <p>
                     Choose what makes you, you! Edit your profile and select what
                     personal widgets will be displayed on your profile.
                  </p>
               </div>
               <div className="h-pane-2-item">
                  <h4>SHARE</h4>
                  <p>Share a snapshot of your activity in the Solana metaverse.</p>
               </div>
               <div className="h-pane-2-item">
                  <h4>CUSTOMIZE</h4>
                  <p>
                     Choose what makes you, you! Edit your profile and select what
                     personal widgets will be displayed on your profile.
                  </p>
               </div>

            </div>
         </div>


      </div>
   )
};

export default Home;

/*
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
         */
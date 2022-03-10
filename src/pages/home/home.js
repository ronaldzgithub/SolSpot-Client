import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import SearchIcon from "../../assets/search"
import SolSpotLogo from "assets/solspot_logo"
import heroImage from "assets/bkg_space.png"
import Footer from "./Footer/Footer"


import PillarsComp from "./PillarComp/pillarComp"
import IntroBlock from "./IntroBlock/introBlock"
import DescriptionComp from "./Description/descriptionComp"
import styles from "./home.module.css"

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
            <Link className={styles.goSearchBtn} to={`/${account}`}>
               <SearchIcon className={styles.searchIcon} />
            </Link>
         )
      } else {
         return (
            <Link className={styles.noSearchBtn} to={'/'} >
               <SearchIcon className={styles.searchIcon} />
            </Link >
         )

      }
   };


   useEffect(() => {
      if (account.length === 44) {
         setValid(true);
      } else {
         setValid(false);
      }
   }, [account]);

   return (
      <div className={styles.root}>


         <img src={heroImage} className={styles.heroImage} />
         <div className={styles.heroContent}>
            <div style={{ width: '100%' }}>
               <div className={styles.header}>
                  <SolSpotLogo className={styles.solspotLogo} />
                  <div className={styles.menuRow}>
                     <a href="https://solspot.gitbook.io/solspot/" target="_blank" className={styles.menuItem}>Whitepaper</a>
                     <Link className={styles.menuItemManage} to={`/create`}>Manage Profile</Link>
                  </div>
               </div>

               <h1>create your digital identity</h1>
               <h4>Your forever you, stored directly on Solana.</h4>
               <h4>Personalize your spot in the Solanaverse.</h4>

            </div>

            <div className={styles.searchContainer}>
               <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                  <div className={styles.searchInputContainer}>
                     <input
                        value={account}
                        onChange={changeSearch}
                        className={styles.input}
                        placeholder="Search by user address or domain name"
                     />
                     <SearchBtn type="submit" value="Submit" />
                  </div>
               </form>
            </div>
         </div>
         <IntroBlock />
         <PillarsComp />
         <DescriptionComp />
         <Footer />
      </div>
   )
};

export default Home;

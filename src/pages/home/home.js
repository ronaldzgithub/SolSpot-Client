import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import SearchIcon from "../../assets/search"
import SolSpotLogoFull from "assets/solspot_logo"
import SolSpotLogoIcon from "assets/solspot_logo_icon"
import Footer from "./Footer/Footer"


import PillarsComp from "./PillarComp/pillarComp"
import IntroBlock from "./IntroBlock/introBlock"
import DescriptionComp from "./Description/descriptionComp"
import ClayMockupSingle from "assets/images/clayMockupSingle.png"
import LeftSemiCircleSVGWhite from 'assets/svgs/leftSemiCircleSVG-WHITE';
import RightSemiCircleSVGWhite from 'assets/svgs/rightSemiCircleSVG-WHITE';
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

         <div className={styles.heroContent}>
            <div className={styles.heroBox}>
               <div className={styles.header}>
                  <SolSpotLogoFull className={styles.solspotLogoLg} />
                  <SolSpotLogoIcon className={styles.solspotLogoIcon} />
                  <div className={styles.menuRow}>
                     <div className={styles.searchContainer}>
                        <form className={styles.searchInputContainer} onSubmit={handleSubmit}>

                           <input
                              value={account}
                              onChange={changeSearch}
                              className={styles.input}
                              placeholder="Search by user address or domain name"
                           />
                           <SearchBtn type="submit" value="Submit" />

                        </form>
                     </div>

                     <a href="https://solspot.gitbook.io/solspot/" target="_blank" className={styles.menuItem}>Whitepaper</a>
                     <Link className={styles.menuItemManage} to={`/create`}>Manage Profile</Link>

                  </div>
               </div>

               <h1>create your digital identity</h1>
               <h4>Your forever you, stored directly on Solana.</h4>
               <h4>Personalize your spot in the Solanaverse.</h4>

               <div className={styles.imgContainer}>
                  <img src={ClayMockupSingle} className={styles.singleClayMockup} />
               </div>

            </div>

            <LeftSemiCircleSVGWhite className={styles.leftSemiCircleSVG} />
            <RightSemiCircleSVGWhite className={styles.rightSemiCircleSVG} />

         </div>

         <IntroBlock />
         <PillarsComp />
         <DescriptionComp />
         <Footer />

      </div>
   )
};

export default Home;

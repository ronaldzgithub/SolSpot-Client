import React from 'react';

import BrushIcon from "assets/brushIcon"
import RobotIcon from "assets/robotIcon"
import MegaphoneIcon from 'assets/megaphoneIcon';
import ClayMockupSingle from "assets/clayMockupSingle.png"

import styles from "./descriptionComp.module.css"

const DescriptionComp = () => {
   return (

      <div className={styles.root}>
         <div className={styles.content}>
            <h2>Your digital identity all in one place</h2>
            <p>
               Solspot is a social platform rooted in the Solana metaverse.
               By simply having a Solana address, you have a Solspot profile.
               Without even having to create an account, Solspot automatically
               creates a snapshot showing your activity on the blockchain.

            </p>
         </div>
         <div className={styles.imgContainer}>
            <img src={ClayMockupSingle} className={styles.singleClayMockup} />

         </div>
      </div>
   )
};

export default DescriptionComp;

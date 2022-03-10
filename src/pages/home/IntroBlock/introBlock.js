import React from 'react';

import BrushIcon from "assets/brushIcon"
import RobotIcon from "assets/robotIcon"
import MegaphoneIcon from 'assets/megaphoneIcon';
import tripleMockup from "assets/tripleMockup.png"

import styles from "./introBlock.module.css"

const IntroBlock = () => {
   return (

      <div className={styles.root}>
         <img src={tripleMockup} className={styles.tripleMockup} />
         <div className={styles.content}>
            <h2>Your digital identity all in one place</h2>
            <p>
               Solspot is a social platform rooted in the Solana metaverse.
               By simply having a Solana address, you have a Solspot profile.
               Without even having to create an account, Solspot automatically
               creates a snapshot showing your activity on the blockchain.

            </p>
         </div>
      </div>
   )
};

export default IntroBlock;

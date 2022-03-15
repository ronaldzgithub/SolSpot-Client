import React from 'react';

import tripleMockup from "assets/images/tripleMockup.png"
import styles from "./introBlock.module.css"
import LeftSemiCircleSVG from 'assets/svgs/leftSemiCircleSVG';
import RightSemiCircleSVG from 'assets/svgs/rightSemiCircleSVG';
import CircleGradientSVG from 'assets/svgs/circleGradient';

const IntroBlock = () => {
   return (

      <div className={styles.root}>
         <img src={tripleMockup} className={styles.tripleMockup} />
         <CircleGradientSVG className={styles.leftCircleSVG} />
         <CircleGradientSVG className={styles.rightCircleSVG} />
         <LeftSemiCircleSVG className={styles.leftSemiCircleSVG} />
         <RightSemiCircleSVG className={styles.rightSemiCircleSVG} />
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

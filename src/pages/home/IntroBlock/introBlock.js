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
               Solspot is a social platform rooted in the Solana metaverse. A
               Solspot profile is a quick snapshot of who you are and is automatically
               generated based on your Solana activity. Each profile can be customized
               in a way that makes it unique and personal. All data submitted by a
               user is stored directly on the Solana blockchain, making Solspot a
               truly decentralized application.
            </p>
         </div>
      </div>
   )
};

export default IntroBlock;

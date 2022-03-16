import React from 'react';

import ClayMockupSingle from "assets/images/clayMockupSingle.png"
import CircleGradientSVG from 'assets/svgs/circleGradient';
import styles from "./descriptionComp.module.css"

const DescriptionComp = () => {
   return (

      <div className={styles.root}>
         <CircleGradientSVG className={styles.leftCircleSVG} />
         <div className={styles.content}>
            <h2>Solspot is all about YOU</h2>
            <p>
               A Solspot profile is composed of widgets chosen by
               the profile owner. Each widget has a different purpose, enabling
               unique profiles to be created that illustrate the uniqueness of
               every individual in the Solana metaverse.
            </p>
            <a href="https://solspot.gitbook.io/solspot/" target="_blank" className={styles.learnMoreBtn}>Learn More</a>
         </div>
         <div className={styles.imgContainer}>
            <img src={ClayMockupSingle} className={styles.singleClayMockup} />
         </div>
      </div>
   )
};

export default DescriptionComp;

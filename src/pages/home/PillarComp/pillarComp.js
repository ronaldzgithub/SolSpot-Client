import React from 'react';

import BrushIcon from "assets/brushIcon"
import RobotIcon from "assets/robotIcon"
import MegaphoneIcon from 'assets/megaphoneIcon';
import styles from "./pillarComp.module.css"

const PillarsComp = () => {
   return (

      <div className={styles.solspotPillars}>
         <h2>Solspot is all about you</h2>
         <div className={styles.itemContainer}>
            <div className={styles.item}>
               <BrushIcon className={styles.icon} style={{ backgroundColor: "#EDAEF9" }} />
               <h4>Personalized</h4>
               <p>
                  Profiles can be customized to make each one unique and personal.
               </p>
            </div>
            <div className={styles.item}>
               <RobotIcon className={styles.icon} style={{ backgroundColor: "#E1DAFC" }} />
               <h4>Generative</h4>
               <p>Most profile data is automatically pulled from the Solana blockchain.</p>
            </div>
            <div className={styles.item}>
               <MegaphoneIcon className={styles.icon} style={{ backgroundColor: "#C4DAFD" }} />
               <h4>Shareable</h4>
               <p>
                  Easily share and show-off your profile in many exciting ways.
               </p>
            </div>
         </div>
      </div>
   )
};

export default PillarsComp;

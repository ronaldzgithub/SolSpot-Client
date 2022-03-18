import React from 'react';

import BrushIcon from "assets/brushIcon"
import RobotIcon from "assets/robotIcon"
import MegaphoneIcon from 'assets/megaphoneIcon';
import RightSemiCircleSVG from 'assets/svgs/rightSemiCircleSVG';
import styles from "./pillarComp.module.css"

const PillarsComp = () => {
   return (
      <div className={styles.solspotPillars}>
         <RightSemiCircleSVG className={styles.rightSemiCircleSVG} />
         <h2>All about Solspot</h2>
         <div className={styles.itemContainer}>
            <div className={styles.item}>
               <BrushIcon className={styles.icon} style={{ backgroundColor: "#EDAEF9" }} />
               <h4>Personalized</h4>
               <p>
                  Each profile can be customized in a way that makes it unique and personal!
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

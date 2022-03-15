import React from 'react';
import solspotLogo from "assets/images/solspot_logo_gradient.png"
import DiscordIcon from "assets/svgs/discordIcon.js"
import TwitterIcon from "assets/svgs/twitterIcon.js"
import styles from "./Footer.module.css"

let discordURL = "https://discord.gg/nGPMGegShp";
let twitterURL = "https://twitter.com/solspot_";

const Footer = () => {

   return (
      <div className={styles.root}>
         <img src={solspotLogo} className={styles.logo} />
         <div>
            <a href={discordURL} target="_blank" rel="noreferrer" >
               <DiscordIcon className={styles.linkIcon} />
            </a>
            <a href={twitterURL} target="_blank" rel="noreferrer" >
               <TwitterIcon className={styles.linkIcon} />
            </a>
         </div>
      </div>
   )
};

export default Footer;

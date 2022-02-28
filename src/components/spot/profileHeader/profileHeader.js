import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Domain from "components/domain/domain";
import Twitter from "components/twitter/twitter";
import SolanaLogo from "assets/solanaLogo";
import QRIcon from "assets/qrIcon";
import ShareIcon from "assets/shareIcon";

import * as SupportFunctions from "services/general";
import './profileHeader.css';

let item = "https://arweave.net/WHiOxMtFT0zjA-IO2BQbKqE7Lm2bDBy20NUdH_lJ-JE";

const ProfileHeader = (props) => {
   let navigate = useNavigate();
   let wallet_id = props.wallet_id;
   const [profileData, setProfileData] = useState(null);

   const clickLink = (btn) => {
      if (btn == "sol") {
         return "https://explorer.solana.com/address/" + props.wallet_id;
      }
   }



   const Links = () => {
      return (
         <div className="spot-profile-header-link-list">
            <a className="spot-profile-header-button" href={clickLink("sol")}>
               <SolanaLogo className="spot-profile-header-button-sol" />
            </a>

            <Twitter wallet_id={wallet_id} />
            <a className="spot-profile-header-button" href={clickLink("qr")}>
               <QRIcon className="spot-profile-header-button-sol" wallet_id={wallet_id} />
            </a>
            <a className="spot-profile-header-button" href={clickLink("qr")}>
               <ShareIcon className="spot-profile-header-button-sol" wallet_id={wallet_id} />
            </a>
         </div>
      )
   }


   // UseEffects
   useEffect(async () => {
      if (props.profile !== undefined) {
         setProfileData(props.profile);
      }
   }, [props.profile]);

   const Bio = () => {
      if (profileData !== null) {
         return (
            <p className="spot-profile-header-bio">
               {profileData.bio}
            </p>
         )
      }
      else {
         return (
            <></>
         )
      }
   }

   return (
      <div className="spot-profile-header">
         <div className="spot-profile-header-upper-container">
            <img className="spot-profile-header-img" src={item} />
            <Domain />
            <p className="spot-profile-header-wallet">{SupportFunctions.formatAddress(wallet_id)}</p>
            {Bio()}
         </div>
         <Links />
      </div>
   )
};

export default ProfileHeader;

import React, { useState, useEffect } from 'react';
import Domain from "components/domain/domain";
import Twitter from "components/twitter/twitter";
import SolanaLogo from "assets/solanaLogo";
import { useNavigate } from 'react-router-dom';

import './profileHeader.css';
import * as SupportFunctions from "services/general"

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
         <img className="spot-profile-header-img" src={item} />
         <Domain />
         <p className="spot-profile-header-wallet">{SupportFunctions.formatAddress(wallet_id)}</p>
         {Bio()}

         <Links />
      </div>
   )
};

export default ProfileHeader;

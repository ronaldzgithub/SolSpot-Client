import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Domain from "components/domain/domain";
import Twitter from "components/twitter/twitter";
import SolanaLogo from "assets/solanaLogo";
import QRIcon from "assets/qrIcon";
import ShareIcon from "assets/shareIcon";

import * as SupportFunctions from "services/general";
import './profileHeader.css';


const ProfileHeader = (props) => {
   let navigate = useNavigate();
   let wallet_address = props.wallet_address;
   const [profileData, setProfileData] = useState(null);
   const [pfpURL, setPfpURL] = useState("");

   const clickLink = (btn) => {
      if (btn == "sol") {
         return "https://explorer.solana.com/address/" + wallet_address;
      }
   }



   const Links = () => {
      return (
         <div className="spot-profile-header-link-list">
            <a className="spot-profile-header-button" href={clickLink("sol")}>
               <SolanaLogo className="spot-profile-header-button-sol" />
            </a>

            <Twitter wallet_address={wallet_address} />
            <a className="spot-profile-header-button" href={clickLink("qr")}>
               <QRIcon className="spot-profile-header-button-sol" wallet_id={wallet_address} />
            </a>
            <a className="spot-profile-header-button" href={clickLink("qr")}>
               <ShareIcon className="spot-profile-header-button-sol" wallet_id={wallet_address} />
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

   // UseEffects
   useEffect(() => {
      // Newly added guard clauses. nice.
      if (props.nftData === null) return;
      if (props.nftData.length == 0) return;
      setPfpURL(props.nftData[0].img_url);
   }, [props.nftData]);

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
            {pfpURL !== "" && <img className="spot-profile-header-img" src={pfpURL} />}
            {pfpURL == "" && <div className="spot-profile-header-img" />}

            <Domain wallet_address={wallet_address} />
            <p className="spot-profile-header-wallet">{SupportFunctions.formatAddress(wallet_address)}</p>
            {Bio()}
         </div>
         <Links />
      </div>
   )
};

export default ProfileHeader;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Domain from "components/domain/domain";
import Twitter from "components/twitter/twitter";
import SolanaLogo from "assets/solanaLogo";
import QRIcon from "assets/qrIcon";
import ShareIcon from "assets/shareIcon";
import QRCodeDialog from "components/spot/qrCodeDialog/qrCodeDialog"

import * as SupportFunctions from "services/general";
import styles from './profileHeader.module.css';


const ProfileHeader = (props) => {
   let navigate = useNavigate();
   let wallet_address = props.wallet_address;
   const [profileData, setProfileData] = useState(null);
   const [pfpURL, setPfpURL] = useState("");

   const [open, setOpen] = useState(false);

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const clickLink = (btn) => {
      if (btn == "sol") {
         return "https://explorer.solana.com/address/" + wallet_address;
      }
   }



   const Links = () => {
      return (
         <div className={styles.linksList} >
            <a className={styles.linkListButton} href={clickLink("sol")}>
               <SolanaLogo className={styles.linkListButtonIcon} />
            </a>

            <Twitter wallet_address={wallet_address} />
            <a className={styles.linkListButton} href={clickLink("qr")}>
               <QRIcon onClick={handleClickOpen} className={styles.linkListButtonIcon} />
            </a>
            <a className={styles.linkListButton} href={clickLink("qr")}>
               < ShareIcon className={styles.linkListButtonIcon} wallet_id={wallet_address} />
            </a >
         </div >
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
            <p className={styles.bio}>
               {profileData.bio}
            </p >
         )
      }
      else {
         return (
            <></>
         )
      }
   }

   return (
      <div className={styles.profileHeaderRoot}>
         <div className={styles.profileHeaderUpperContainer}>
            {pfpURL !== "" && <img className={styles.pfpImage} src={pfpURL} />}
            {pfpURL == "" && <div className={styles.pfpImage} />}


            <Domain wallet_address={wallet_address} />
            <p onClick={() => { navigator.clipboard.writeText(wallet_address) }} className={styles.shortenedAddress} >{SupportFunctions.formatAddress(wallet_address)}</p>
            {Bio()}
         </div>
         <Links />
         <QRCodeDialog
            open={open}
            onClose={handleClose}
            wallet_address={wallet_address}
         />
      </div >
   )
};

export default ProfileHeader;

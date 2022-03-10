import React, { useState, useEffect } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import QRCode from "qrcode.react";
import styles from './qrCodeDialog.module.css'

let siteRoot = "http://localhost:3000/";

const QRCodeDialog = (props) => {
   const [QR_URL, setQR_URL] = useState("");
   const { onClose, selectedValue, open } = props;

   const handleClose = () => {
      onClose(selectedValue);
   };


   // UseEffects
   useEffect(() => {
      let string = siteRoot + props.wallet_address;
      setQR_URL(string);
   }, []);

   return (
      <Dialog onClose={handleClose} open={open} className={styles.qrDialog} >
         <QRCode renderAs="svg"
            value={QR_URL}
            level="H"
            fgColor="#333"
            className={styles.qrCode} />,
      </Dialog>
   )
};

export default QRCodeDialog;

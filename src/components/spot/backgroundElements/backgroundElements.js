import { ListItem } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Particles from "react-tsparticles";
import BackgroundSVG from "assets/backgroundSVG"
import styles from './backgroundElements.module.css'




const BackgroundElements = (props) => {
   const [hexList, setHexList] = useState([]);
   const [loaded, setLoaded] = useState(false);

   const upperTone = (base) => {
      let incVal = 40;

      let r = base[0] + incVal;
      if (r > 255) r = 255;


      let g = base[1] + incVal;
      if (g > 255) g = 255;


      let b = base[2] + incVal;
      if (b > 255) b = 255;

      let tempItem = [r, g, b];

      return tempItem;
   }

   const lowerTone = (base) => {
      let incVal = 40;

      let r = base[0] - incVal;
      if (r < 0) r = 0;


      let g = base[1] - incVal;
      if (g < 0) g = 0;


      let b = base[2] - incVal;
      if (b < 0) b = 0;

      let tempItem = [r, g, b];

      return tempItem;
   }

   const hexToRgb = (hex) => {
      let tempList = [];
      let aRgbHex = hex.match(/.{1,2}/g);
      var initialRgb = [
         parseInt(aRgbHex[0], 16),
         parseInt(aRgbHex[1], 16),
         parseInt(aRgbHex[2], 16)
      ];

      tempList.push(initialRgb);
      tempList.push(lowerTone(initialRgb));
      tempList.push(upperTone(initialRgb));
      return tempList;
   }
   
   const RGBToHexItem = (rgb) => {
      let r = rgb[0];
      let g = rgb[1];
      let b = rgb[2];
      r = r.toString(16);
      g = g.toString(16);
      b = b.toString(16);

      if (r.length == 1)
         r = "0" + r;
      if (g.length == 1)
         g = "0" + g;
      if (b.length == 1)
         b = "0" + b;

      return "#" + r + g + b;
   }

   const RGBToHexList = (list) => {
      let hexList = [];
      hexList.push(RGBToHexItem(list[0]));
      hexList.push(RGBToHexItem(list[1]));
      hexList.push(RGBToHexItem(list[2]));
      return hexList;
   }


   // UseEffects
   useEffect(() => {
      if (props.profile_data == null) return;
      if (props.profile_data == undefined) return;

      let profile_color = props.profile_data.color;
      
      try {
         let color = profile_color;
         if (color == "") {
            color = "#afafaf"
         };

         let rgbList = hexToRgb(color);
         let hexArr = RGBToHexList(rgbList);
         
         setLoaded(true);
         setHexList(hexArr);
      } catch (error) {
         console.log("Background Load Error: ", error);
      }
 
      
   }, [props.profile_data]);

   if (props.profile_data !== null && hexList !== null)
      return (
         <div className={styles.backgroundElements} >
            <BackgroundSVG colors={hexList} className={styles.backgroundSVG} />
            <div className={styles.overlay} />
         </div>
      )
   else {
      return (
         <div className={styles.backgroundElements}>
            <BackgroundSVG colors={["#d7d7d7", "#afafaf", "#ffffff"]} className={styles.backgroundSVG} />
            <div className={styles.overlay} />
         </div>
      )
   }
};

export default BackgroundElements;
          //  

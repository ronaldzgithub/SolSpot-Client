import { ListItem } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Particles from "react-tsparticles";
import './backgroundElements.css'


const BackgroundElements = (props) => {
   const [rgbList, setRgbList] = useState([]);
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

      console.log(tempList);

      setRgbList(tempList)
   }

   const RGBToHex = (rgb) => {
      console.log(rgb)
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

   // UseEffects
   useEffect(() => {
      console.log("COLOR")
      console.log("COLOR", props.color)
      if (props.color == undefined) return;
      hexToRgb(props.color);
      setLoaded(true);
   }, [props.color]);

   if (loaded)
      return (
         <div className="spot-backgroundElements">
            <Particles
               id="tsparticles-stars2"
               className="spot-particles"
               options={{
                  fpsLimit: 10,
                  fullScreen: { enable: true },
                  particles: {
                     number: {
                        value: 50
                     },
                     shape: {
                        type: "circle"
                     },
                     opacity: {
                        value: 0.5
                     },
                     size: {
                        value: 400,
                        random: {
                           enable: true,
                           minimumValue: 200
                        }
                     },
                  },
                  style: {
                     filter: "blur(20px)",

                     transform: "scale(1.12)"
                  },
                  themes: [
                     {
                        name: "light",
                        default: {
                           value: true,
                           mode: "light"
                        },
                        options: {
                           background: {
                              color: "#f7f8ef",
                           },
                           particles: {
                              color: {
                                 value: [RGBToHex(rgbList[0]), RGBToHex(rgbList[1]), RGBToHex(rgbList[2])]
                              }
                           }
                        }
                     },
                     {
                        name: "dark",
                        default: {
                           value: true,
                           mode: "dark"
                        },
                        options: {
                           background: {
                              color: "#080710"
                           },
                           particles: {
                              color: {
                                 value: [RGBToHex(rgbList[0]), RGBToHex(rgbList[1]), RGBToHex(rgbList[2])]
                              }
                           }
                        }
                     }
                  ]
               }}
            />
         </div>
      )
   else {
      return (
         <p>hello world</p>
      )
   }
};

export default BackgroundElements;
          //  <div className="spot-background-overlay" />

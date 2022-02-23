import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import SaveIcon from "assets/saveIcon"
import ResetIcon from "assets/resetIcon"


import DeleteIcon from "assets/deleteIcon"

import './speedDial.css'


const actions = [
   { icon: <SaveIcon />, name: 'SAVE' },
   { icon: <ResetIcon />, name: 'RESET' },
];

const FloatingSpeedDial = (props) => {

   const clicked = (name) => {
      if (name == "SAVE") {
         props.update_profile()
      }
      if (name == "RESET") {
         props.reset_profile();
      }
   }



   return (
      <>
         <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
            <SpeedDial
               ariaLabel="SolSpot Action Dial"
               sx={{ position: 'fixed', bottom: 16, right: 16 }}
               icon={<SpeedDialIcon />}
            >
               {actions.map((action) => (
                  <SpeedDialAction
                     key={action.name}
                     icon={action.icon}
                     tooltipTitle={action.name}
                     onClick={() => clicked(action.name)}
                  />
               ))}
            </SpeedDial>
         </Box>
      </>
   )
};

export default FloatingSpeedDial;

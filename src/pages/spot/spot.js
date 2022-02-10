import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Logo from "components/logo/logo.js"
import NFTShowCase from "components/nftshowcase/nftshowcase"
import Domain from "components/domain/domain"
import Twitter from "components/twitter/twitter"

import CopySVG from "assets/copySVG.js"

import * as web3 from "@solana/web3.js";

import './spot.css'


// A67Ry58HhJs9FAz14K38cHRKoCFsnWyppRcCZD87B5Rf

const Spot = () => {
  const { id } = useParams();
  let item = "https://arweave.net/WHiOxMtFT0zjA-IO2BQbKqE7Lm2bDBy20NUdH_lJ-JE"

  const formatAddress = (address) => {
    let str = address.slice(0,4) + "...." + address.slice(-4)
    return str;
  }

  return (
    <div className="main">
        <div className="logoContainer">
          <Logo />
        </div>

        <div className="spot-header-card">
            <div className="col1">
              <img src={item} className="pfp" />
            </div>
            
            <div className="col2">
              <Domain id={id}  />
              <div className="address-chip">
                <CopySVG className="copy-svg" />
                <p className="address-text">{formatAddress(id)}</p>
              </div>
              <Twitter id={id}  />
              
              
            </div>
            
        </div>
        
        <NFTShowCase id={id} />
    </div>
  )
};

export default Spot;

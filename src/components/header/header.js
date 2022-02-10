import React from 'react';

import Logo from "../../components/logo/logo.js"
import { Link } from 'react-router-dom';
import './header.css'

const Header = () => {

  return (
    <div className="header">
        <Logo />
        <Link className="createSpotBtn" to={`/create`}>Build Your SolSpot</Link>
    </div>
  )
};

export default Header;

import React from 'react';
import './logo.css'

import { Link } from 'react-router-dom';

const Logo = () => {

  return (
        <Link className="logo" to={`/`}>SolSpot</Link>
  )
};

export default Logo;

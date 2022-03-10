import React from 'react';
import { Link } from 'react-router-dom';
import styles from './logo.module.css'

const Logo = () => {

   return (
      <Link className={styles.logo} to={`/`}>SolSpot</Link>
   )
};

export default Logo;

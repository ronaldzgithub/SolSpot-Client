import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Logo from "../../components/logo/logo.js"

const Spot = () => {
  const [account, setAccount] = useState("");


  const changeSearch = (event) => {
      setAccount(event.target.value);
  };


  const handleSubmit = () => {
      console.log("test")
      setAccount("")
  };


  return (
    <div className="main">
        <div className="logoContainer">
          <Logo />
        </div>
        <span className="pfp" />
        <div className="searchContainer">
            <div className="inputContainer">
                <input
                    value={account}
                    onChange={changeSearch}
                    className="input"
                    placeholder="Bio Here"
                />
            </div>
            
            <button className="activeSearchBtn" onClick={() => handleSubmit()}>Submit</button>
        </div>
    </div>
  )
};

export default Spot;

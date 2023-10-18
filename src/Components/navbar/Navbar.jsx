import React from "react";
import "./navbar.css";
import { RiMenu3Line, RiCloseLin } from "react-icons/ri";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

function Navbar() {
  let navigate = useNavigate();
  const routeChangeSignIn = () => {
    let path = "/login";
    navigate(path);
  };
  const routeChangeSignUp = () => {
    let path = "/register";
    navigate(path);
  };

  return (
    
<div className="navbar">
<div className="logo">
<img src={logo} alt="logo" />
</div>
<div className="links">
  <a href="#">Contact</a>
  <button className="btn" onClick={routeChangeSignIn}>Sign In</button>
  <button className="btn"  onClick={routeChangeSignUp}>Sign Up</button>
</div>
</div>
  );
}

export default Navbar;


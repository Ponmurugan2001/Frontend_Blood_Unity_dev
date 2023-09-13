import React from "react";
import "./navbar.css";
import { RiMenu3Line, RiCloseLin } from "react-icons/ri";
import logo from '../../assets/logo.png'
import { useNavigate } from "react-router-dom";

function Navbar() {
  let navigate = useNavigate();
  const routeChangeSignIn = () => {
      let path = '/login';
      navigate(path);
  }
  const routeChangeSignUp = () => {
    let path = '/register';
    navigate(path);
}

  return (
    <div className="bu_navbar">
      <div className="bu_navbar_links">
        <div className="bu_navbar_links_logo">
          <img src={logo} alt="logo"/>
        </div>
        <div className="bu_navbar_sign">
        <p><a href="#About">About</a></p>
        <p><a href="Contact">Contact</a></p>
        
        <button type="button" onClick={routeChangeSignIn}>Sign in</button>
        <button type="button" onClick={routeChangeSignUp}>Sign up</button>

        </div>

      </div>
    </div>
  );
}

export default Navbar;

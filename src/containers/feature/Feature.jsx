import React from "react";
import "./feature.css";
import request_img from '../../assets/request.png'
import inventory_img from '../../assets/management.png'
import donation_img from '../../assets/blood-donation.png'
import { useNavigate } from 'react-router-dom';
import  { useState } from 'react';

function Feature() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handle_RButtonClick = () => {
    navigate('/register'); // Navigate to the '/register' route
  };

  const handle_LButtonClick = () => {
    navigate('/login'); // Navigate to the '/login' route
  };

  const handle_IButtonClick = () => {
    navigate('/inventory'); // Navigate to the '/inventory' route
  };

  return (
    <div className={`bu_features ${isHovered ? 'new-class' : 'original-class'}`}>
      <button
        type="button"
        onClick={handle_RButtonClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={request_img} alt="request"/>
        <h1>Request for blood</h1>
        <p>If you are in need of blood, it means that you or someone you know requires blood transfusion. Tap here to make a blood request.</p>
      </button>

      <button type="button" onClick={handle_LButtonClick} onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <img src={donation_img} alt="request"/>
        <h1>Donate blood</h1>
        <p>Blood donors are the unsung heroes who willingly roll up their sleeves and offer a precious gift - the gift of life. Tap here to become a lifesaver.</p>
      </button>

      <button type="button" onClick={handle_IButtonClick} onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <img src={inventory_img} alt="request"/>
        <h1>Blood Inventory</h1>
        <p>The efficient management of blood inventory is vital for delivering prompt and effective healthcare, especially in emergency situations where every second counts. Tap here to know about Blood Inventory.</p>
      </button>
    </div>
  );
}

export default Feature;

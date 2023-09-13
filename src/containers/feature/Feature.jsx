import React from "react";
import "./feature.css";
import request_img from '../../assets/request.png'
import inventory_img from '../../assets/management.png'
import donation_img from '../../assets/blood-donation.png'
function Feature() {
  return (
    <div className="bu_features">
      <div className="bu_button"></div>

      <button type="button">
      <img src={request_img} alt="request"/>
       <h1>Request for blood</h1>
       <p>If you are in need of blood, it means that you or someone you know requires blood transfusion. Tap here to make a blood request. </p>
      </button>
      <div className="bu_button"></div>

      <button type="button">
      <img src={donation_img} alt="request"/>
      <h1>Donate blood</h1>
      <p>Blood donors are the unsung heroes who willingly roll up their sleeves and offer a precious gift - the gift of life. Tap here to become a lifesaver.</p>
      
      </button>
      <div className="bu_button"></div>
   

      <button type="button">
      <img src={inventory_img} alt="request"/>
      <h1>Blood Inventory</h1>
      <p>The efficient management of blood inventory is vital for delivering prompt and effective healthcare, especially in emergency situations where every second counts.Tap here to know about Blood Inventory </p>
      </button>
    </div>
  );
}

export default Feature;

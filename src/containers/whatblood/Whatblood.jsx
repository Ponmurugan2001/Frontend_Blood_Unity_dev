import React from "react";
import "./whatblood.css";
import donar_img from "../../assets/donor.jpg";
function Whatblood() {
  return (
    <div className="what_blood_mng">
      <div className="image">
        <img src={donar_img} alt="" />
      </div>
      <div className="about">
        <h1>About</h1>
        <p>
        

"Tired of being inundated with messages and calls urging you to donate blood? Say goodbye to the hassle and welcome a user-friendly solution. Our website allows you to effortlessly connect with blood banks when you're eager to contribute or in dire need of blood. Simply register and log in to access our services. We're here to make the process smooth and efficient.
        </p>
        <div className="about_sub">
          <div className="about_sub1">
            <h2>Donor-Recipient Interaction</h2>
            <p>
            Our platform ensures secure connections between donors and recipients, prioritizing privacy. Coordinate logistics, schedule appointments, and communicate with confidence, knowing that your data is protected. Your trust and privacy are paramount throughout the process.
            </p>
          </div>
          <div className="about_sub2">
            <h2> Inventory Management</h2>
            <p>
            Blood banks can optimize stock levels and track expiration dates effortlessly. Real-time updates and tools empower administrators to maintain accurate, up-to-date records, minimizing wastage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Whatblood;

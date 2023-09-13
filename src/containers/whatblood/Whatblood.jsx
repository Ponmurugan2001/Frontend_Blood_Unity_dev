import React from "react";
import "./whatblood.css";
import donar_img from "../../assets/donar.png";
function Whatblood() {
  return (
    <div className="what_blood_mng">
      <div className="image">
        <img src={donar_img} alt="" />
      </div>
      <div className="about">
        <h1>About</h1>
        <p>
          No more worries regarding the messages and calls annoying you to
          donate blood. Here is a user-friendly site that helps you to easily
          contact blood banks if you are interested in donating blood.you can
          simply register and login to our website if you feel to donate or in
          urgent need of blood.
        </p>
        <div className="about_sub">
          <div className="about_sub1">
            <h2>How it Works?</h2>
            <p>
              we help you in filtering the messages by letting you know about
              the current status of the patient and donation status online.every
              time you donate, you will be given credits which will be
              publicly visible next to your name.
            </p>
          </div>
          <div className="about_sub2">
            <h2>How it Works?</h2>
            <p>
              We maintain a real time inventory of available blood units which
              includes blood type and expiration dates. The blood bank
              staff can monitor and regularly update the availability of
              the blood.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Whatblood;

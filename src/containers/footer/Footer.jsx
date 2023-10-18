import React from 'react'
import './footer.css'
import Contact from "../../assets/contact.png";
import insta from "../../assets/insta.png";
import Facebook from "../../assets/facebook.png";
import Twitter from "../../assets/twit.png";
import "font-awesome/css/font-awesome.min.css"; 

function Footer() {
  return (
    <div className='contactContainer'>
    <img src={Contact} alt="Contact pic" />
    <div className='copyright'>
      <h1>Say Hello</h1>
      <a href="mailto:bloodunity2023@example.com">
            Email@BloodUnity2023
          </a>
  
    <div className="social-icons">


          <a href="https://www.facebook.com/your-facebook-page">
            <img src={Facebook} alt="Facebook" className="icon-small" />
          </a>
          <a href="https://www.instagram.com/your-instagram-profile">
            <img src={insta} alt="Instagram" className="icon-small" />
          </a>
          <a href="https://twitter.com/your-twitter-profile">
            <img src={Twitter} alt="Twitter" className="icon-small" />
     
    </a>
  </div>
</div>

    </div>
  )
}

export default Footer
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import "./donorhome.css"
function Card({ profileElement }) {
  return (
    <div className="donorcontainer">
      <div className="donorwrapper">
        <div className="donorbanner-image"></div>
        <h1>Profile details</h1>
        <p>Name: {profileElement.Name}</p>
      <p>Email Id: {profileElement.email}</p>
      <p>Phone Number: {profileElement.phoneNumber}</p>
      <p>Blood Group: {profileElement.bloodGroup}</p>
      <p>Age: {profileElement.Age}</p>
      <p>Location: {profileElement.location}</p>
      <p>Availability: {profileElement.Availability}</p>
      </div>
     
      
    </div>
   
  );
}

function DonorHome() {
  const { user } = useSelector((state) => state.user);
  const [M_data, setM_data] = useState([]);
  const params = useParams();
  const donorId = user?._id;
  console.log(donorId);
  const REACT_BASE_URL = "https://backend-blood-unity-dev.onrender.com"
  const profile = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_BASE_URL+`/api/user/profile/get-Donor-Profile/${donorId}`, {
        
         
          
        
        
        
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data?.success) {
        console.log(response.data);
        setM_data(response.data?.Profile);

      }
    } catch (error) {
      console.error(error);
    }
  };
console.log(M_data)
  useEffect(() => {
    profile();
  }, [user]); 

  return( <div>
    <div className="main1">
  <h1>Donor Profile</h1>
  <div className="card-container">
    
    {M_data ? (
      <Card profileElement={M_data} />
    ) : (
      <p>No profile element found</p>
    )}
  </div>
</div>
</div>
);
}

export default DonorHome;

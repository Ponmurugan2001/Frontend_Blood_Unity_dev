import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import "./recipienthome.css"
function Card({ profileElement }) {
  return (
    <div className="card">
      <p>Name: {profileElement.Name}</p>
      <p>Phone Number: {profileElement.phoneNumber}</p>
      
      <p>Age: {profileElement.Age}</p>
      <p>Location: {profileElement.location}</p>
      
    </div>
  );
}

function RecipientHome() {
  const { user } = useSelector((state) => state.user);
  const [M_data, setM_data] = useState([]);
  const params = useParams();
  const RecipientId = user?._id;
  console.log( RecipientId);
  const REACT_BASE_URL = "https://backend-blood-unity-dev.onrender.com"
  const profile = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_BASE_URL+`/api/user/recipient/profile/get-recipient-Profile/${RecipientId}`, {
        
         
          
        
        
        
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
    <div className="main">
  <h1>Profile</h1>
  <div className="card-container">
    {/* Render a single Card component for the profile element */}
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

export default RecipientHome;

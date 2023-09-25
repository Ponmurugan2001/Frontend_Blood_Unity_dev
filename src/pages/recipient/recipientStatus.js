import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
import { Card, Button } from 'react-bootstrap'; // Import Bootstrap Card and Button components
import "./recipientstatus.css"
import photo from "../../assets/profile.png"
function RecipientBloodStatus() {
  const { user } = useSelector((state) => state.user);
  const [M_data, setM_data] = useState({});
  const recipientId = user?._id;

  const profile = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + `/api/user/recipient/profile/get-recipient-appointments/${recipientId}`
      );
     
      if (response.data?.success) {
        setM_data(response.data.appointment.donorInfo);
        console.log("Data received:", response.data.appointment.donorInfo);
        
      } else {
        alert("No pending appointments found.");
      }
    } catch (error) {
      console.error(error);
      alert("Error loading pending appointments.");
    }
  };

  useEffect(() => {
    profile();
  }, [user]);

  useEffect(() => {
    console.log("M_data:", M_data); // Log the updated data when M_data changes
  }, [M_data]);

//   const handleAccept = async () => {
//     try {
//       const response = await axios.post(
//         process.env.REACT_APP_BASE_URL + `/api/user/profile/update-appointment`,
//         { donorId:user?._id,
//             status: "accepted"}
//       );
  
//       if (response.data?.success) {
//         alert("Appointment has been accepted.");
//         // You can perform additional actions here if needed
//       } else {
//         alert("Failed to accept the appointment.");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Error accepting the appointment.");
//     }
//   };
  

//   const handleReject = async () => {
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}/api/user/profile/update-appointment`,
//         {
//           donorId: user?._id,
//           status: "rejected"
//         }
//       );
  
//       if (response.data?.success) {
//         alert("Appointment has been rejected.");
//         // You can perform additional actions here if needed
//       } else {
//         alert("Failed to reject the appointment.");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Error rejecting the appointment.");
//     }
//   };
  

  return (
    <div className="card-container">
      <Card className="card">
        <div className="circle-photo">
          <img src= {photo}  alt="Profile" />
        </div>
        <Card.Body>
          <Card.Title>Donor Details</Card.Title>
          <Card.Text>Name: {M_data?.Name}</Card.Text>
          <Card.Text>Phone number: {M_data?.phoneNumber}</Card.Text>
          <Card.Text>Location: {M_data?.location}</Card.Text>
          <Button variant="success">Blood received</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default RecipientBloodStatus;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
import { Card, Button } from 'react-bootstrap'; // Import Bootstrap Card and Button components
import "./donorhome.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DonorBloodRequest() {
  const { user } = useSelector((state) => state.user);
  const [M_data, setM_data] = useState({});
  const donorId = user?._id;
  const [flaskemail, setFlaskEmail] = useState('');
  const [flaskname, setFlaskName] = useState('');

  const profile = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + `/api/user/profile/get-pending-appointments/${donorId}`
      );
     
      if (response.data?.success) {
        setM_data(response.data.appointment.recipentInfo);
        console.log("Data received:", response.data.appointment.recipentInfo);
        
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

  const handleAccept = async () => {
    try {
      const updatedFlaskEmail = M_data.email;
      const updatedFlaskName = M_data.name;

      // Update the states
      setFlaskEmail(updatedFlaskEmail);
      setFlaskName(updatedFlaskName);

      // Construct emailData here after updating states
      const emailData = {
        recipient: updatedFlaskEmail,
        subject: `Your Blood Donation Request Has Been Accepted`,
        message: `Hello ${updatedFlaskName},
        
      We have some wonderful news to share with you! ${user.name} has accepted your blood donation request. Your lifeline is on its way!
      
      
      Stay strong, and know that a community of caring hearts surrounds you. We will ensure a smooth process for you to receive the blood you need.
      
      Thank you for being a part of Blood Unity! 
      
      Warm regards,
      Blood Unity Team`,
      };

      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + `/api/user/profile/update-appointment`,
        {
          donorId: user?._id,
          status: "accepted"
        }
      );

      if (response.data?.success) {
        await axios.post("http://localhost:5000/send_email", emailData);
        console.log("Email sent successfully:", response.data);
        window.alert(response.data.message);
      } else {
        alert("Failed to accept the appointment.");
      }
    } catch (error) {
      console.error(error);
      alert("Error accepting the appointment.");
    }
  };
  

  const handleReject = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/user/profile/update-appointment`,
        {
          donorId: user?._id,
          status: "rejected"
        }
      );
  
      if (response.data?.success) {
        alert("Appointment has been rejected.");
        // You can perform additional actions here if needed
      } else {
        alert("Failed to reject the appointment.");
      }
    } catch (error) {
      console.error(error);
      alert("Error rejecting the appointment.");
    }
  };
  

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>Name: {M_data?.name}</Card.Title>
          <Card.Text>Email: {M_data?.email}</Card.Text>
          <Button variant="success" onClick={handleAccept}>Accept</Button>
          <Button variant="danger" onClick={handleReject}>Reject</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default DonorBloodRequest;




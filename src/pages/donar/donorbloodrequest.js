import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
import { Card, Button } from 'react-bootstrap'; // Import Bootstrap Card and Button components
import "./donorhome.css"

function DonorBloodRequest() {
  const { user } = useSelector((state) => state.user);
  const [M_data, setM_data] = useState({});
  const donorId = user?._id;

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
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + `/api/user/profile/update-appointment`,
        { donorId:user?._id,
            status: "accepted"}
      );
  
      if (response.data?.success) {
        alert("Appointment has been accepted.");
        // You can perform additional actions here if needed
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

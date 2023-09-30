import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import "./recipientstatus.css";
import photo from "../../assets/profile.png";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RecipientBloodStatus() {
  const { user } = useSelector((state) => state.user);
  const [M_data, setM_data] = useState({});
  const [DonorId, setDonorId] = useState({});
  const [appointmentStatus, setAppointmentStatus] = useState({});

  const recipientId = user?._id;

  const profile = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + `/api/user/recipient/profile/get-recipient-appointments/${recipientId}`
      );

      if (response.data?.success) {
        setM_data(response.data.appointment.donorInfo);
        setDonorId(response.data.appointment.donorId);
        setAppointmentStatus(response.data.appointment.status);
      } else {
        toast.error("No pending appointments found.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error loading pending appointments.");
    }
  };

  useEffect(() => {
    profile();
  }, [user]);

  useEffect(() => {
    console.log("M_data:", M_data);
    console.log("donor id is:", DonorId);
  }, [M_data]);

  const handleSuccess = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + `/api/user/profile/update-appointment`,
        { donorId: DonorId, status: "successfull" }
      );

      if (response.data?.success) {
        toast.success("Appointment has been accepted.");
        setAppointmentStatus("successfull");
      } else {
        toast.error("Failed to accept the appointment.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error accepting the appointment.");
    }
  };

  return (
    <div className="card-container">
      {appointmentStatus === "accepted" ? (
        <Card className="card">
          <div className="circle-photo">
            <img src={photo} alt="Profile" />
          </div>
          <Card.Body>
            <Card.Title>Donor Details</Card.Title>
            <>
              <Card.Text>Name: {M_data?.Name}</Card.Text>
              <Card.Text>Phone number: {M_data?.phoneNumber}</Card.Text>
              <Card.Text>Location: {M_data?.location}</Card.Text>
              <Button variant="success" onClick={handleSuccess}>
                Blood received
              </Button>
            </>
          </Card.Body>
        </Card>
      ) : appointmentStatus === "pending" ? (
        <p>Blood donation request from {M_data?.Name} is currently pending. Once the request is accepted, we will provide you with the contact details.</p>
      ) : (
        <p>No Pending Blood Donation Request</p>
      )}
    </div>
  );
}

export default RecipientBloodStatus;

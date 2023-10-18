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
        <div className="col-md-4 mb-4" key={profile._id}>
        <div className="donorcontainer">
          <div className="donorwrapper">
            <div className="donorbanner-image"></div>
            <h1>Donor details</h1>
            <p>
              Name: {M_data?.Name} <br />
              Email: {M_data?.email} <br />
              Age: {M_data?.Age} <br />
              Location: {M_data?.location} <br />
              Phone number: {M_data?.phoneNumber}
            </p>
            <div className="donorbutton-wrapper">
              <button
                className="fillaccept"
                onClick={handleSuccess}
              >
                Blood recived
              </button>
            </div>
          </div>
        </div>
      </div>
      ) : appointmentStatus === "pending" ? (
        <p>Blood donation request from {M_data?.Name} is currently pending. Once the request is accepted, we will provide you with the contact details.</p>
      ) : (
        <p>No Pending Blood Donation Request</p>
      )}
    </div>
  );
}

export default RecipientBloodStatus;

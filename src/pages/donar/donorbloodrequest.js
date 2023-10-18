
import './donorbloodrequest.css'; // Import the CSS file

// const DonorBloodRequest = () => {
//   return (
//     <div className="donorcontainer">
//       <div className="donorwrapper">
//         <div className="donorbanner-image"></div>
//         <h1>Recipient details</h1>
//         <p>
//           Name: {M_data?.name} <br />
//           Email: {M_data?.email}
//         </p>
//       </div>
//       <div className="donorbutton-wrapper">
//         <button className="donorbtn outline">DETAILS</button>
//         <button className="donorbtn fill">BUY NOW</button>
//       </div>
//       <div className="message-container">{message}</div>
//     </div>
//   );
  
// };

// export default DonorBloodRequest;























import React, { useEffect, useState } from "react";

import axios from "axios";
import { useSelector } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DonorBloodRequest() {
  const { user } = useSelector((state) => state.user);
  const [M_data, setM_data] = useState({});
  const [message, setMessage] = useState('');
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
        setMessage("No pending appointments found.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error loading pending appointments.");
    }
  };

  useEffect(() => {
    profile();
  }, [user]);

  const handleAccept = async () => {
    try {
      const updatedFlaskEmail = M_data.email;
      const updatedFlaskName = M_data.name;

      const emailData = {
        recipient: updatedFlaskEmail,
        subject: `Your Blood Donation Request Has Been Accepted`,
        message_body: `Hello ${updatedFlaskName},
        
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

      if (response.data.success) {
        setMessage(`${updatedFlaskName} has been accepted.`);
        toast.success(`${updatedFlaskName} has been accepted.`, { autoClose: 3000 });
        
        axios
          .post("http://localhost:5000/send_email", emailData)
          .then((response) => {
            console.log("Email sent successfully:", response.data);
          })
          .catch((error) => {
            console.error("Error sending email:", error);
          });
      } else {
        setMessage("Failed to accept the appointment.");
        toast.error("Failed to accept the appointment.", { autoClose: 3000 });
      }
    } catch (error) {
      console.error(error);
      setMessage("Error accepting the appointment.");
      toast.error("Error accepting the appointment.", { autoClose: 3000 });
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
        setMessage("Appointment has been rejected.");
        toast.success("Appointment has been rejected.", { autoClose: 3000 });
      } else {
        setMessage("Failed to reject the appointment.");
        toast.error("Failed to reject the appointment.", { autoClose: 3000 });
      }
    } catch (error) {
      console.error(error);
      setMessage("Error rejecting the appointment.");
      toast.error("Error rejecting the appointment.", { autoClose: 3000 });
    }
  };

  return (
    <div className="donorcontainer">
      <div className="donorwrapper">
        <div className="donorbanner-image"></div>
        <h1>Recipient details</h1>
        <p>
          Name: {M_data?.name} <br />
          Email: {M_data?.email}
        </p>
      </div>
      <div className="donorbutton-wrapper">
        <button className="fillreject" onClick={handleReject}>REJECT</button>
        <button className="fillaccept" onClick={handleAccept}>ACCEPT</button>
      </div>
      <div className="message-container">{message}</div>
    </div>
  );
}

export default DonorBloodRequest;

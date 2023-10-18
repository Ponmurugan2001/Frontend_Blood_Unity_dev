import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./recipientbloodrequest.css";
import photo from "../../assets/profile.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RecipientBloodRequest() {
  const { user } = useSelector((state) => state.user);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [bookedAppointment, setBookedAppointment] = useState(null);
  const [flaskemail, setFlaskEmail] = useState('');
  const [flaskname, setFlaskName] = useState('');

  useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL+"/api/user/profile/get-Donor-All", {
      method: "GET",
      headers: {
        // Add any necessary headers here (e.g., authentication tokens)
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProfiles(data.Profile);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
        console.error("Error fetching data:", error);
      });
  }, []);

  const filteredProfiles = profiles.filter((profile) => {
    if (
      (selectedBloodGroup === "All" ||
        profile.bloodGroup === selectedBloodGroup) &&
      (selectedLocation === "All" || profile.location === selectedLocation)
    ) {
      return true;
    }
    return false;
  });

  const handleBloodGroupChange = (event) => {
    setSelectedBloodGroup(event.target.value);
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleCardClick = async (profile) => {
    try {
      const updatedFlaskEmail = profile.email;
      const updatedFlaskName = profile.Name;

      // Update the states
      setFlaskEmail(updatedFlaskEmail);
      setFlaskName(updatedFlaskName);

      // Construct emailData here after updating states
      const emailData = {
        recipient: updatedFlaskEmail,
        subject: `${user.name} is in need of blood. Kindly help them.`,
        message_body: `Hello ${updatedFlaskName},
        
      We have an urgent request for blood donation from ${user.name}. 
      
      Their life depends on your kindness and willingness to donate blood. Your contribution can make a significant difference.
      
      Thank you for joining Blood Unity! Your commitment to our mission of saving lives through blood donation means the world to us. 
      
      Warm regards,
      
      Ponmurugan V
      Blood Unity Team`,
      };

      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + "/api/user/profile/donor-appointment",
        {
          recipientId: user._id,
          donorId: profile.donor,
          recipentInfo: user,
          donorInfo: profile,
        }
      );

      if (response.data.success) {
        axios
        .post("http://localhost:5000/send_email", emailData)
        .then((response) => {
          console.log("Email sent successfully:", response.data);
          toast.success("Email sent successfully", { position: toast.POSITION.TOP_RIGHT });
      
          // Check if the response has a 'success' field and it's true
          if (response.data.success === true) {
            // Reload the page
            window.location.reload();
          }
          // Handle other cases or display additional messages to the user as needed.
        })
        .catch((error) => {
          console.error("Error sending email:", error);
          // Handle the error or display an error message to the user.
        });
      
        toast.success(response.data.message, { position: toast.POSITION.TOP_RIGHT });
        
      }
    } catch (error) {
      toast.error("Error booking appointment", { position: toast.POSITION.TOP_RIGHT });
    }

    setBookedAppointment(
      `Booked Appointment with ${profile.donor} ${profile.Name}`
    );
  };

  return (
    <div className="container">
      <h1>Donor Profiles</h1>
      <div className="d-flex justify-content-between mb-3">
        <div className="form-group">
          <label htmlFor="bloodGroupFilter">Select Blood Group</label>
          <select
            id="bloodGroupFilter"
            className="form-control"
            value={selectedBloodGroup}
            onChange={handleBloodGroupChange}
          >
            <option value="All">All</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            {/* Add more blood group options here */}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="locationFilter">Select Location</label>
          <select
            id="locationFilter"
            className="form-control"
            value={selectedLocation}
            onChange={handleLocationChange}
          >
            <option value="All">All</option>
            {/* Add more location options here */}
          </select>
        </div>
      </div>

      <div className="row">
        {filteredProfiles.map((profile, index) => (
          <div className="col-md-4 mb-4" key={profile._id}>
            <div className="donorcontainer">
              <div className="donorwrapper">
                <div className="donorbanner-image"></div>
                <h1>Donor details</h1>
                <p>
                  Name: {profile.Name} <br />
                  Email: {profile.email} <br />
                  bloodgroup:{profile.bloodGroup}<br/>
                  Age: {profile.Age} <br />
                  Location: {profile.location} <br />
                  Availability: {profile.Availability}
                </p>
                <div className="donorbutton-wrapper">
                  <button
                    className="fillaccept"
                    onClick={() => handleCardClick(profile)}
                  >
                    Request blood
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {bookedAppointment && (
        <div className="alert alert-success mt-3">{bookedAppointment}</div>
      )}

      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default RecipientBloodRequest;

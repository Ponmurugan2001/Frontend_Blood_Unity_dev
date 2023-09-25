import React, { useEffect, useState } from "react";
import axios from "axios";
import { setUser } from "../../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./recipientbloodrequest.css";
import photo from "../../assets/profile.png";

function RecipientBloodRequest() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [bookedAppointment, setBookedAppointment] = useState(null);

  useEffect(() => {
    fetch("http://localhost:9000/api/user/profile/get-Donor-All", {
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
      (selectedBloodGroup === "All" || profile.bloodGroup === selectedBloodGroup) &&
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

  const { user } = useSelector((state) => state.user);

  const handleCardClick = async (profile) => {
    try {
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
        window.alert(response.data.message);
      }
    } catch (error) {
      window.alert("Error booking appointment");
    }

    setBookedAppointment(`Booked Appointment with ${profile.donor} ${profile.Name}`);
  };

  return (
    <div className="container">
      <h1>Donor Profiles</h1>
      <div className="d-flex justify-content-between mb-3">
        <div className="form-group">
          <label htmlFor="bloodGroupFilter"> Select Blood Group</label>
          <select
            id="bloodGroupFilter"
            className="form-control"
            
            value={selectedBloodGroup}
            onChange={handleBloodGroupChange}
          >
              <option value="All">All</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
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

<option value="Ariyalur">Ariyalur</option>
<option value="Chengalpattu">Chengalpattu</option>
<option value="Chennai">Chennai</option>
<option value="Coimbatore">Coimbatore</option>
<option value="Cuddalore">Cuddalore</option>
<option value="Dharmapuri">Dharmapuri</option>
<option value="Dindigul">Dindigul</option>
<option value="Erode">Erode</option>
<option value="Kallakurichi">Kallakurichi</option>
<option value="Kanchipuram">Kanchipuram</option>
<option value="Kanyakumari">Kanyakumari</option>
<option value="Karur">Karur</option>
<option value="Krishnagiri">Krishnagiri</option>
<option value="Madurai">Madurai</option>
<option value="Mayiladuthurai">Mayiladuthurai</option>
<option value="Nagapattinam">Nagapattinam</option>
<option value="Namakkal">Namakkal</option>
<option value="Nilgiris">Nilgiris</option>
<option value="Perambalur">Perambalur</option>
<option value="Pudukkottai">Pudukkottai</option>
<option value="Ramanathapuram">Ramanathapuram</option>
<option value="Ranipet">Ranipet</option>
<option value="Salem">Salem</option>
<option value="Sivaganga">Sivaganga</option>
<option value="Tenkasi">Tenkasi</option>
<option value="Thanjavur">Thanjavur</option>
<option value="Theni">Theni</option>
<option value="Thoothukudi">Thoothukudi</option>
<option value="Tiruchirappalli">Tiruchirappalli</option>
<option value="Tirunelveli">Tirunelveli</option>
<option value="Tirupathur">Tirupathur</option>
<option value="Tiruppur">Tiruppur</option>
<option value="Tiruvallur">Tiruvallur</option>
<option value="Tiruvannamalai">Tiruvannamalai</option>
<option value="Tiruvarur">Tiruvarur</option>
<option value="Vellore">Vellore</option>
<option value="Viluppuram">Viluppuram</option>
<option value="Virudhunagar">Virudhunagar</option>
          </select>
        </div>
      </div>
  
      <div className="row">
        {filteredProfiles.map((profile, index) => (
          <div className="col-md-4 mb-4" key={profile._id}>
            <div
              className="card clickable-card"
              onClick={() => handleCardClick(profile)}
            >
              <div className="profile-pic">
                <img src={photo} alt="Profile" />
              </div>
              <div className="card-body">
                <h5 className="card-title">{profile.Name}</h5>
                <p className="card-text">
                  <strong>Phone Number:</strong> {profile.phoneNumber}
                </p>
                <p className="card-text">
                  <strong>Blood Group:</strong> {profile.bloodGroup}
                </p>
                <p className="card-text">
                  <strong>Age:</strong> {profile.Age}
                </p>
                <p className="card-text">
                  <strong>Location:</strong> {profile.location}
                </p>
                <p className="card-text">
                  <strong>Availability:</strong> {profile.Availability}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
  
      {bookedAppointment && (
        <div className="alert alert-success mt-3">{bookedAppointment}</div>
      )}
    </div>
  );
  
}

export default RecipientBloodRequest;

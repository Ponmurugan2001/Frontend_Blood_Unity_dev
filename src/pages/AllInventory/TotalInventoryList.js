import React, { useEffect, useState } from "react";
import "./totalyinventorylist.css";

function TotalInventoryList() {
  const [inventory, setInventory] = useState([]);
  const [bloodGroupFilter, setBloodGroupFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const bloodGroups = ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"];
  const locationOptions = [
    "Ariyalur",
    "Chengalpattu",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
    "Kallakurichi",
    "Kanchipuram",
    "Kanyakumari",
    "Karur",
    "Krishnagiri",
    "Madurai",
    "Mayiladuthurai",
    "Nagapattinam",
    "Namakkal",
    "Nilgiris",
    "Perambalur",
    "Pudukkottai",
    "Ramanathapuram",
    "Ranipet",
    "Salem",
    "Sivaganga",
    "Tenkasi",
    "Thanjavur",
    "Theni",
    "Thoothukudi",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tirupathur",
    "Tiruppur",
    "Tiruvallur",
    "Tiruvannamalai",
    "Tiruvarur",
    "Vellore",
    "Viluppuram",
    "Virudhunagar",
  ];

  useEffect(() => {
    // Fetch all inventory data from your API
    fetch(process.env.REACT_APP_BASE_URL+"/api/user/Totalinventory/get-Totalinventory")
      .then((response) => response.json())
      .then((data) => {
        setInventory(data);
      })
      .catch((error) => {
        console.error("Error fetching inventory:", error);
      });
  }, []);

  const filteredInventory = inventory.filter(
    (item) =>
      (!bloodGroupFilter || item.bloodGroup === bloodGroupFilter) &&
      (!locationFilter || item.location === locationFilter)
  );

  return (
    <div>
      <h1>Total Inventory List</h1>
      <div className="row">
        <div className="col-md-6">
          <label htmlFor="bloodGroupFilter">Filter by Blood Group:</label>
          <select
            id="bloodGroupFilter"
            className="form-control"
            onChange={(e) => setBloodGroupFilter(e.target.value)}
            value={bloodGroupFilter}
          >
            <option value="">All</option>
            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="locationFilter">Filter by Location:</label>
          <select
            id="locationFilter"
            className="form-control"
            onChange={(e) => setLocationFilter(e.target.value)}
            value={locationFilter}
          >
            <option value="">All</option>
            {locationOptions.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
      </div>
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Organisation Name</th>
            <th>Blood Group</th>
            <th>Quantity</th>
            <th>Location</th>
            <th>Address</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map((item) => (
            <tr key={item._id}>
              <td>{item.organisationName}</td>
              <td>{item.bloodGroup}</td>
              <td>{item.quantity}</td>
              <td>{item.location}</td>
              <td>{item.Address}</td>
              <td>{new Date(item.updatedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TotalInventoryList;

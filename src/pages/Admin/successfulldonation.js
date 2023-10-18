import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "antd"; // Import Bootstrap components
import { useSelector } from "react-redux";
import "./successfulldonation.css";

function SuccessfulDonationadmin() {
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch data from the API
    if (user && user._id) {
      fetch( process.env.REACT_APP_BASE_URL+"/api/user/successfull/getAllSuccessfulDonations")
        .then((response) => response.json())
        .then((data) => {
          // Update the 'data' state variable with the fetched data
          setData(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [user]); // Make the effect depend on 'user'

  return (
    <div>
      <h1>Successful Donations</h1>
      <Row gutter={16}>
        {data.map((item) => (
          <Col span={8} key={item._id}>
            <Card
              title={"successfull Donation"}
              className="custom-card" // Apply your custom card styling
            >
              <p>Donor Name: {item.appointments[0].donorInfo.Name}</p>
              <p>Recipient Name: {item.appointments[0].recipentInfo.name}</p>
              <p>Location: {item.appointments[0].donorInfo.location}</p>
              {/* Add more content as needed */}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default SuccessfulDonationadmin;

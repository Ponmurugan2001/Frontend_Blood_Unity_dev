import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import InputType from '../../Form/InputType';
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import axios from 'axios';
import {message } from "antd";

function OrganisationInvent() {
  const [inventoryType, setInventoryType] = useState("in");
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [M_data, setM_data] = useState([]); // Change data to M_data
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.user);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const REACT_BASE_URL = "https://backend-blood-unity-dev.onrender.com"
  const handleModalSubmit = async () => {
    try {
      if (!bloodGroup || !quantity) {
        return alert("Please Provide All Fields");
      }
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + "/api/user/inventory/create-inventory",
        {
          organisation: user?._id,
          inventoryType,
          bloodGroup,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data?.success) {
        message.success("New Record Created");
        const ProfileData = await axios.get(
          process.env.REACT_APP_BASE_URL + `/api/user/inventory/get-inventory-profile/${user?._id}`,
          
        );
        if ( ProfileData.data?.success) {
          
            const organisationDetails= ProfileData.data.profiles[0]
            console.log(organisationDetails)
            
            const TotInventory = await axios.post(
              process.env.REACT_APP_BASE_URL + "/api/user/Totalinventory/create-Totalinventory",
              {
                  bloodGroup: bloodGroup,
                  quantity: quantity,
                  inventoryType:  inventoryType,
                  organisation: user?._id,
                  organisationName:organisationDetails.OrganisationName,

                  phoneNumber: organisationDetails.phoneNumber,
                  email: organisationDetails.email,
                  Address:organisationDetails. Address,
                  location: organisationDetails.location,
                
              },)
              if ( TotInventory.data?.success) {console.log("message sent")}
              else {console.log("error")}
            
            
        }
        window.location.reload();

          
        
      }
    } catch (error) {
      alert(error.response.data.message);
      console.error(error);
      window.location.reload();
    }
  };
  
    

  const getBloodRecords = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_BASE_URL+"/api/user/inventory/get-inventory", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data?.success) {
        console.log(response.data);
        setM_data(response.data?.inventory); // Change setData to setM_data
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);

  return (
    <div>
     <Button
  className='button1'
  variant="primary"
  onClick={handleShow}
  style={{
    // Add your inline CSS properties here
    backgroundColor: 'rgb(250, 0, 79)',
    color: 'white',
    borderRadius: '5px',
    // Add more properties as needed
  }}
>
  ADD inventory
</Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Manage Blood Records</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex mb-3">
            Blood Type: &nbsp;
            <div className="form-check ms-3">
              <input
                type="radio"
                name="inRadio"
                defaultChecked
                value={"in"}
                onChange={(e) => setInventoryType(e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="in" className="form-check-label">
                IN
              </label>
            </div>
            <div className="form-check ms-3">
              <input
                type="radio"
                name="inRadio"
                value={"out"}
                onChange={(e) => setInventoryType(e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="out" className="form-check-label">
                OUT
              </label>
            </div>
          </div>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => setBloodGroup(e.target.value)}
          >
            <option defaultValue={"Open this select menu"}>
              Select Blood group
            </option>
            <option value={"O+"}>O+</option>
            <option value={"O-"}>O-</option>
            <option value={"AB+"}>AB+</option>
            <option value={"AB-"}>AB-</option>
            <option value={"A+"}>A+</option>
            <option value={"A-"}>A-</option>
            <option value={"B+"}>B+</option>
            <option value={"B-"}>B-</option>
          </select>
          <InputType
            labelText={"Quantity (UNITS)"}
            labelFor={"quantity"}
            inputType={"Number"}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} style={{ backgroundColor: 'red', color: 'white' }}>
  Close
</Button>

<Button variant="primary" onClick={handleModalSubmit} style={{ backgroundColor: 'green', color: 'white' }}>
  Submit
</Button>
        </Modal.Footer>
      </Modal>

      {loading ? (
        <p>Loading...</p>
      ) : M_data.length > 0 ? ( // Change data to M_data
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Blood Group</th>
              <th scope="col">Inventory Type</th>
              <th scope="col">Quantity</th>
              <th scope="col">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {M_data.map((record) => ( // Change data to M_data
              <tr key={record._id}>
                <td>{record.bloodGroup}</td>
                <td>{record.inventoryType}</td>
                <td>{record.quantity} (UNITS)</td>
                <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default OrganisationInvent;

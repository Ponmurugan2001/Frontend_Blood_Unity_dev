import React, { useState } from "react";
import "./feature.css";
import request_img from "../../assets/request.png";
import request_img_white from "../../assets/request white.png";
import inventory_img from "../../assets/management.png";
import inventory_img_white from "../../assets/management white.png";
import donation_img from "../../assets/blood donor colour.png";
import donation_img_white from "../../assets/blood donor.png";
import org_img from "../../assets/hospital colour.png";
import org_img_white from "../../assets/hospital.png";
import { useNavigate } from "react-router-dom";

function Feature() {
  const navigate = useNavigate();
  const [isHoveredRequest, setIsHoveredRequest] = useState(false);
  const [isHoveredInventory, setIsHoveredInventory] = useState(false);
  const [isHoveredDonation, setIsHoveredDonation] = useState(false);
  const [isHoveredOrg, setIsHoveredOrg] = useState(false);

  const handle_RButtonClick = () => {
    navigate("/register");
  };

  const handle_LButtonClick = () => {
    navigate("/login");
  };

  const handle_IButtonClick = () => {
    navigate("/inventory");
  };

  return (
    <div className="landing-page">
      <div className="grid-container">
        {/* First Grid (35%) */}
        <div className="grid-item grid-item-1">
          <h1>Services</h1>
          <p>
            The Blood Unity offers life-saving blood donation and distribution
            services to meet the medical needs of patients and hospitals.
          </p>
        </div>
      </div>

      {/* Second Grid (65%) */}
      <div className="grid-container">
        <div className="sub-grid">
          {/* Sub-Grid 1 */}
          <div className="sub-grid-item">
            {/* Button for Sub-Grid 1 */}
            <button
              onMouseEnter={() => setIsHoveredRequest(true)}
              onMouseLeave={() => setIsHoveredRequest(false)}
              onClick={handle_RButtonClick}
            >
              {isHoveredRequest ? (
                <img src={request_img_white} alt="request_white" />
              ) : (
                <img src={request_img} alt="request" />
              )}
              <h1>Request for blood</h1>
              <p>
                If you are in need of blood, it means that you or someone you
                know requires blood transfusion. Tap here to make a blood
                request.
              </p>
            </button>
          </div>

          {/* Sub-Grid 2 */}
          <div className="sub-grid-item">
            {/* Button for Sub-Grid 2 */}
            <button
              onMouseEnter={() => setIsHoveredDonation(true)}
              onMouseLeave={() => setIsHoveredDonation(false)}
              onClick={handle_RButtonClick}
            >
              {isHoveredDonation ? (
                <img src={donation_img_white} alt="donation_white" />
              ) : (
                <img src={donation_img} alt="donation" />
              )}
              <h1>Donate blood</h1>
              <p>
                You can save lives by donating blood. Tap here to become a blood
                donor and contribute to the cause.
              </p>
            </button>
          </div>

          {/* Sub-Grid 3 */}
          <div className="sub-grid-item">
            {/* Button for Sub-Grid 3 */}
            <button
              onMouseEnter={() => setIsHoveredInventory(true)}
              onMouseLeave={() => setIsHoveredInventory(false)}
              onClick={handle_IButtonClick}
            >
              {isHoveredInventory ? (
                <img src={inventory_img_white} alt="inventory_white" />
              ) : (
                <img src={inventory_img} alt="inventory" />
              )}
              <h1>Inventory management</h1>
              <p>
                Manage the inventory of blood products efficiently. Tap here to
                access the inventory management system.
              </p>
            </button>
          </div>

          {/* Sub-Grid 4 */}
          <div className="sub-grid-item">
            {/* Button for Sub-Grid 4 */}
            <button
              onMouseEnter={() => setIsHoveredOrg(true)}
              onMouseLeave={() => setIsHoveredOrg(false)}
              onClick={handle_RButtonClick}
            >
              {isHoveredOrg ? (
                <img src={org_img_white} alt="org_white" />
              ) : (
                <img src={org_img} alt="org" />
              )}
              <h1>Organization</h1>
              <p>
                Explore our organization and learn about our mission and vision.
                Tap here to know more.
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feature;

import React from "react";
import "./brand.css";
import blood_img from "../../assets/blood.png";
import plasma_img from "../../assets/plasma.png";
import platelet_img from "../../assets/platelet.png";

function Brand() {
  return (
    <div className="blood_components">
      <div className="blood_item">
        <img src={blood_img} alt="blood" />
        <h2>Whole blood</h2>
        <h3>What is it?</h3>
        <p>
          Blood collected straight from the donor after its donation usually
          separated into red blood cells, platelets and plasma.
        </p>
        <h3>Who can donate?</h3>
        <p>
          You need to be 18-65 years old, weigh 45kg or more, You should not
          have donated blood for past 56 days and be fit and healthy.
        </p>
      </div>
      <div className="blood_item">
        <img src={plasma_img} alt="plasma" />
        <h2>Plasma</h2>
        <h3>What is it?</h3>
        <p>
          Straw-coloured liquid that holds RBC, WBC, Platelets and nutrients;
          used for creating 18 medical products to treat diverse medical conditions.
        </p>
        <h3>Who can donate?</h3>
        <p>
          You need to be 18-70 (men) or 20-70 (women) years old, weigh 50kg or
          more and must have given successful whole blood donation in last two
          years.
        </p>
      </div>
      <div className="blood_item">
        <img src={platelet_img} alt="platelet" />
        <h2>Platelet</h2>
        <h3>What is it?</h3>
        <p>
          The tiny 'plates' that wedge together to help to clot and reduce
          bleeding. Vital for patient with malaria and cancer.
        </p>
        <h3>Who can donate?</h3>
        <p>
          You need to be 18-70 years old, weigh 50kg or more and must have given
          a successful plasma donation in the past 12 months.
        </p>
      </div>
    </div>
  );
}

export default Brand;

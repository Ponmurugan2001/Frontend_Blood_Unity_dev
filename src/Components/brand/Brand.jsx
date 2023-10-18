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
        <p>
        whole blood includes red blood cells, white blood cells, platelets, and plasma, comprising all blood components
        </p>
      </div>
      <div className="blood_item">
        <img src={plasma_img} alt="plasma" />
        <h2>Plasma</h2>
        <p>

        Plasma is the yellowish fluid in blood, mainly composed of water, proteins, electrolytes, hormones, and waste products.
        </p>
      </div>
      <div className="blood_item">
        <img src={platelet_img} alt="platelet" />
        <h2>Platelet</h2>
        <p>
          The tiny 'plates' that wedge together to help clot and reduce
          bleeding. Vital for patients with malaria and cancer.
        </p>
      </div>
    </div>
  );
}

export default Brand;

import React from "react";
import DefaultLayout from "../../Components/DefaultLayout";
import TotalInventoryList from "./TotalInventoryList"; // Import your TotalInventoryList component

function InventoryPage() {
  return (
    <DefaultLayout>
      <div className="content">
        <TotalInventoryList />
      </div>
    </DefaultLayout>
  );
}

export default InventoryPage;

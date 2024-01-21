import axios from "axios";
import React, { useEffect, useState } from "react";
import CommonSection from "../components/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import VehicleItem from "../components/VehicleItem";

export default function VehicleListing() {
  const [ vehicle, setVehiclesList ] = useState([]);
  const [ selectedVehicleType, setSelectedVehicleType ] = useState("All");

  useEffect(() => {
    axios.get("http://localhost:3000/vehicle")
      .then(response => {
        setVehiclesList(response.data.data);
        console.log(response.data.data);
      })
      .catch(error => {
        console.error("Error fetching vehicle data", error);
      })
  }, []);

  const handleVehicleTypeChange = (event) => {
    setSelectedVehicleType(event.target.value);
  };

  const filteredVehicles = selectedVehicleType === "All"
    ? vehicle
    : vehicle.filter(item => item.vtype === selectedVehicleType);

  return (
    <Helmet title="vehicles">
      <CommonSection title="Vehicle Reviews" />

      <section>
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-5">
            <span className="flex items-center gap-2">
              <i className="ri-sort-asc"></i> Sort Vehicle By
            </span>

            <select className="form-select" value={selectedVehicleType} onChange={handleVehicleTypeChange}>
              <option value="All">All</option>
              <option value="Car">Car</option>
              <option value="Bike">Bike</option>
              <option value="Scooter">Scooter</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-16 pt-8">
            {filteredVehicles.map((item) => (
              <VehicleItem vehicle={item} key={item.id} reviews={item.reviews} />
            ))}
          </div>
        </div>
      </section>
    </Helmet>
  );
};


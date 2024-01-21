import React from "react";

export default function FindVehicle() {
  return (
    <form className="form">
      <div className="flex flex-col items-center w-full">
        <div className="mb-4 w-full ">
          <input
            type="text"
            placeholder="Brand"
            required
            className="input-field w-full"
          />
        </div>

        <div className="mb-4 w-full ">
          <select className="select-field w-full">
            <option value="gas">Gas</option>
            <option value="electric">Electric</option>
          </select>
        </div>

        <div className="mb-4 w-full ">
          <input
            type="date"
            placeholder="Journey date"
            required
            className="input-field w-full"
          />
        </div>

        <div className="mb-4 w-full ">
          <select className="select-field w-full">
            <option value="car">Car</option>
            <option value="bike">Bike</option>
            <option value="scooter">Scooter</option>
          </select>
        </div>

        <div className="mb-4 w-full ">
          <button className="btn find__car-btn w-full">Find Car</button>
        </div>
      </div>
    </form>
  );
};


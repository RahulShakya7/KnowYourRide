import React from "react";
import { IoColorPalette } from "react-icons/io5";
import { MdFactory } from "react-icons/md";
import { VscTypeHierarchy } from "react-icons/vsc";
import { Link } from "react-router-dom";
import "../Styles/Vehicle-item.css";

export default function VehicleItem({ vehicle , reviews}) {
  const { color, id, manufacturer, model, specs, vimage, vtype, year } = vehicle;
  
  const imageUrl = `http://localhost:3000/uploads/vehicles/${vimage}`;

  return (
      <div className="vehilcle__item">
        <div className="vehilcle__img h-3/5">
          <img src={imageUrl} alt="" className="h-full w-full object-cover" />
        </div>

        <div className="vehilcle__item-content mt-4">
          <h4 className="section__title text-center">{model}</h4>
            <div className="vehilcle__item-info flex justify-evenly items-center mt-3 mb-4 p-4">
              <span className="flex items-center gap-2">
                <MdFactory /> {manufacturer}
              </span>
              <span className="flex items-center gap-2">
                <IoColorPalette /> {color}
              </span>
              <span className="flex items-center gap-2">
                <VscTypeHierarchy /> {vtype}
              </span>
              </div>
                <Link to={`/vehicle/${id}`}>
                  <button className="review__item-btn review__btn-rent text-white w-full">
                    Reviews
                  </button>
                </Link>
              </div>
              <br/>
            <div>
        </div>
      </div>
  );
};


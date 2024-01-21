import axios from "axios";
import React, { useEffect, useState } from "react";
import AboutSection from "../components/AboutSection";
import Helmet from "../components/Helmet/Helmet";
import HeroSlider from "../components/HeroSlider";
import NewsList from "../components/NewsList";
import VehicleItem from "../components/VehicleItem";

export default function Home() {
  const [ vehicle, setVehiclesList ] = useState([]);

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
  return (
    <Helmet title="Home">
      {/* ============= hero section =========== */}
      <section className="p-0 hero__slider-section">
        <HeroSlider />

        {/* <div className="hero__form absolute top-0 left-0 right-0 bottom-0 bg-opacity-75 bg-black">
          <div className="container mx-auto h-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
              <div className="lg:col-span-1 flex items-center p-8">
                <h2 className="text-white text-4xl font-bold">
                  Find your best Vehicle here
                </h2>
              </div>

              <div className="lg:col-span-1 flex items-center p-8">
                <FindVehicle />
              </div>
            </div>
          </div>
        </div> */}
      </section>

      {/* =============== News section =========== */}
      <section>
        <div className="container mx-auto py-10 ">
          <div className="mb-5 text-center">
            <h6 className="text-gray-600">Explore our News</h6>
            <h2 className="text-4xl font-bold pb-4">Latest News</h2>
          </div>

          <NewsList />
        </div>
      </section>
        <hr/>
      {/* =========== About section ================ */}
      <AboutSection />

      {/* =========== Car offer section ============= */}
      <hr/>
      <section>
        <div className="container mx-auto mt-12 mb-12">
          <div className="mb-5 text-center">
            <h6 className="text-gray-600">Check out our</h6>
            <h2 className="text-4xl font-bold">Hot Picks</h2>
          </div>

          {/* Render carData items here */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {vehicle.map((item) => (
              <VehicleItem vehicle={item} key={item.id} reviews={item.reviews} />
            ))}
          </div>
        </div>
      </section>
    </Helmet>
  );
};


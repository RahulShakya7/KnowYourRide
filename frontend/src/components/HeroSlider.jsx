import React, { useEffect, useState } from "react";
import "../Styles/Hero-slider.css";
import sliderImage1 from "../assets/all-images/slider-img/slider-1.png";
import sliderImage2 from "../assets/all-images/slider-img/slider-2.jpeg";
import sliderImage3 from "../assets/all-images/slider-img/slider-3.jpg";

const images = [sliderImage1, sliderImage2, sliderImage3];

export default function HeroSlider() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="hero min-h-screen"
      style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Learn about the latest Vehicles</h1>
          <p className="mb-5">
            Get to know the Information on the latest vehicles in the market along with pre-existing ones. 
            Get to know trends, news, and reviews on any Car, Bike or Scooter that are available in the market or are about to be launched.
          </p>
          {/* <button className="btn btn-primary"></button> */}
        </div>
      </div>
    </div>
  );
}

import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillCar } from "react-icons/ai";
import { IoColorPalette } from "react-icons/io5";
import { MdDateRange, MdFactory } from "react-icons/md";
import ReactStars from 'react-rating-star-with-type';
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "./ReviewList";

export default function VehicleDetails() {
  const { slug } = useParams();

  const [ loading, setLoading ] = useState(true);
  const [ vehicle, setVehicle ] = useState({}); 

  useEffect(() => {
    axios.get(`http://localhost:3000/vehicle/${slug}`)
      .then(response => {
        setVehicle(response.data);
        console.log(response.data)
        window.scrollTo(0, 0);
      })
      .catch(error => {
        console.error("Error fetching news data:", error);
      });
  }, [slug]);

  const vehicleid = vehicle.id; 
  // console.log(vehicleid);

  const getToken = () => `bearer ${window.localStorage.getItem('token')}`
  const token = getToken();
  // console.log(token);
  const [reviews, setReviewsList] = useState([]); 
  
  useEffect(() => {
    if (vehicle.id) {
      axios.get(`http://localhost:3000/vehicle/${vehicle.id}/reviews`, {
        headers: {
          Authorization: token,
        },
      })
        .then(response => {
          setReviewsList(response.data.data);
          console.log(response.data.data);
          setLoading(false)
        })
        .catch(error => {
          console.error("Error fetching vehicle data:", error);
          // setLoading(false)
        })
        .finally(() => {
          setLoading(false); 
        });
    }
  }, [vehicle.id]);

  if (loading) {
    return <p className="pt-200">Loading...</p>; // Return loading message while waiting for data
  }

  const imageUrl = vehicle.vimage
    ? `http://localhost:3000/uploads/vehicles/${vehicle.vimage}`
    : null;

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + Number(review.rating), 0) / reviews.length
    : 0;
  console.log(averageRating);
  
  const ratingcount = reviews.length;
  const parsedDate = new Date(vehicle.year);

  // Extract date components
  const year = parsedDate.getFullYear();
  const month = parsedDate.toLocaleString('default', { month: 'long' });
  const day = parsedDate.getDate(); 

  return (
    <Helmet title={vehicle.model}>
      <section className="py-20">
        <div className="container mx-auto py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10 pt-5 m-2  shadow-md">
            <div>
              <img src={imageUrl} alt="" className="w-full" />
            </div>

            <div className="p-6">
              <div className="vehicle__info">
                <h2 className="section__title font-bold text-5xl">{vehicle.model}</h2>

                <div className="d-flex align-items-center gap-5 mb-4 mt-3">
                  <span className="d-flex align-items-center gap-2">
                    <ReactStars 
                        value={averageRating}
                        edit={false}  
                        activeColor={ "#8568FC" } 
                        size={20}
                      />
                    ({ratingcount} ratings) 
                  </span>
                </div>

                <p className="section__description pb-8 text-xl">
                  {vehicle.specs}
                </p>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-lg section__description">
                    <i className="ri-roadster-line" ><MdFactory/></i>
                    {vehicle.manufacturer}
                  </span>

                  <span className="flex items-center gap-1 text-lg section__description">
                    <i className="ri-settings-2-line" ><MdDateRange/></i>
                    {`${month} ${day}, ${year}`}
                  </span>

                  <span className="flex items-center gap-1 text-lg section__description">
                    <i className="ri-timer-flash-line" ><AiFillCar/></i>
                    {vehicle.vtype}
                  </span>
                </div>

                <div className="d-flex items-center mt-3">
                  <span className="flex items-center gap-1 text-lg section__description">
                    <i className="ri-map-pin-line" ><IoColorPalette /> </i>{" "}
                    {vehicle.color}
                  </span>

                </div>
              </div>
            </div>
          </div>
          <br/>
          <hr/>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col lg:flex-row">
              <div className="review_vehicle mt-10 lg:mr-4 w-full">
                <h5 className="mb-2 font-bold text-xl mb-4">Review {vehicle.vtype}</h5>
                  {vehicle.id && <ReviewForm vehicleId={vehicleid}/>}
              </div> 
            </div>
            <div className="review_vehicle mt-10">
                {vehicle.id && <ReviewList reviews={reviews} vehicleid={vehicle.id}/>}
              </div>
          </div>
        </div>
      </section>
    </Helmet>
  );
};



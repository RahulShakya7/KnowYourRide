import axios from "axios";
import React, { useState } from "react";
import { Form, FormGroup } from "reactstrap";

import { message } from "antd";
import "../Styles/Review-form.css";
export default function ReviewForm({ vehicleId }) {
  const [star, setStar] = useState(2);
  const [comment, setComment] = useState("");

  const token = () => `bearer ${window.localStorage.getItem('token')}`;


  // const role = () => `bearer ${window.localStorage.getItem('role')}`;
  // console.log(vehicleId);

  const submitHandler = async (event) => {
    event.preventDefault();

    const isAuthenticated = window.localStorage.getItem('token');
    if (!isAuthenticated) {
      console.log("User is not authenticated. Please log in.");
      message.warning("Please Sign In")
      return;
    }
    
    const review = {
      vehicleid: vehicleId,
      rating: star,
      comment: comment,
    };
  
    try {
      const response = await axios.post(
        `http://localhost:3000/vehicle/${vehicleId}/reviews`,
        review,
        {
          headers: {
            Authorization: token(),
          },
        }
      );
      message.success("Review Added");
      // Handle the response if needed
      console.log("Review submitted:", response.data);
    } catch (error) {
      // Handle error if the request fails
      message.success("Error adding review");

      console.error("Error submitting review:", error);
    }
  };

  // console.log(star);
  return (
    <div>
      <Form>
        <FormGroup>
          <textarea
            rows={5}
            type="textarea"
            value={comment}
            className="textarea"
            placeholder="Write a review here"
            onChange={(e) => setComment(e.target.value)} 
          ></textarea>
        </FormGroup>
      </Form>
      <div className="center-items">
        <div className="rating rating-xl rating-half justify-center space-evenly my-4 pt-4 pb-4 w-full">
          <input type="radio" name="rating-10" className="rating-hidden" />
          <input onChange={() => setStar(0.5)} type="radio" name="rating-10" className="bg-purple-400 mask mask-star-2 mask-half-1 p-1" />
          <input onChange={() => setStar(1)} type="radio" name="rating-10" className="bg-purple-400 mask mask-star-2 mask-half-2 p-1" />
          <input onChange={() => setStar(1.5)} type="radio" name="rating-10" className="bg-purple-400 mask mask-star-2 mask-half-1 p-1" />
          <input onChange={() => setStar(2)} type="radio" name="rating-10" className="bg-purple-400 mask mask-star-2 mask-half-2 p-1" />
          <input onChange={() => setStar(2.5)} type="radio" name="rating-10" className="bg-purple-400 mask mask-star-2 mask-half-1 p-1" />
          <input onChange={() => setStar(3)} type="radio" name="rating-10" className="bg-purple-400 mask mask-star-2 mask-half-2 p-1" />
          <input onChange={() => setStar(3.5)} type="radio" name="rating-10" className="bg-purple-400 mask mask-star-2 mask-half-1 p-1" />
          <input onChange={() => setStar(4)} type="radio" name="rating-10" className="bg-purple-400 mask mask-star-2 mask-half-2 p-1" />
          <input onChange={() => setStar(4.5)} type="radio" name="rating-10" className="bg-purple-400 mask mask-star-2 mask-half-1 p-1" />
          <input onChange={() => setStar(5)} type="radio" name="rating-10" className="bg-purple-400 mask mask-star-2 mask-half-2 p-1" />
        </div>
      </div>
      <br/>
      <button className="review w-50 text-white w-full" onClick={submitHandler}>
        Submit Review
      </button>
    </div>
  );
};


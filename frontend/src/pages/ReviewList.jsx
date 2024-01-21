// import axios from "axios";
import { message } from 'antd';
import axios from "axios";
import React from "react";
import { BiSolidUserCircle, BiTrash } from "react-icons/bi";
import ReactStars from 'react-rating-star-with-type';

export default function ReviewList({ reviews , vehicleid }) {

    // const token = localStorage.getItem("token");
    // const userid = window.localStorage.getItem('userId');

    // const handleVehicleDelete = async (vehicleid, reviewid) => {
    //   try {
    //     const response = await axios.delete(`http://localhost:3000/vehicle/${vehicleid}/reviews/${reviewid}`, {
    //       headers: {
    //         Authorization: token,
    //       },
    //     });
  
    //     if (response.status === 200) {
    //       message.success('review deleted successfully');
    //       // Perform any additional logic after successful deletion
    //       // For example, you might want to update the list of vehicles
    //     } else {
    //       message.error('Failed to delete review');
    //     }
    //   } catch (error) {
    //     console.error('Error deleting Review:', error);
    //     message.error('An error occurred while deleting the review');
    //   }
    // };

    return (
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mt-5">
        <div>
              <h3 className="font-bold text-2xl mb-3">Reviews</h3>
              {reviews.map((review, index) => (
                <div key={index} className="p-4 rounded-lg mb-3 shadow-md">
                  <div className="flex items-center">
                    <div className="pl-2 pr-4">
                      <BiSolidUserCircle size={60}/>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{review.username}</p>
                      <p>{review.comment}</p>
                      {/* {
                        (userid === review.user) && (
                          <button onClick={() => handleVehicleDelete(vehicleid, review._id)} className="text-red-500">
                            <BiTrash />
                          </button>
                        )
                      } */}
                    </div>
                  </div>
                  <div className="flex items-center mt-4 mb-2">
                    <ReactStars 
                      value={Number(review.rating)}
                      edit={false}  
                      activeColor={ "#8568FC" } 
                      size={50}
                      classNames="justify-center space-evenly w-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
    );
  };
  
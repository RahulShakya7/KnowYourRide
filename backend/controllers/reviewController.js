const Vehicle = require("../models/vehicleModel");
const Reviews = require("../models/reviewModel");

// const getAllReviews = (req, res, next) => {
//   Reviews.find()
//     .then((reviews) => res.json(reviews))
//     .catch(next);
// };

const getAllReviews = (req, res, next) => {
  const { vehicle_id } = req.params;

  // Find the vehicle by its ID
  Vehicle.findById(vehicle_id)
    .populate('reviews') 
    .then((vehicle) => {
      if (!vehicle) {
        return res.status(404).json({ error: "Vehicle not found" });
      }

      // Extract the reviews from the populated 'reviews' field of the vehicle
      const reviews = vehicle.reviews;

      res.json({
        success: true,
        count: reviews.length,
        data: reviews,
      });
    })
    .catch(next);
};


const createReview = async (req, res, next) => {
  try {
    const { vehicle_id } = req.params;

    const vehicle = await Vehicle.findById(vehicle_id);
    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    const newReview = new Reviews({
      ...req.body,
      username: req.user.username,
      vehicleid: vehicle._id,
      user: req.user.id,
    });

    const savedReview = await newReview.save();
    await vehicle.updateOne({ $push: { reviews: savedReview._id } });

    res.status(201).json(savedReview);
  } catch (error) {
    next(error);
  }
};


const deleteReviews = async (req, res, next) => {
  try {
    // Delete reviews from the Reviews schema
    await Reviews.deleteMany();

    // Delete reviews from the vehicle's reviews list
    await Vehicle.updateMany({}, { $set: { reviews: [] } });

    res.json({ message: 'Reviews deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const getAVehicleReviews = (req, res, next) => {
  const { vehicle_id, review_id } = req.params;

  Vehicle.findById(vehicle_id)
    .populate("reviews")
    .then((vehicle) => {
      if (!vehicle) {
        return res.status(404).json({ error: "Vehicle not found" });
      }

      const review = vehicle.reviews.find(
        (r) => r._id.toString() === review_id
      );
      if (!review) {
        return res.status(404).json({ error: "Review not found" });
      }

      res.json(review);
    })
    .catch(next);
};

const editReviewbyID = (req, res, next) => {
  const { review_id } = req.params;

  Reviews.findById(review_id)
    .then((review) => {
      if (!review) {
        return res.status(404).json({ error: "Review not found" });
      }

      if (review.user.toString() !== req.user.id) {
        return res
          .status(403)
          .json({ error: "Unauthorized to edit this review" });
      }

      review.rating = req.body.rating;
      review.comment = req.body.comment;

      review
        .save()
        .then((updatedReview) => {
          res.json(updatedReview);
        })
        .catch(next);
    })
    .catch(next);
};

const deleteReviewbyID = async function (req, res, next) {
  try {
    const vehicle = await Vehicle.findById(req.params.vehicle_id);
    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    const reviewIndex = vehicle.reviews.findIndex((r) => {
      return r._id.toString() === req.params.review_id;
    });

    if (reviewIndex === -1) {
      return res.status(404).json({ error: "Review not found" });
    }

    const review = await Reviews.findById(req.params.review_id);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    if (review.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this review" });
    }

    vehicle.reviews.splice(reviewIndex, 1);

    await Promise.all([review.deleteOne(), vehicle.save()]);

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = { 
  getAllReviews,
  createReview,
  deleteReviews,
  viewAvehicleReview: getAVehicleReviews,
  editReviewbyID,
  deleteReviewbyID,
};

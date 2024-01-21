const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    vehicleid : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'vehicle',
    },
    user: {
      type : mongoose.Schema.Types.ObjectId,
      ref: 'username',
    },
    username: {
      type: String,
      required: true
    },
    rating : {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment : {
      type: String,
      required: true,
    },
  });
  
module.exports = new mongoose.model('review', reviewSchema);

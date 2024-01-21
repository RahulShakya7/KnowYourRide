const mongoose = require('mongoose');


const vehicleSchema = new mongoose.Schema({
  manufacturer : {
    type: String,
    required: true,
  },
  vimage: {
    type: String,
    default: null,
  },
  model : {
    type: String,
    required: true,
  },
  year : {
    type: Date,
    required: true,
  },
  specs : {
    type : String,
    required : true,
  },
  color : {
    type : String,
  },
  vtype : {
    type : String,
    enum : ['Car','Bike','Scooter'],
    default : 'Bike' 
  },
  reviews : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'review',
  }]
});

vehicleSchema.set('toJSON', {
  transform: (document, returnedDocument) => {
      returnedDocument.id = document._id.toString()
      delete returnedDocument._id
      delete returnedDocument.__V
  }
})

module.exports = new mongoose.model('vehicle', vehicleSchema);

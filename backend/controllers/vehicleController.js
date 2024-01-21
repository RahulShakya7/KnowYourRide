const Vehicle = require('../models/vehicleModel')

const getAllVehicles = (req, res, next) => {
    Vehicle.find()
        .then(vehicles => res.json({
          success: true,
          count: vehicles.length,
          data: vehicles,
        }))
        .catch(next)
}

const addVehicle = (req, res, next) => {
    Vehicle.create(req.body)
        .then((vehicle) => res.status(201).json(vehicle))
        .catch(err => next(err))
}

const deleteVehicles = (req, res, next) => {
    Vehicle.deleteMany()
        .then(reply => res.json(reply))
        .catch(next)
}

const getAVehicle = (req,res,next) => {
    const vehicleId = req.params.vehicle_id;

    Vehicle.findById(vehicleId)
        .then((vehicle) => {
        if (!vehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }
        res.json(vehicle);
        })
        .catch(next);
}

const editAVehicle = (req, res, next) => {
    const vehicleId = req.params.vehicle_id;
    const changes= req.body;
  
    Vehicle.findByIdAndUpdate(
      vehicleId,
      changes,
      { new: true }
    )
      .then((vehicle) => {
        if (!vehicle) {
          return res.status(404).json({ error: 'Vehicle not found' });
        }
        res.json(vehicle);
      })
      .catch(next);
}

const deleteAVehicle = (req, res, next) => {
    const vehicleId = req.params.vehicle_id;

    Vehicle.findByIdAndDelete(vehicleId)
      .then((deletedVehicle) => {
        if (!deletedVehicle) {
          return res.status(404).json({ error: 'Vehicle not found' });
        }
        res.json({ message: 'Vehicle deleted successfully' });
      })
      .catch(next);
}

const vehicleImage = (req, res, next) => {
    if (!req.file) {
      return res.status(400).send({ message: "Please upload a file" });
    }
  
    Vehicle.findByIdAndUpdate(
      req.params.vehicle_id,
      { vimage: req.file.filename },
      { new: true }
    )
      .then((vehicle) => {
        res.status(200).json({
          success: true,
          data: req.file.filename,
          vehicle: vehicle,
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  
};


module.exports = {
    getAllVehicles,
    addVehicle,
    deleteVehicles,
    getAVehicle,
    editAVehicle,
    deleteAVehicle,
    vehicleImage
}
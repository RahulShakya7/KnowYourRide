const express = require('express')
const vehicleController = require('../controllers/vehicleController')
const reviewController = require('../controllers/reviewController')
const { verifyUser, verifyAdmin } = require('../middlewares/authMiddleware')
const { vehicleUpload } = require('../middlewares/uploads')

const router = express.Router()

router.route('/')
    .get(
        vehicleController.getAllVehicles
    )
    .post(
        // verifyAdmin,
        vehicleController.addVehicle
    )

    .put((req, res) => {
        res.status(405).json({ error:"This method (PUT) is not allowed" })
    })

    .delete(
        // verifyAdmin,
        vehicleController.deleteVehicles
    )
    
router.route('/:vehicle_id')
    .get(
        vehicleController.getAVehicle
    )

    .post((req, res) => {
        res.status(405).json({error: 'This method (POST) is not allowed'})
    })

    .put(
        // verifyAdmin,
        vehicleController.editAVehicle
    )

    .delete(
        // verifyAdmin,
        vehicleController.deleteAVehicle
    );

router.route('/:vehicle_id/upload')
    .post(
        // verifyAdmin,
        vehicleUpload,
        vehicleController.vehicleImage
    )
    
router.route('/:vehicle_id/reviews')
    // .all(verifyUser)
    .get(
        reviewController.getAllReviews
    )

    .post(
        verifyUser,
        reviewController.createReview
    )

    .put((req, res, next) => {
        res.status(405).json({error: 'This method (PUT) is not allowed'})
        .catch(next)
    })

    .delete(
        verifyUser,
        reviewController.deleteReviews
    )

router.route('/:vehicle_id/reviews/:review_id')
    // .all(verifyUser)
    .get(
        reviewController.viewAvehicleReview
    )

    .post((req, res, next) => {
        res.status(405).json({error: 'This method (POST) is not allowed'})
        .catch(next)
    })

    .put(
        reviewController.editReviewbyID
    )

    .delete(
        reviewController.deleteReviewbyID
    )


    
module.exports = router
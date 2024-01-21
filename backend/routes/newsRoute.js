const express = require('express')
const newsController = require("../controllers/newsController")
const { verifyAdmin } = require('../middlewares/authMiddleware')
const { upload, newsUpload } = require('../middlewares/uploads')

const router = express.Router()

// This makes codes organized rather then writing everthing in one file
router.route('/')
    .get(
        newsController.getAllNews
    )   
    
    .post( 
        newsController.addNews
    )

    .put((req, res) => {
        res.status(405).json({ error:"This method (PUT) is not allowed" })
    })

    .delete( 
        // verifyAdmin,
        newsController.deleteNews
    )
    
router.route('/:news_id')
    .get(
        newsController.getNewsbyId
    )

    .post((req, res) => {
        res.status(405).json({error: 'This method (POST) is not allowed'})
    })

    .put(
        // verifyModerator,
        newsController.editANews
    )

    .delete(
        // verifyModerator,
        newsController.deleteANews
    );

router.route('/:news_id/upload')
    .post(
        newsUpload,
        newsController.newsImage
    )

module.exports = router

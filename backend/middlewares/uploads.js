const multer = require('multer')
const uuid4 = require('uuid').v4
const path = require('path')

const maxSize = 2 * 1024 * 1024; // 2MB

const vehicleStorage = multer.diskStorage({
  destination: 'public/images/vehicles',
  filename: (req, file, cb) => {
    // Define the filename as you desire
    const fileName = `vehicle_${req.params.vehicle_id}_${Date.now()}_${file.originalname}`;
    cb(null, fileName);
  },
});

const newsStorage = multer.diskStorage({
  destination: 'public/images/news',
  filename: (req, file, cb) => {
    // Define the filename as you desire
    const fileName = `news_${req.params.news_id}_${Date.now()}_${file.originalname}`;
    cb(null, fileName);
  },
});

const userProfileStorage = multer.diskStorage({
  destination: 'public/uploads',
  filename: (req, file, cb) => {
    // Define the filename as you desire
    const fileName = `user_${req.params.user_id}_${Date.now()}_${file.originalname}`;
    cb(null, fileName);
  },
});

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         let destination = '';
//         if (req.route.path.includes('/news')) {
//           destination = 'public/images/news';
//         } else if (req.route.path.includes('/vehicles')) {
//           destination = 'public/images/vehicles';
//         } else if (req.route.path.includes('/users')) {
//           destination = 'public/uploads';
//         }
//         cb(null, destination);
//       },
//       filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//         cb(null, uniqueSuffix + '-' + file.originalname);
//       }
// }) 

const fileFilter = (res, file, cb) => {
    const ext = path.extname(file.originalname.toLowerCase())
    if(!ext.match(/jpg|png|jpeg/)) {
        return cb(new Error("Only JPG, JPEG and PNG allowed"), false)
    }
    cb(null, true)
}

// const upload = multer({
//     storage: storage,
//     fileFilter: fileFilter,
//     limits: { fileSize: maxSize },
//   }).single("profilePicture");  

const vehicleUpload = multer({
  storage: vehicleStorage,
  fileFilter: fileFilter,
  limits: { fileSize: maxSize },
}).single('vehiclePicture');

const newsUpload = multer({
  storage: newsStorage,
  fileFilter: fileFilter,
  limits: { fileSize: maxSize },
}).single('newsPicture');

const userProfileUpload = multer({
  storage: userProfileStorage,
  fileFilter: fileFilter,
  limits: { fileSize: maxSize },
}).single('profilePicture');

module.exports = {
  vehicleUpload,
  newsUpload,
  userProfileUpload,
  fileFilter,
};




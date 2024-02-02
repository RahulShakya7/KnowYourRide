const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { upload, userProfileUpload } = require('../middlewares/uploads');
const { verifyUser } = require('../middlewares/authMiddleware');
const router = express.Router()

// const transporter = require('./path-to-your-transporter-file'); // Adjust the path accordingly
// const OtpModel = require('./path-to-your-otp-model-file'); // Adjust the path accordingly

// async function sendOTP(email) {
//   const otpCode = Math.floor(100000 + Math.random() * 900000);
//   await transporter.sendMail({
//     from: process.env.GOOGLE_USER_ID,
//     to: email,
//     subject: "OTP Verification",
//     html: `<!DOCTYPE html>
// <html>
// <head>
//   <title>OTP Email</title>
//   <style>
//     body {
//       font-family: Arial, sans-serif;
//     }
//     .container {
//       max-width: 600px;
//       margin: 0 auto;
//       padding: 20px;
//       background-color: #f5f5f5;
//       border: 1px solid #ddd;
//       border-radius: 5px;
//     }
//     h1 {
//       color: #333;
//       margin-top: 0;
//     }
//     p {
//       margin-bottom: 20px;
//     }
//     .otp {
//       background-color: #007bff;
//       color: #fff;
//       padding: 10px;
//       font-size: 24px;
//       font-weight: bold;
//       text-align: center;
//       border-radius: 5px;
//     }
//     .footer {
//       margin-top: 20px;
//       text-align: center;
//       color: #777;
//     }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <h1>POS System</h1>
//     <p>Dear User,</p>
//     <p>Your One-Time Password (OTP) for login is:</p>
//     <div class="otp">${otpCode}</div>
//     <p>Please enter this OTP to complete your login process.</p>
//     <div class="footer">
//       <p>Thank you!</p>
//     </div>
//   </div>
// </body>
// </html>
// `,
//   });
//   // Save the OTP in the database
//   const otpData = {
//     email: email,
//     otp: otpCode,
//     createdAt: new Date(),
//   };
 
//   await OtpModel.create(otpData);
// }

router.get('/getusers', async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

router.get('/getuser/:id' , async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res
      .status(404)
      .json({ message: 'User not found with id of ${req.params.id}' });
  } else {
    res.status(200).json({
      success: true,
      data: user,
    });
  }
});

const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

router.post('/signup', async (req, res, next) => {
  try {
    const { username, firstname, lastname, email, password, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error: 'Password must have at least 8-12 characters, including 1 uppercase letter, and 1 special character'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during registration' });
  }
});

router.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: 'User not registered' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ error: 'Password incorrect' });
    }

    // Reset failed login attempts on successful login
    await User.updateOne({ username }, { $set: { failedLoginAttempts: 0 } });

    // Create payload for JWT
    const payload = {
      id: user._id,
      username: user.username,
      fullname: user.firstname + ' ' + user.lastname,
      email: user.email,
      role: user.role
    };


    // sendOTP(user.email);
    // Generate JWT token
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '10s' });

    res.json({
      status: 'success',
      message: 'Login Successful. Welcome: ' + username,
      token: token,
      userId: user._id,
      role: user.role
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});



router.post('/:id/profileimage', userProfileUpload, async (req, res, next) => {
  if (!req.file) {
    return res.status(400).send({ message: "Please upload a file" });
  }
    // Update the user model with the uploaded image filename

    console.log(req.params.user_id);
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { uimage: req.file.filename },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({
        success: true,
        data: req.file.filename,
        user: user,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/edituser/:id', async (req, res, next) => {
  try {
    const userdata = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, userdata, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: [user], 
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


router.get('/currentuser/:id', async (req, res, next) => {
  // Show current user
  const user = await User.findById(req.params.id);
  res.status(200).json({
    User: user
  });
});

router.delete('/deleteuser/:id', async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  //   const imagePath = path.join(__dirname, "..", "public", "uploads", user.image);

  //   fs.unlink(imagePath, (err) => {
  //     if (err) {
  //       console.log(err); // Log the error, but continue with the response
  //     }
  //     res.status(200).json({
  //       success: true,
  //       message: "User deleted successfully",
  //     });
  //   });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router
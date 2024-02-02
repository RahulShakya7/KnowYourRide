const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { upload, userProfileUpload } = require('../middlewares/uploads');
const { verifyUser } = require('../middlewares/authMiddleware');
const router = express.Router()

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 5 * 60 * 1000;
const PASSWORD_EXPIRY_DAYS = 90;

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
    if (user.lockUntil && user.lockUntil > Date.now()) {
      return res
        .status(401)
        .json({ message: "Account is locked. Please try again later." });
    }

    const lastChangeDate = new Date(user.lastPasswordChange);
    const expiryDate = new Date(lastChangeDate);
    expiryDate.setDate(expiryDate.getDate() + PASSWORD_EXPIRY_DAYS);
    // expiryDate.setMinutes(expiryDate.getMinutes() + PASSWORD_EXPIRY_MINUTES);

    if (expiryDate < new Date()) {
      return res
        .status(401)
        .json({ message: "Password has expired. Please reset your password." });
    }
    

    // Check if the passwords match
    if (!passwordMatch) {
      user.loginAttempts += 1;

      // Lock the account if too many failed attempts
      if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
        user.lockUntil = Date.now() + LOCKOUT_DURATION;
        user.loginAttempts = 0;
      }

      await user.save();

      return res.status(401).json({ message: "Invalid credentials" });
    }

    user.loginAttempts = 0;
    await user.save();

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
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '5d' });

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

router.post('/changepw/:id', async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { id } = req.params;

    // Find the user by ID
    const user = await User.findById(id);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided old password with the stored hashed password
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);

    // Check if the old password is correct
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect old password" });
    }

    // Check if the new password is the same as the old password
    if (oldPassword === newPassword) {
      return res.status(400).json({
        message: "New password must be different from the old password",
      });
    }

    // Check if the new password meets complexity requirements
    if (!PASSWORD_COMPLEXITY_REGEX.test(newPassword)) {
      return res.status(400).json({
        message:
          "New password must include at least one uppercase letter, one lowercase letter, one digit, and one special character.",
      });
    }

    // Check if the new password is in the password history
    if (
      user.passwordHistory.some((entry) =>
        bcrypt.compareSync(newPassword, entry.password)
      )
    ) {
      return res.status(400).json({
        message:
          "New password cannot be the same as any of the recent passwords.",
      });
    }

    // Store the old password in the password history
    user.passwordHistory.push({
      password: user.password,
      changeDate: user.lastPasswordChange,
    });

    // Update the user's password
    user.password = await bcrypt.hash(newPassword, 10);
    user.lastPasswordChange = Date.now();

    // Save the updated user to the database
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("Error changing password:", err);
    res.status(500).json({ message: "Error changing password" });
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
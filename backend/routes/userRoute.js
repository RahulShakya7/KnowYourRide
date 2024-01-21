const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { upload, userProfileUpload } = require('../middlewares/uploads');
const { verifyUser } = require('../middlewares/authMiddleware');
const router = express.Router()

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

router.post('/signup', async (req, res, next) => {
  try {
    const { username, firstname, lastname, email, password, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
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
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'User not registered' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Password did not match' });
    } else {
      // Create payload for JWT
      const payload = {
        id: user._id,
        username: user.username,
        fullname: user.firstname + ' ' + user.lastname,
        email: user.email,
        role: user.role
      };
      // Generate JWT token
      jwt.sign(
        payload,
        process.env.SECRET,
        { expiresIn: '1d' },
        (err, token) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ status: 'success', message: 'Login Successfull. Welcome : ' + username, token: token, userId: user._id, role: user.role });
        }
      );
    }
  } catch (error) {
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
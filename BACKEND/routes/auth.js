//routes/auth.js//
const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const nodemailer = require('nodemailer');




router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ username, email, password, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, 'yourSecretKey', { expiresIn: '1h' });

    res.status(200).json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


function protectRole(requiredRole) {
  return (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
      const decoded = jwt.verify(token, 'yourSecretKey');
      if (decoded.role !== requiredRole) {
        return res.status(403).json({ message: 'Access denied' });
      }
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
}

router.get('/profile', async (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'yourSecretKey');
    const user = await User.findById(decoded.userId).select('-password'); 

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ username: user.username, email: user.email, role: user.role });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});



router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.json({ message: "User is not registered" });
      }
      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

      var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'auditoriumsystem@gmail.com',
              pass: 'wotfrgxhzcspnsmd'
          }
      });
      const encodedToken = encodeURIComponent(token).replace(/\./g, "%2E");
      var mailOptions = {
          from: 'auditoriumsystem@gmail.com',
          to: email,
          subject: 'Reset Password',
          text: `http://localhost:5173/resetPassword/${encodedToken}`
      };

      transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
              return res.json({ message: "Error sending email" });
          } else {
              return res.json({ status: true, message: "Email sent" });
          }
      });

  } catch (err) {
      console.log(err);
  }
});



router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
   
    const decoded = await jwt.verify(token, process.env.KEY);
    const id = decoded.id;

   
    const hashedPassword = await bcrypt.hash(password, 10);

   
    await User.findByIdAndUpdate({ _id: id }, { password: hashedPassword });

   
    
    return res.json({ status: true, message: "Password updated" });
  } catch (err) {
    
    return res.json({ status: false, message: "Invalid token or expired token" });
  }
});





const verifyUser = async (req, res, next) => {
  try {
      const token = req.cookies.token;
      if (!token) {
          return res.json({ status: false, message: "No token" });
      }
      const decoded = await jwt.verify(token, process.env.KEY);
      next();
  } catch (err) {
      return res.json(err);
  }
};

router.get("/verify", verifyUser, (req, res) => {
  return res.json({ status: true, message: "Authorized" });
});

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ status: true });
});















module.exports = router;

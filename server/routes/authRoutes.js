const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const router = express.Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const axios = require('axios');

// Google Login
router.post('/google-login', async (req, res) => {
  const { tokenId } = req.body; // This is the access_token from frontend

  try {
    // Fetch user info from Google using the access token
    const googleRes = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenId}`);
    const { name, email, sub, picture } = googleRes.data;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        username: name || email.split('@')[0],
        email,
        googleId: sub,
        picture,
      });
      await user.save();
    } else if (!user.googleId) {
      user.googleId = sub;
      user.picture = picture;
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        picture: user.picture,
      },
    });
  } catch (err) {
    console.error('Google login error:', err);
    res.status(400).json({ message: 'Google authentication failed' });
  }
});

// Register
router.post('/register', async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }
    
    email = email.toLowerCase();
    console.log('Registration attempt for:', email);
    
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      console.log('Registration failed: User already exists');
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate a unique username from email prefix
    const baseUsername = email.split('@')[0];
    let uniqueUsername = baseUsername;
    let counter = 1;
    
    while (await User.findOne({ username: uniqueUsername })) {
      uniqueUsername = `${baseUsername}${counter}`;
      counter++;
    }

    user = new User({ 
      username: uniqueUsername, 
      email, 
      password 
    });
    await user.save();
    console.log('Registration successful for:', email);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    email = email.toLowerCase();
    console.log('Login attempt:', email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log('Login failed: User not found');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Login failed: Password mismatch');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Login successful for:', email);

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get User (Protected)
const auth = require('../middleware/authMiddleware');
router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

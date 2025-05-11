const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema.js'); // Assuming this model exists for vendors/clients

// Sign up route
router.post('/signup', async (req, res) => {
  const { email, password, name, role } = req.body;
  
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    user = new User({
      email,
      password,
      name,
      role
    });
    
    // Hash password before saving to DB
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    
    await user.save();
    const payload = {
      user: {
        id: user._id,
        role: user.role
      }
    };
    
    // Create JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.status(201).json({ token });
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
});

// Sign in route
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    console.log(user)
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    console.log(password)
    const isMatch = await bcrypt.compare(password, user.password);
    // console.log(isMatch)
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    
    const payload = {
      user: {
        id: user._id,
        role: user.role
      }
    };
    console.log(payload)
    
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log(token)
    res.json({ token });
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
});

module.exports = router;

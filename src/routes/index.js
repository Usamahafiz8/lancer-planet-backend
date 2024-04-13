// src/routes/index.js

const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');

// Route for the home page
router.get('/', (req, res) => {
  res.send('Hello! Welcome to LancerPlanet.');
});
router.use('/users', userRoutes);


module.exports = router;

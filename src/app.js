const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes'); // Import the routes index file
const sequelize = require('./config/database');
const cors = require('cors'); // Import the cors package
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS
app.use(cors()); // Enable CORS for all routes


// Routes
app.use(routes); // Use the routes index file




// Synchronize database models with the database
sequelize.sync({ force: false }) // Set force to true to force sync and drop all tables
  .then(() => {
    console.log('All models were synchronized successfully.');
  })
  .catch((error) => {
    console.error('Error synchronizing models:', error);
  });


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

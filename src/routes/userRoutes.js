// src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isAdmin = require('../middleware/adminMiddleware'); 
const authMiddleware = require('../middleware/authMiddleware'); // Import the authentication middleware

// Route for user registration
router.post('/register', userController.registerUser);

// Route for user login
router.post('/login', userController.loginUser);

// Apply authMiddleware to protect routes that require authentication
router.use(authMiddleware);

// Route to get all users (accessible only to admins)
router.get('/', isAdmin, userController.getAllUsers); 

// Route to update user profile (accessible only to authenticated users)
router.put('/profile', authMiddleware, userController.updateUserProfile);

// Route to change password (accessible only to authenticated users)
router.put('/change-password', authMiddleware, userController.changePassword);

module.exports = router;

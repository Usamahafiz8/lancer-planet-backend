// src/middleware/adminMiddleware.js

const isAdmin = (req, res, next) => {
    const { role } = req.user; // Assuming you have a middleware to extract user details from JWT
  
    // Check if user is admin
    if (role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden. Only admins can access this resource.', role:`${role}` });
    }
  
    next();
  };
  
  module.exports = isAdmin;
  
const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/authenticate');

// Secured API route
router.get('/secured', authenticate, (req, res) => {
  res.json({ message: 'This is a secured route' });
});

module.exports = router;

const router = require('express').Router();
const userRoutes = require('./userRoutes');

// currently at /api/
router.use('/users', userRoutes);

module.exports = router;

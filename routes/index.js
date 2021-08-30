const router = require('express').Router();
const apiRoutes = require('./api');

// to use the index.js file in the api folder for the collection of routes
router.use('/api', apiRoutes);

module.exports = router;

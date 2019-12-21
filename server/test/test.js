const express = require('express');
const apiData = require('./data/data');
let router = express.Router();

router.use('/data', apiData);

module.exports = router;
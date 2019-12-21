const express = require('express');
const apiUser = require('./user');

let router = express.Router();

router.use('/user', apiUser);

module.exports = router;
const userController = require('../../../src/controllers/apis/v1/user');
const authController = require('../../../src/controllers/apis/v1/auth');
const adminController = require('../../../src/controllers/apis/v1/admin');
const authClientRequest = require('../../../src/middlewares/auth/authGaurd');
const authAdminRequest = require('../../../src/middlewares/auth/adminGaurd');

const express = require('express');
let router = express.Router();

router.use('/user', authClientRequest.authClientToken, userController);
router.use('/auth', authController);
router.use('/admin', authAdminRequest.authAdminToken, adminController);

module.exports = router;
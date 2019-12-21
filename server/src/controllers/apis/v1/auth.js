const express = require('express');
const authService = require('../../../services/v1/auth/auth');
const validation = require('../../../middlewares/validators/authValidation');
let router = express.Router();

router.post('/register', validation.validateRegistrationBody(), authService.register);

router.post('/login', validation.validateLoginBody(), authService.login);

router.post('/forgotPassword', validation.validateForgotPasswordBody(), authService.forgotPassword);

router.post('/resetPassword', validation.validateResetPasswordBody(), authService.resetPassword);

router.get('/confirmCompte', authService.confirmCompte);

module.exports = router;
const express = require('express');
const userService = require('../../../services/v1/users/user');

const validation = require('../../../middlewares/validators/userValidation');
let router = express.Router();

router.get('/profile', userService.getUserDetails);
router.post('/edit', validation.validateEditUserBody(), userService.editUser);

module.exports = router;
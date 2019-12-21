const express = require('express');
const usersService = require('../../../services/v1/admin/users');

const validation = require('../../../middlewares/validators/adminValidation');
let router = express.Router();

router.get('/:id/profile', usersService.getUserDetails);

router.get('/users', usersService.getUsers);

router.post('/:id/edit', validation.validateEditUserBody(), usersService.editUser);

module.exports = router;
const { body } = require('express-validator/check')

const validateEditUserBody = () => {
    return [ 
        body('name')
        .exists()
        .withMessage('name field is required')
        .isLength({min:3})
        .withMessage('name must be greater than 3 letters'),
        body('about')
        .isLength({max: 200})
        .withMessage('about field must not greater than 200 characters long'),
        body('email').exists()
        .withMessage('email field is required')
        .isEmail()
        .withMessage('Email is invalid'),
        body('role').exists()
        .withMessage('role field is required')
       ] 
} 

module.exports = {
    validateEditUserBody : validateEditUserBody,
}
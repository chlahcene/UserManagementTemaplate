const { body } = require('express-validator/check')

const validateRegistrationBody = () => {
    return [ 
        body('name')
        .exists()
        .withMessage('name field is required')
        .isLength({min:3})
        .withMessage('name must be greater than 3 letters'),
        body('email').exists()
        .withMessage('email field is required')
        .isEmail()
        .withMessage('Email is invalid'),
        body('password')
        .exists()
        .withMessage('password field is required')
        .isLength({min : 3,max: 30})
        .withMessage('password must be in between 3 to 30 characters long'),
       ] 
} 

const validateLoginBody = () => {
    return [ 
        body('email').exists()
        .withMessage('email field is required')
        .isEmail()
        .withMessage('Email is invalid'),
        body('password')
        .exists()
        .withMessage('password field is required')
        .isLength({min : 3,max: 30})
        .withMessage('password must be in between 3 to 30 characters long'),
       ] 
}

const validateForgotPasswordBody = () => {
    return [ 
        body('email').exists()
        .withMessage('email field is required')
        .isEmail()
        .withMessage('Email is invalid')
       ] 
}

const validateResetPasswordBody = () => {
    return [ 
        body('password')
        .exists()
        .withMessage('password field is required')
        .isLength({min : 3,max: 30})
        .withMessage('password must be in between 3 to 30 characters long'),
       ] 
}

module.exports = {
    validateRegistrationBody : validateRegistrationBody,
    validateLoginBody : validateLoginBody,
    validateForgotPasswordBody : validateForgotPasswordBody,
    validateResetPasswordBody : validateResetPasswordBody
}
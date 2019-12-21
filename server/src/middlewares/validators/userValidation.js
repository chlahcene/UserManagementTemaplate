const { body } = require('express-validator/check')

const validateEditUserBody = () => {
    return [ 
        body('name')
        .exists()
        .withMessage('name field is required')
        .isLength({min:3})
        .withMessage('name must be greater than 3 letters'),
        body('password')
        .exists()
        .withMessage('password field is required')
        .isLength({min : 3,max: 30})
        .withMessage('password must be in between 3 to 30 characters long'),
        body('newpassword')
        .exists()
        .withMessage('newpassword field is required')
        .isLength({max: 30})
        .withMessage('new password must be in between 3 to 30 characters long'),        
        body('about')
        .isLength({max: 200})
        .withMessage('about field must not greater than 200 characters long')
       ] 
} 

module.exports = {
    validateEditUserBody : validateEditUserBody,
}
const generateToken = require('../../models/security/token');

const authClientToken = async (req, res, next) => {

    let token = req.headers['x-access-token'];
    
    if (!token){
        return res.status(401).json({
            "errors" : [{
                "msg" : " No token provided"
            }]
        });
    } 
    
    if(!generateToken.valideSessionToken(token)) {
        return res.status(401).json({
            "errors" : [{
                "msg" : "Invalid Token"
            }]
        });
        
    } else {
        return next();        
    }
}

module.exports = {
    authClientToken : authClientToken
}
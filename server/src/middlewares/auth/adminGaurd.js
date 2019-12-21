const generateToken = require('../../models/security/token');
const userModel = require('../../models/tables/user');
const roles = require('../../models/roles');

const authAdminToken = async (req, res, next) => {

    let token = req.headers['x-access-token'];
    
    if (!token){
        return res.status(401).json({
            "errors" : [{
                "msg" : " No token provided"
            }]
        });
    }

    try {
        let userId = generateToken.decodeSessionToken(token).id;
                
        let user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({
            errors: [
              {
                msg: " no user found"
              }
            ]
          });
        }
        
        let role = new roles.Role(user.role);
        
        if (!roles.isAdmin(role)) {
            return res.status(401).json({
                errors: [
                  {
                    msg: " no autorized"
                  }
                ]
              });
        }
        res.locals.currentUser = user;
        res.locals.role = role;
        
        return next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            "errors" : [{
                "msg" : "Invalid Token"
            }]
        });        
    }
}

module.exports = {
    authAdminToken : authAdminToken
}
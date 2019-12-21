const express = require('express');
const faker = require('faker');
const userModel = require('../../src/models/tables/user');
const roles =  require('../../src/models/roles');
const crypt = require('../../src/models/security/password');

let router = express.Router();

router.get('/:nb', async (req, res, next) => {
    let users = [];
    let { nb } = req.params;
    nb = parseInt(nb);
    try {
        let passwordHash = await crypt.hashPassword("1234567890");
        let numberRoles = roles.roles.length;
        for (var i = 0; i < nb; i++) {
            let user = new userModel();
            user.name = faker.name.findName();
            user.email = faker.internet.email();
            let idRole = faker.random.number() % numberRoles; 
            user.role = roles.roles[idRole];        
            user.about = faker.name.jobDescriptor();
            user.password = passwordHash;
            user.confirm = faker.date.past();
            await user.save(function(err) {
                if (err) {
                    console.log(err);
                    //throw err;
                } else {
                    
                }
            });
            users.push(user.userInfo());
        }
        return res.status(200).json({
            success: [
              {
                msg: "generate list users is added",
                users: users
              }
            ]
          });          
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errors: [
              {
                msg: "there was a problem intern"
              }
            ]
          });      
    }
});

module.exports = router;
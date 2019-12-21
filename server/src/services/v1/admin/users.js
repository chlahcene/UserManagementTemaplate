const express = require("express");
const userModel = require("../../../models/tables/user");
const crypt = require('../../../models/security/password');
const generateToken = require("../../../models/security/token");
const { validationResult } = require("express-validator/check");
const roles = require('../../../models/roles');
const customLabels = require('../../../../config/paginationLabels');

const editUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let {email, about, name, role} = req.body;
  if (!roles.isRoleString(role)) {
    return res.status(403).json({
      errors: [
        {
          msg: "role not correct",
          roles: roles.roles
        }
      ]
    });
  }

  let { id } = req.params;
  let userId = id;

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
  if (email !== user.email) {
    let isEmailExists = await userModel.findOne({ email: email });

    if (isEmailExists) {
      return res.status(409).json({
        errors: [
          {
            msg: "email already exists"
          }
        ]
      });
    }  
  }

  let newrole = new roles.Role(role);
  let oldrole = new roles.Role(user.role);

  if (!roles.isPriority(res.locals.role, oldrole) || !roles.isPriority(res.locals.role, newrole)) {
    return res.status(401).json({
      errors: [
        {
          msg: "no autorized to edit or upgrade that profil"
        }
      ]
    });    
  }

  user.name = name;
  user.email = email;
  user.role = newrole.roleString;
  user.about = about;
  await user.save();

  return res.status(200).json({
    success: [
      {
        msg: " user edited successfully",
        user: user.userInfo()
      }
    ]
  });
};

const getUserDetails = async (req, res, next) => {
  
  let { id } = req.params;
  let userId = id;

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

  return res.status(200).json({
    success: [
      {
        msg: " user fetched successfully",
        user: user.userInfo()
      }
    ]
  });
};

const getUsers = async (req, res, next) => {

  let {page, perPage, role} = req.query;
  role = role || '';
  page = parseInt(page) || 1;
  perPage = parseInt(perPage) || 10;

  const options = {
    page: page,
    limit: perPage,
    customLabels: customLabels
  };
  const query = {

  }
  
  if (role != '') {
    query['role'] = role;
  }

  await userModel.paginate(query, options, function(err, result) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        errors: [
          {
            msg: "there was a problem"
          }
        ]
      });      
    } else {
      result.docs = result.docs.map( element => element.userInfo() );
      return res.status(200).json({
        success: [
          {
            msg: " users fetched successfully",
            users: result
          }
        ]
      });      
    }

  });
};

module.exports = {
  getUserDetails: getUserDetails,
  editUser : editUser,
  getUsers : getUsers
};


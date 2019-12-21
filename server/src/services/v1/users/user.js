const express = require("express");
const userModel = require("../../../models/tables/user");
const crypt = require('../../../models/security/password');
const generateToken = require("../../../models/security/token");
const { validationResult } = require("express-validator/check");

const getUserDetails = async (req, res, next) => {
  let token = req.headers['x-access-token'];
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

  return res.status(200).json({
    success: [
      {
        msg: " user fetched successfully",
        user: user.userInfo()
      }
    ]
  });
};

const editUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let token = req.headers['x-access-token'];
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

  let { newpassword, password, name, about } = req.body;
  
  if (!newpassword) {
    newpassword = '';
  }
  if (!about) {
    about = '';
  }

  let isPasswordValid = await crypt.passwordEqual(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      errors: [
        {
          msg: "old password is wrong"
        }
      ]
    });
  }

  user.name = name;
  if (newpassword != "") {
    user.password = await crypt.hashPassword(newpassword);
  }
  user.about = about;

  await user.save();

  return res.status(200).json({
    success: [
      {
        msg: "user edit successfully",
        user: user.userInfo()
      }
    ]
  });
};

module.exports = {
  getUserDetails: getUserDetails,
  editUser : editUser
};


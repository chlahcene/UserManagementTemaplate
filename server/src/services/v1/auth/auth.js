const express = require("express");
const crypt = require('../../../models/security/password');
const generateToken = require("../../../models/security/token");
const { validationResult } = require("express-validator/check");
const mailer = require('../mails/authMail');
const userModel = require("../../../models/tables/user");

const register = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let { name, email, password } = req.body;

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

  let hashedPassword = await crypt.hashPassword(password);

  try {
    let user = await userModel.create({
      name: name,
      email: email,
      password: hashedPassword
    });

    if (!user) {
      throw new error();
    }

    // send mail
    let token = generateToken.getConfirmCompteToken(user);
    let url = process.env.CLIENT_URL + "/auth/confirmCompte?token=" + token + "&id=" + user._id;

    // send 
    mailer.sendNewUserMail(user, url);

    return res.status(201).json({
      success: [
        {
          msg: "user registered successfully please confirm your compte",
          user: user.userInfo(),
          url : url
        }
      ]
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errors: [
        {
          msg: "there was a problem registering a user."
        }
      ]
    });
  }
};

const login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let { email, password } = req.body;
  
  try {
    let user = await userModel.findOne({ email: email });
    
    let isPasswordValid = null;

    if (user) {
      isPasswordValid = await crypt.passwordEqual(password, user.password);
    }

    if (!user || !isPasswordValid) {
      return res.status(401).json({
        errors: [
          {
            msg: "email/password is wrong"
          }
        ]
      });
    }
    if (user.confirm === null) {
      return res.status(401).json({
        errors: [
          {
            msg: "this compte not confirmation yet please check your email and confirm your compte"
          }
        ]
      })
    }
    
    let token = generateToken.getSessionToken(user);

    res.status(200).json({
      success: [
        {
          msg: "user login successfully",
          user: user.userInfo(),
          token: token
        }
      ]
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errors: [
        {
          msg: "there was a problem login a user."
        }
      ]
    });
  }
};

const forgotPassword = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let { email } = req.body;

  try {
    let user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(401).json({
        errors: [
          {
            msg: "email is wrong"
          }
        ]
      });
    }

    let token = generateToken.getResetToken(user);
    let url = process.env.CLIENT_URL + "/auth/resetPassword?token=" + token + "&id=" + user._id;

    // send 
    mailer.sendResetPasswordMail(user, url);
    
    return res.status(200).json({
      success: [
        {
          msg: "Kindly check your email for further instructions",
          url: url
        }
      ]
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errors: [
        {
          msg: "there was a problem forgot Password."
        }
      ]
    });
  }
};

const resetPassword = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  const { token, id } = req.query;
  userId = id;
  
  if (!token || !userId) {
    return res.status(401).json({
      "errors" : [{
        "msg" : " No token or No id user provided"
      }]
    });
  }
  let { password } = req.body;

  try {
    let user = await userModel.findById(userId);

    if (!user) {
      return res.status(401).json({
        errors: [
          {
            msg: "user not found"
          }
        ]
      });
    }

    if (generateToken.verifyResetToken(token, user)) {
      let hashedPassword = await crypt.hashPassword(password);
      await userModel.findByIdAndUpdate(userId, {password : hashedPassword});
      // send
      mailer.sendUpdatePasswordMail(user);

      res.status(200).json({
        success: [
          {
            msg: "reset password successfully",
          }
        ]
      });
    } else {
      return res.status(401).json({
        "errors" : [{
            "msg" : "Invalid Token"
        }]
    });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errors: [
        {
          msg: "there was a problem reset Password."
        }
      ]
    });
  }
};
const confirmCompte = async (req, res, next) => {

  const { token, id } = req.query;
  userId = id;

  if (!token || !userId) {
    return res.status(401).json({
      "errors" : [{
        "msg" : " No token or No id user provided"
      }]
    });
  }

  try {
    let user = await userModel.findById(userId);

    if (!user) {
      return res.status(401).json({
        errors: [
          {
            msg: "user not found"
          }
        ]
      });
    }

    if (user.confirm !== null) {
      return res.status(401).json({
        errors: [
          {
            msg: "compte aleary confirmed"
          }
        ]
      });      
    }

    if (generateToken.verifyConfirmCompteToken(token, user)) {
      const confirmDate = new Date();
      await userModel.findByIdAndUpdate(userId, {confirm : confirmDate});
      // send
      mailer.sendConfirmCompteMail(user);

      res.status(200).json({
        success: [
          {
            msg: "compte confirmed successfully",
          }
        ]
      });
    } else {
      return res.status(401).json({
        "errors" : [{
            "msg" : "Invalid Token"
        }]
    });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errors: [
        {
          msg: "there was a problem confirm compte."
        }
      ]
    });
  }
};

module.exports = {
  register: register,
  login: login,
  forgotPassword: forgotPassword,
  resetPassword: resetPassword,
  confirmCompte: confirmCompte
};

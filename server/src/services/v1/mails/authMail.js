const mail = require("../../../models/email/email");

const sendResetPasswordMail = (user, url) => {
    
    let to = user.email;
    let from = "me";
    let template = "user/resetPasswordEmail";
    let subject = "Reset Password";
    let params = {
      url: url,
      name: user.name.split(" ")[0]
    };

    let error = mail.sendEmail(from, to, subject, template, params);
    return error;
};

const sendNewUserMail = (user, url) => {
    
  let to = user.email;
  let from = "me";
  let template = "user/newUserEmail";
  let subject = "new user";
  let params = {
    url: url,
    name: user.name.split(" ")[0]
  };

  let error = mail.sendEmail(from, to, subject, template, params);
  return error;
};

const sendUpdatePasswordMail = (user) => {
    
  let to = user.email;
  let from = "me";
  let template = "user/updatePasswordEmail";
  let subject = "Update Password";
  let params = {
    name: user.name.split(" ")[0]
  };

  let error = mail.sendEmail(from, to, subject, template, params);
  return error;
};

const sendConfirmCompteMail = (user) => {
    
  let to = user.email;
  let from = "me";
  let template = "user/confirmCompteEmail";
  let subject = "Confirme Compte";
  let params = {
    name: user.name.split(" ")[0]
  };

  let error = mail.sendEmail(from, to, subject, template, params);
  return error;
};

module.exports = {
    sendResetPasswordMail : sendResetPasswordMail,
    sendUpdatePasswordMail : sendUpdatePasswordMail,
    sendConfirmCompteMail : sendConfirmCompteMail,
    sendNewUserMail : sendNewUserMail
}
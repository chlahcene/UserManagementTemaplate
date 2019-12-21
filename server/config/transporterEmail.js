const nodemailer = require('nodemailer');
const  hbs = require('nodemailer-express-handlebars');
const path = require('path');

let smtpTransport = nodemailer.createTransport({
    host: process.env.MAILER_SERVICE_HOST,
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASSWORD
    },
    defaultFromAddress: 'Lahcene CHAKLALA TEST gl_chaklala@esi.dz'
});
const handlebarOptions = {
  viewEngine: {
    extName: '.html',
    partialsDir: path.resolve('views/templates/email/'),
    layoutsDir: path.resolve('views/templates/email/'),
    defaultLayout: '',
  },
  viewPath: path.resolve('views/templates/email/'),
  extName: '.html',
};

smtpTransport.use('compile', hbs(handlebarOptions));

module.exports = smtpTransport;
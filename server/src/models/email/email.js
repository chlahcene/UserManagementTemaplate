const smtpTransport = require('../../../config/transporterEmail');

const sendEmail = (from, to, subject, template, param) => {
    let optionEmail = {
        to: to,
        from: from,
        template: template,
        subject: subject,
        context: param
    }

    smtpTransport.sendMail(optionEmail, function(error, info) {
        if (!error) {
            console.log('email sent');
            console.log(info);
        } else {
            console.log('email not sent');
            console.log(error);
        }
        return error;
    });
};

module.exports = {
    sendEmail : sendEmail
}
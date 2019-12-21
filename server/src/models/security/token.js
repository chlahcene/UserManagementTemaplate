const jwt = require('jsonwebtoken');

const valideSessionToken = async (token) => {
    let secret = process.env.TOKEN_SECRET;
    await jwt.verify(token, secret , (err, decoded) => {
        if (err) {
            return false;
        } else {
            return true;
        }
    });
};

const getSessionToken = (user) => {
    let secret = process.env.TOKEN_SECRET;
    let expiresIn = parseInt(process.env.TOKEN_EXPIRES_IN);
    let token = jwt.sign({ id: user._id }, secret, { expiresIn: expiresIn });
    return token;
}

const decodeSessionToken = (token) => {
    let secret = process.env.TOKEN_SECRET;
    let code = jwt.decode(token, secret);  
    return code;
}

const getResetToken = (user) => {
    let secret = process.env.MAILER_URL_SECRET + user.password + user.createdAt;
    let expiresIn = parseInt(process.env.MAILER_EXPIRES_RESET_PASSWORD);
    let token = jwt.sign({ id: user._id }, secret, { expiresIn: expiresIn});
    return token;
};

const verifyResetToken = (token, user) => {
    let secret = process.env.MAILER_URL_SECRET + user.password + user.createdAt;
    let code = jwt.decode(token, secret);    
    return code.id === user.id;
}

const getConfirmCompteToken = (user) => {
    let secret = process.env.MAILER_URL_SECRET + user.password + user.createdAt;
    let expiresIn = parseInt(process.env.MAILER_EXPIRES_CONFIRM_COMPTE);
    let token = jwt.sign({ id: user._id }, secret, { expiresIn: expiresIn});
    return token;
};

const verifyConfirmCompteToken = (token, user) => {
    let secret = process.env.MAILER_URL_SECRET + user.password + user.createdAt;
    let code = jwt.decode(token, secret);    
    return code.id === user.id;
}

module.exports = {
    valideSessionToken : valideSessionToken,
    getSessionToken : getSessionToken,
    decodeSessionToken : decodeSessionToken,    
    getResetToken : getResetToken,
    verifyResetToken : verifyResetToken,
    getConfirmCompteToken : getConfirmCompteToken,
    verifyConfirmCompteToken : verifyConfirmCompteToken,
}
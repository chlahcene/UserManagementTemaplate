const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
    let nbHash = parseInt(process.env.TOKEN_HASH);
    let hashedPassword = bcrypt.hash(
        password,
        nbHash
    );
    return hashedPassword;
};

const passwordEqual = (password, hashedPassword) => {
    let isPasswordValid = bcrypt.compare(password, hashedPassword);
    return isPasswordValid;
};

module.exports = {
    hashPassword : hashPassword,
    passwordEqual : passwordEqual
}
const crypto = require('crypto');

const getOtp = () => {
    return crypto.randomInt(1000, 9999).toString();
}


module.exports = { getOtp }
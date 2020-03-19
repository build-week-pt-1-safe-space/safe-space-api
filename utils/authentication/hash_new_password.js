const bcrypt = require('bcryptjs');

const hashNewPassword = user => {
    if(!user || !user.password) return false;

    const hash = bcrypt.hashSync(user.password, 12);
    
    user.password = hash;

    return user;
}

module.exports = hashNewPassword;
const bcrypt = require('bcryptjs');

const passwordIsValid = (user, password_to_validate) => {
    if(!user || !password_to_validate) return false;
    
    return user && bcrypt.compareSync(password_to_validate, user.password)
}

module.exports = passwordIsValid;
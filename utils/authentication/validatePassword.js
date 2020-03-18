const bcrypt = require('bcryptjs');

const validatePassword = (user, password_to_validate) => {
    return user && bcrypt.compareSync(password_to_validate, user.password)
}

module.exports = validatePassword;
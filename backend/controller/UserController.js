const User = require('../models/UserModel')


exports.UserSighUp = (req, res) => {
    const { first_name, last_name, username, email, password, date_of_birth, gender } = req.body
}
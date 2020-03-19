const router = require('express').Router();
const Users = require('../models/users_model');

const hashNewPassword = require('../utils/authentication/hash_new_password');
const validatePassword = require('../utils/authentication/validate_password');
const generateToken = require('../utils/authentication/generate_token');

router.post('/register', async (req, res) => {
    try {
        if(!req.body) res.status(400).json({ error: "Missing Update", value: req.body });

        const user = hashNewPassword(req.body);
        const addedUser = await Users.insert(user);

        res.status(201).json(addedUser);
    } catch (err) {
        res.status(500).json({ error: "Failed To Add User", message: err });
    }
})

router.post('/login', async (req, res) => {
    try {
        if(!req.body) res.status(400).json({ error: "Missing Update", value: req.body });

        const { email, password } = req.body;
        const user = await Users.getBy({ email });

        if( validatePassword(user, password) ) {
            const token = generateToken(user);
     
            res.status(200).json({ user, token })
        } else {
            console.log('test2')
            res.status(401).json({ error: "Invalid Credentials" })
        }
    } catch (err) {
        res.status(500).json({ error: "Trouble Logging In", message: err });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

router.post('/activateUser',auth, [
    check("userId", "Please provide User Status").exists(),
    check("userStatus", "Please provide User Status").exists(),
] , async function(req, res) {
    try {
        const {userid, userStatus} = req.body;

        let user = await User.findOneAndUpdate(
            {_id: userid},
            {$set : {isactive: userStatus === 'false' ? false : true }}
        )

        res.json(user);
        
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

router.post("/getAllUsers", auth , async function(req, res) {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    }  catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

router.post("/login", async function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: erros.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        } else {

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
            } else if(user.userrole !== 'admin') {
                return res.status(400).json({ errors: [{ msg: 'Not Authorized' }] });
            } else {
                const payload = {
                    user: {
                        id: user.id
                    }
                };

                jwt.sign(
                    payload,
                    config.get('jwtSecret'),
                    { expiresIn: '2 hours' },
                    (err, token) => {
                        if (err) { throw err; }
                        res.json(token);
                    }
                )
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Send Error");
    }
})

module.exports = router;
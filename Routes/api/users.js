const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

// Load User Model
const User = require('../../models/User');

// @route  GET api/users/test
// @de3sc  test users route
// @access Public
router.get('/test', (req, res) => res.json({ msg: "Users work" }));

// @route POST API/USERS/register
// @desc Register user
// @access Public
router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json({ email: 'Email already exists' });
            }
            else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', //size
                    r: 'pg', //rating
                    d: 'mm' //default
                });
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: avatar,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });

            }
        });
});

// @route POST API/USERS/login
// @desc  Login user / returning jwt token  
// @access Public

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // find user by email
    User.findOne({ email }) //email: email but since they are same we can write it like this
        .then(user => {
            if (!user) {
                return res.status(404).json({ email: 'User not found' });
            }

            // check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // User Matched
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        }// jwt payload
                        // Siign Token
                        jwt.sign(
                            payload,
                            keys.secretOrkey,
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                })
                            });
                    } else {
                        return res.status(400).json({ password: 'Password incorrect' })
                    }
                })
        });
});

module.exports = router;
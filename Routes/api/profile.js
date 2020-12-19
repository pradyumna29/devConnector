const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { session } = require('passport');
const passport = require('passport');

// Load Profile model
const Profile = require('../../models/Profile');

// Load User model
const User = require('../../models/User');

// @route  GET api/profile/test
// @de3sc  test profile route
// @access Public
router.get('/test', (req, res)=> res.json({msg: "Profile work"}));

// @route  GET api/profile
// @de3sc  get current user's profile
// @access Private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res)=> {
    const errors = {}
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if(!profile) {
                errors.noProfile= 'No profile for this user';
                return res.status(404).json(errors);
            }

            res.json(profie);
        })
        .catch(err=> res.status(404).json(err));
});


module.exports = router;
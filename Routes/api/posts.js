const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load post model
const Post = require("../../models/Post");

// Validate posts
const validatePostInput = require("../../validaton/post");

// @route  GET api/posts/test
// @de3sc  test post route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Posts work" }));

// @route  POST api/posts
// @de3sc  create post
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      //return error with 400 status
      res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id,
    });

    newPost.save().then(post => res.json(post));
  }
);

module.exports = router;

const express = require('express');
const router = express.Router();

// @route  GET api/posts/test
// @de3sc  test post route
// @access Public
router.get('/test', (req, res)=> res.json({msg: "Posts work"}));

module.exports = router;
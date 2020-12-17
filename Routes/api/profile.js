const express = require('express');
const router = express.Router();

// @route  GET api/profile/test
// @de3sc  test profile route
// @access Public
router.get('/test', (req, res)=> res.json({msg: "Profile work"}));

module.exports = router;
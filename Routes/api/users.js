const express = require('express');
const router = express.Router();

// @route  GET api/users/test
// @de3sc  test users route
// @access Public
router.get('/test', (req, res)=> res.json({msg: "Users work"}));

module.exports = router;
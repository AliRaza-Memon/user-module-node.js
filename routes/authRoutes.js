const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');


//create a new user
router.post('/',authController.authUser);

module.exports = router
const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');


//create a new user
router.post('/create',productController.addProduct);

module.exports = router;
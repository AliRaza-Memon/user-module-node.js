const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');


//create a new user
router.post('/create',userController.createUser);

// get all users
router.get('/user',userController.getAllUsers);

//Get a single user by id
router .get('/users/:id',userController.getUserById);

//Update a user by ID
router.put('/users/:id',userController.updateUser);

//Delete a user by ID
router.delete('/users/:id',userController.deleteUser);

module.exports = router;
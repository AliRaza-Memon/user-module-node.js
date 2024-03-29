const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt')
const Joi = require('joi');
const express = require('express');
const app = express();
const _ = require('lodash');
const {User} = require("../model/User");


exports.createUser = async (req, res) => {
    try {
        // const { error } = validate(req.body);
        // if (error) {
        //     return res.status(400).send(error.details[0].message);
        // }

        // Create a new user instance from the request body
        const user = new User(_.pick(req.body, ['email', 'password', 'fullName', 'username']));

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password,salt);

        // Save the user to the database using await
        await user.save();
        const token = user.generateAuthToken();
       
        // Respond with the created user and a status code of 201 (Created)
        res.header('x-auth-token',token).status(201).json(_.pick(user, ['_id', 'fullName', 'email', 'username']));
    } catch (error) {
        // Handle any errors that occur during user creation
        res.status(400).json({ error: error.message });
    }
};


exports.authUser = async (req, res) => {
    // const { error } = validate(req.body);
    // if (error) {
    //     return res.status(400).send(error.details[0].message);
    // } 
    let user = await User.findOne({email:req.body.email});
    // Create a new user instance from the request body
    
    if(!user)
        return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password )
    if(!validPassword)
        return res.status(400).send('Invalid email or password');
    const token = user.generateAuthToken();
    res.send(token);

};

// Get  all users
exports.getAllUsers = async (req,res) =>{
    
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({error:error.message});
    }
};


// Get a single user by Id
exports.getUserById = async (req,res) =>{
    const userId = req.param.id;

    try{
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message :'User not found'});
        }
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};


// Update a user by Id
exports. updateUser = async (req,res) =>{
    const userId = req.params.id;
    try{
        const user = await User.findByIdAndUpdate(userId,req.body,{});

        if(!user){
            res.status(404).json({message: 'User not found'});
        }
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({error:error.message});
    }
};

//Delete a user by Id
exports.deleteUser = async (req,res) =>{

    const userId = req.params.id;
    try{
        const user = await User.findByIdAndDelete(userId);
        if(!user){
            return res.status(404).json({message:'User not found'});
        }
        res.status(204).send();
    }catch(error){
        res.status(500).json({error:error.message});
    }
};




const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
const User = require ('../model/user');
const Joi = require('joi');
const express = require('express');
const app = express();



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
        
        const token = jwt.sign({ _id: user.id }, config.get('jwtPrivateKey'));
        res.send(token);

};



// function validate(req) {
//     const schema = {
//         email: Joi.string().min(2).max(255).required().email(),
//         password: Joi.string().min(2).max(255).required()
//     };
    
//     return Joi.validateAsync(req, schema);
// }

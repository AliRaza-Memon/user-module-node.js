const mongoose = require('mongoose');
const Joi = require('joi');
const _ = require('lodash');

const userSchema = new mongoose.Schema({

    username: {
        type:String,
        required:true,
    },

    fullName:{
        type:String,
        minlength:5,
        maxlength:20,
        required:true,
    },

    email:{
        type:String,
        required:true,
        unique:true,
    },

    password:{
        type:String,
        minlength:5,
        maxlength:20, 
        required:true,
    }

    }
);

function validateUser(user) {
    const schema = {
        fullName: Joi.string().min(3).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(user, schema);
}



exports.validate = validateUser;

module.exports = mongoose.model('User',userSchema);
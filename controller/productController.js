const {User} = require ('../model/User');
const express = require('express');
const Product = require('../model/product'); // Add this import
const app = express();
const _ = require('lodash');


exports.addProduct = async (req,res) =>{

    try{
        //check if the user exist
        const user = await User.findById(req.body.userId);

        if(!user){
            return res.status(404).json({message:'User not found'});
        }

        //create the product
        const product = new Product({
            name : req.body.name,
            description:req.body.description,
            price: req.body.price,
            userId:user._id,
        });

        await product.save();
        res.status(201).json(product);
    }catch(error){
        res.status(500).json({message : "Error creating the product",error});
    }

};

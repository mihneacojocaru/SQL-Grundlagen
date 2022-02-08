const express = require('express');

const {Book}=require("../models/");
const bookRoute = express.Router();

function asyncHandler(callBack){
    return async (req,res,next) => {
        try {
            await callBack(req,res,next);
        } catch (error) {
            next(error);
        }
    }
}

bookRoute.get('/', asyncHandler(async(req,res,next)=>{
    let items = await Books.findAll();
    res.status(200).json(items);
}));

module.exports=bookRoute;
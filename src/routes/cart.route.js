const express = require('express')
const CartRoute=express.Router();
const cors=require("cors");
//const checkToken=require("../middlewares/user.middleware");
const cartModel = require('../models/cart.model');

CartRoute.use(cors());
// CartRoute.use(checkToken)

//post request
CartRoute.post("/items",async(req,res)=>{
    try {
        const allCartItems=await cartModel.find({
            userID:req.body.id,
            productID:req.body.productID,
        }).populate("userID");
        
        if(allCartItems.length>=1){
            const UpdatedCart = await cartModel.findByIdAndUpdate(
                allCartItems[0]._id,
                { quantity: allCartItems[0].quantity + 1 }
              );
              res.status(200).json({
                newItem_added: UpdatedCart,
              });
        }
        else {
            const cartItems = await cartModel.create({userID:req.body.id,productID:req.body.productID});
            if (cartItems) {
              res.status(201).json({
                newItem_added: cartItems,
              });
            } else {
              res.status(404).json({
                message: "Error in request",
              });
            }
          }
    } catch (e) {
        res.status(404).json({
            message: e,
          });
    }
})

module.exports=CartRoute
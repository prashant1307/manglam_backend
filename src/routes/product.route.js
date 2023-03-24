const express=require("express");
const ProductRoute=express.Router();
const cors=require("cors");
const productModel = require("../models/product.model");
const { getProduct, getOneProduct } = require("../controller/product.controller");

ProductRoute.use(cors())

ProductRoute.get("/:id",getOneProduct)

ProductRoute.get('/',async(req,res)=>{
    const {limit,page,category,sort,low,high,strike}=req.query;
    let data=await getProduct(limit,page,category,sort,low,high,strike)
    res.send(data)
})



module.exports=ProductRoute
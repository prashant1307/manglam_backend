const express=require("express");
const ProductRoute=express.Router();
const cors=require("cors");
const productModel = require("../models/product.model");
const { getProduct, getOneProduct } = require("../controller/product.controller");

ProductRoute.use(cors())

ProductRoute.get('/',async(req,res)=>{
    const {limit,page,category,sort,low,high,strike}=req.query;
    let data=await getProduct(limit,page,category,sort,low,high,strike)
    res.send(data)
})

ProductRoute.get("/:id",async(req,res)=>{
    const id = req.params.id
    let ans = await getOneProduct(id)
    res.send(ans)
})

module.exports=ProductRoute
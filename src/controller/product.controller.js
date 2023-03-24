const productModel = require("../models/product.model")

const getProduct=async(limit,page,category,sort,low,high,strike)=>{
    let products=await productModel.find().limit(limit)
   
    return products;
}

const getOneProduct=async(req,res)=>{
    const {id}=req.params
try {
    console.log(id)
    let oneProd=await productModel.findOne({_id:id})
   
    res.send(oneProd)
} catch (e) {
    res.send(e)
}
}

module.exports={getProduct,getOneProduct}
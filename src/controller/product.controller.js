const productModel = require("../models/product.model")

const getProduct=async(limit,page,category,sort,low,high,strike)=>{
    let products=await productModel.find().limit(limit)
    if(category){
        products=await productModel.find({ancestor:category}).limit(limit)
        if(low){
            products
        }
    }
    return products;
}

module.exports={getProduct}
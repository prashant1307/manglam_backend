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

const getOneProduct=async(id)=>{
    try{
        let findData = await productModel.findOne({id});
        console.log(typeof findData , findData)
        if(findData.title == null ||findData.title == undefined ){
            return {
                status:false,
                massage:'Something went wrong please try again later !'
            }
        }
        else{
            return {
                status:true,
                massage:'Product data fetched sucessfully',
                data : findData
            }
        }
      }
      catch(e){
        return {
            status:false,
            massage:e.message
        }
    }
}

module.exports={getProduct,getOneProduct}
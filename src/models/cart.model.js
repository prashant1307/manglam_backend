const { default: mongoose } = require("mongoose");

const cartSchema=new mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    productID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
        required:true
    },
    quantity:{type:Number,default:1}
})

module.exports=mongoose.model("cart",cartSchema);
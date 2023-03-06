const express = require('express')
const cors=require("cors");
const { default: mongoose } = require('mongoose');
const UserModel = require('./src/models/User.model');
const argon2 = require('argon2');
const jwt=require("jsonwebtoken");
const UserRoute = require('./src/routes/user.routes');
const ProductRoute = require('./src/routes/product.route');
const CartRoute = require('./src/routes/cart.route');

mongoose.set('strictQuery', false);
require('dotenv').config();

const app = express()
const port=process.env.PORT;
const mongo_url=process.env.mongo_url;
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use("/user",UserRoute)
app.use("/products",ProductRoute)
app.use("/cart",CartRoute)


app.get('/',(req,res) => res.send('welcome to manglam backend'))

mongoose.connect(mongo_url).then(()=>{
    app.listen(port,() => {
        console.log('server started on port 8080')
    })
})
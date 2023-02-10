const express = require('express')
const cors=require("cors");
const { default: mongoose } = require('mongoose');
const UserModel = require('./src/models/User.model');
const argon2 = require('argon2');
const jwt=require("jsonwebtoken")

mongoose.set('strictQuery', false);
require('dotenv').config();

const app = express()
const port=process.env.PORT;
const mongo_url=process.env.mongo_url;
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.post("/signup",async(req,res)=>{
    try {
        let {name,email,password}=req.body;
        const existed_user=await UserModel.findOne({email})
        if(existed_user){
            return res.send("user already exist")
        }
        password = await argon2.hash(password);
        const user=new UserModel({name,email,password})
        await user.save()
        res.send("user created successfully")
    } catch (e) {
        res.send(e+"    "+"something went wrong")
    }
})

app.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await UserModel.findOne({email})
        if(await argon2.verify(user.password,password)){
           
            const access_token=jwt.sign({
                id:user.id,email:user.email
            },
            "SECRET123",
            {
                expiresIn:"6000 seconds"
            }
            )

            const refresh_token=jwt.sign(
                {
                    id:user.id,email:user.email
                },
                "SECRET123",
                {
                    expiresIn:"7 days"
                }
            )
            res.send({message:"Login Success",access_token,refresh_token})
        }
        else{
            res.send("not verified")
        }
    } catch (e) {
        res.send("something went wrong")
    }

    // if(!user){
    //     return res.send("invalid credentials")
    // }
    // const token=jwt. sign({id:user.id,email:user.email},
    //     "SECRET1234",
    //     {
    //         expiresIn:"5 days"
    //     }
    //     )
    //     const refreshtoken=jwt.sign({id:user.id,email:user.email,age:user.age},"REFRESHSECRET11234")
    //     res.send({message:"login success",token,refreshtoken})
})

app.get('/',(req,res) => res.send('welcome to manglam backend'))

mongoose.connect(mongo_url).then(()=>{
    app.listen(port,() => {
        console.log('server started on port 8080')
    })
})
const express = require('express')
const cors=require("cors");
const UserRoute=express.Router()

const argon2 = require('argon2');
const jwt=require("jsonwebtoken");
const UserModel = require('../models/User.model');
UserRoute.use(cors())
UserRoute.post("/signup",async(req,res)=>{
    console.log("hello")
    try {
        let {name,email,password}=req.body;
        console.log(name,email)
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

UserRoute.post("/login",async(req,res)=>{
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
})

module.exports=UserRoute
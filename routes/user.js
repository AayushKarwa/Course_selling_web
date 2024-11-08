const dotenv = require("dotenv")
dotenv.config()
const jwt = require("jsonwebtoken")    
const {Router} = require("express");
const { UserModel } = require("../db");
const {auth }= require("../auth/auth");
const userRouter = Router()
    
    

    userRouter.post("/signup",async(req,res)=>{

        const {email,password,firstname,lastname } = req.body;

        await UserModel.create({
            email:email,
            password:password,
            firstname:firstname,
            lastname:lastname
        })
        res.json({
            message: "you are signed up!"
        })
    })
    
    userRouter.post("/signin",async(req,res)=>{

        const {email,password} = req.body
        const user = await UserModel.findOne({
            email:email,
            password:password
        })
        console.log("user is: "+ user+ " user id is: "+user._id.toString())
        if(user){ 

        const token = jwt.sign({
            id: user._id
        },process.env.JWT_SECRET)
        console.log("token is: "+token)
        res.json({
            message: "you are signed in successfully!",
            token: token
        })
    }
    })

    userRouter.post("/purchases",auth,(req,res)=>{
        res.json({
            message: "you are signed up!"
        })
    })


module.exports = {
    userRouter:userRouter
}

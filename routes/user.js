    
    const {Router} = require("express");
const { UserModel } = require("../db");
    const userRouter = Router()
    const JWT_SECRET = "ilovekiara"
    

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
    
    userRouter.post("/signin",(req,res)=>{

        const {email,password} = req.body
        const user = UserModel.findOne({
            email:email,
            password:password
        })
        console.log("user is: "+ user)
        if(user){ 

        const token = jwt.sign({
            id: user._id.toString()
        },JWT_SECRET)
        console.log("token is: "+token)
        res.json({
            message: "you are signed in successfully!",
            token: token
        })
    }
    })

    userRouter.post("/purchases",(req,res)=>{
        res.json({
            message: "you are signed up!"
        })
    })


module.exports = {
    userRouter:userRouter
}

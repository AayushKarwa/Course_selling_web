const dotenv = require("dotenv")
dotenv.config()
const jwt = require("jsonwebtoken")    
const {Router} = require("express");
const { UserModel } = require("../db");
const {middleware} = require("../auth/middleware")
const bcrypt = require("bcrypt")
const {z} = require("zod")
const userRouter = Router()
    
const signupValidate = z.object({
    email: z.string().email().min(5).max(25),
    password: z.string().min(5).max(16),
    firstname: z.string().min(3).max(16),
    lastname: z.string().min(3).max(16)
})

const signinValidate = z.object({
    email: z.string().email().min(5).max(25),
    password: z.string().min(5).max(16)
})

    userRouter.post("/signup",async(req,res)=>{

       const parsedDataWithSuccess = signupValidate.safeParse(req.body)
       console.log(JSON.stringify(parsedDataWithSuccess))
       if(!parsedDataWithSuccess.success){
        res.status(403).json({
            message: parsedDataWithSuccess.error
        })
       }
        const {email,password,firstname,lastname } = parsedDataWithSuccess.data;

        const hashedPassword = await bcrypt.hash(password,10)

        await UserModel.create({
            email: email,
            firstname: firstname,
            lastname: lastname,
            password: hashedPassword
            
        });
        res.json({
            message: "you are signed up!"
        })
    })
    
    userRouter.post("/signin",async(req,res)=>{

        const parsedDataWithSuccess = signinValidate.safeParse(req.body)
        console.log(parsedDataWithSuccess.data)
        if(!parsedDataWithSuccess.success){
            res.status(403).json({
                message: parsedDataWithSuccess.error
            })
        }
       
        const {email,password} = parsedDataWithSuccess.data
        const user = await UserModel.findOne({
            email:email
            
        })
        if(!user){
            res.status(403).json({
                message:"Incorrect credentials"
            })
        }
        console.log("user is: "+user)
        const passwordMatch = await bcrypt.compare(password,user.password)
        if(!passwordMatch){
            res.status(403).json({
                message:"password is incorrect"
            })
        }
        console.log("user is: "+ user+ " user id is: "+user._id.toString())
        if(user){ 

        const token = jwt.sign({
            id: user._id
        },process.env.JWT_USER_SECRET)
        console.log("token is: "+token)
        res.json({
            message: `${user.firstname} you are signed in successfully!`,
            token: token
        })
    }
    })

    userRouter.post("/purchases",middleware(process.env.JWT_USER_SECRET),(req,res)=>{
        res.json({
            message: "you are signed up!"
        })
    })


module.exports = {
    userRouter:userRouter
}

const dotenv = require("dotenv")
dotenv.config()
const {Router} = require("express")
const bcrypt = require("bcrypt")
const {AdminModel, CourseModel} = require("../db")
const {z} = require("zod")
const jwt = require("jsonwebtoken")
const { middleware } = require("../auth/middleware")

const adminRouter = Router();

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

const courseValidate = z.object({
    title: z.string().min(5).max(100),
    description: z.string().min(5).max(100),
    imgurl: z.string().min(5).max(100),
    price: z.number()
})

adminRouter.post("/signup",async(req,res)=>{
    const parsedDataWithSuccess = signupValidate.safeParse(req.body)
    console.log(JSON.stringify(parsedDataWithSuccess))
    if(!parsedDataWithSuccess.success){
     res.status(403).json({
         message: parsedDataWithSuccess.error
     })
    }
     const {email,password,firstname,lastname } = parsedDataWithSuccess.data;

     const hashedPassword = await bcrypt.hash(password,10)
     console.log(hashedPassword)

     await AdminModel.create({
         email: email,
         firstname: firstname,
         lastname: lastname,
         password: hashedPassword
         
     });
     res.json({
         message: "you are signed up!"
     })
 }) 

 adminRouter.post("/signin",async(req,res)=>{

    const parsedDataWithSuccess = signinValidate.safeParse(req.body)
    console.log(parsedDataWithSuccess.data)
    if(!parsedDataWithSuccess.success){
        res.status(403).json({
            message: parsedDataWithSuccess.error
        })
    }
   
    const {email,password} = parsedDataWithSuccess.data
    const user = await AdminModel.findOne({
        email:email
        
    })
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
    },process.env.JWT_ADMIN_SECRET)
    console.log("token is: "+token)
    res.json({
        message: `${user.firstname} you are signed in successfully!`,
        token: token
    })
}
 })

 adminRouter.post("/course",middleware(process.env.JWT_ADMIN_SECRET),async(req,res)=>{
    const userid = req.userid;
    const parsedDataWithSuccess = courseValidate.safeParse(req.body)
    if(!parsedDataWithSuccess.success){
        res.status(403).json({
            message: parsedDataWithSuccess.error
        });
    console.log(parsedDataWithSuccess.data)
    }
    const {title,description,imgurl,price} = parsedDataWithSuccess.data;

    const course = await CourseModel.create({
        title:title,
        description:description,
        imgurl:imgurl,
        price:price,
        creatorid:userid
    })

    res.json({
        message: `course created successfully by admin ${userid}`,
        courseId: course._id
    })

 })


module.exports = {
    adminRouter: adminRouter
}
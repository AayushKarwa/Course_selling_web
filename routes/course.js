require("dotenv").config()
const {Router} = require("express")
const { middleware } = require("../auth/middleware")
const { PurchaseModel, CourseModel } = require("../db")
    const courseRouter = Router()

    courseRouter.post("/purchase",middleware(process.env.JWT_USER_SECRET),async(req,res)=>{
        const userId = req.userid
        const {courseid} = req.body

        await PurchaseModel.create({
            userid:userId,
            courseid:courseid
        })
        res.json({
            message:"course purchases successfully!"
        })
    })
    
    courseRouter.get("/preview",async(req,res)=>{

        const courses = await CourseModel.find({})
        res.json({
            courses:courses
        })
    })

    courseRouter.get("/purchases",middleware(process.env.JWT_USER_SECRET),async(req,res)=>{
        const userId = req.userid
        const purchases = await PurchaseModel.find({
            userid:userId
        })
        const courseData = await CourseModel.find({
            _id:{ $in: purchases.map(x=>x.courseid)}
        })
        console.log(courseData)

        res.json({
            purchases,
            courseData
        })
    })


module.exports = {
    courseRouter:courseRouter
}
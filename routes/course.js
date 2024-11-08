    const {Router} = require("express")
    const courseRouter = Router()

    courseRouter.post("/course/purchase",(req,res)=>{
        res.json({
            message: "you are signed up!"
        })
    })
    
    courseRouter.get("/course/preview",(req,res)=>{
        res.json({
            message: "you are signed up!"
        })
    })


module.exports = {
    courseRouter:courseRouter
}
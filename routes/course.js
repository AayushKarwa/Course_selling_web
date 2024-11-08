    const {Router} = require("express")
    const courseRouter = Router()

    courseRouter.post("/purchase",(req,res)=>{
        res.json({
            message: "you are signed up!"
        })
    })
    
    courseRouter.get("/preview",(req,res)=>{
        res.json({
            message: "you are signed up!"
        })
    })


module.exports = {
    courseRouter:courseRouter
}
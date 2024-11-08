    const {Router} = require("express")
    const userRouter = Router()

    userRouter.post("/signup",(req,res)=>{
        res.json({
            message: "you are signed up!"
        })
    })
    
    userRouter.post("/signin",(req,res)=>{
        res.json({
            message: "you are signed up!"
        })
    })

    userRouter.post("/purchases",(req,res)=>{
        res.json({
            message: "you are signed up!"
        })
    })


module.exports = {
    userRouter:userRouter
}

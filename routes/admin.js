const {Router} = require("express")
const adminRouter = Router();

adminRouter.post("/course",(req,res)=>{
    res.json({
        message:"you created a course..."
    })
})

module.exports = {
    adminRouter: adminRouter
}
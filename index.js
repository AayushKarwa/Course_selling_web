const dotenv  = require("dotenv")
const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")
const { userRouter } = require("./routes/user")
const { courseRouter } = require("./routes/course")

app.use(express.json())
app.use("/api/v1/user",userRouter)
app.use("/api/v1/course",courseRouter)





app.listen(3000,()=>{
    console.log("listening on port 3000....")
})



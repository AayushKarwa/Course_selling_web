const dotenv  = require("dotenv")
dotenv.config()
const mongoose = require("mongoose")
const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")
const { userRouter } = require("./routes/user")
const { courseRouter } = require("./routes/course")
const { adminRouter } = require("./routes/admin")

app.use(express.json())
app.use("/api/v1/user",userRouter)
app.use("/api/v1/admin",adminRouter)
app.use("/api/v1/course",courseRouter)



async function main(){ 
console.log("mongodb uri is: "+process.env.MONGODB_URI);
await mongoose.connect(process.env.MONGODB_URI).
then(()=>{
    console.log("Database Connected Successfully...")
}).catch(e=>{
    console.error("Database connection error: "+e)
})
app.listen(3000,()=>{
    console.log("listening on port 3000....")
})
}

main();



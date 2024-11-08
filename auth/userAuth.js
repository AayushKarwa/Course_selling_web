const dotenv = require("dotenv")
dotenv.config()
const jwt = require("jsonwebtoken")
function userAuth(req,res,next){
    const token = req.headers.token
    if(!token){
        res.status(403).json({
            message: "token not provided"
        })
    }
    try{ 
    const decodedToken = jwt.verify(token,process.env.JWT_USER_SECRET)
    if(decodedToken){
        req.userid = decodedToken.id;
    }
    next();
}catch(e){
    res.status(403).json({
        message:"token is invalid!",
        error:e
    })
}
}

module.exports = ({
    userAuth
})
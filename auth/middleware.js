const jwt = require("jsonwebtoken")
function middleware(password){
    return function(req,res,next){

        const token = req.headers.token
    if(!token){
        res.status(403).json({
            message: "token not provided"
        })
    }
    try{ 
    const decodedToken = jwt.verify(password)
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
    }
module.exports = {
    middleware
}
const jwt = require("jsonwebtoken");


module.exports=(req,res,next)=>{
    try {
        const token=req.headers["access_token"];
        const check=jwt.verify(token,SECRET123)
        if(check){
            req.body.id=check.id
            next()
        }
        else{
            return res.status(401).json({
                message:"invalid token"
            })
        }
    } catch (e) {
        return res.status(401).json({
            message:"invalid token"
        })
    }
}
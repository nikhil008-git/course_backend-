const jwt = require("jsonwebtokens");
const { JWT_ADMIN_PASSWORD } =  require("./config")
 

function adminMiddleware(req,res,next){
    const token = req.header.tokenl;
    const decoded = jwt_verify({token, JWT_ADMIN_PASSWORD})
    if(decoded){
        req.userId = deocded.id;
        next()
    }
    else{
        res.status(403).json({
            message: "You are not signed in"
        })
    }

}
module.export= {
    adminMiddleware : adminMiddleware
    
}
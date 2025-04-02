const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = ("../Model/user");

require("dotenv").config();

const protect = asyncHandler(async(req,res,next)=>{
    let = token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
      try {
   
        token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const decoded = jwt.verify(token,process.env,LOGIN_SECRET_KEY);
        console.log(decoded);
        req.user = await User.findById(decoded.id).select("-password");
        
        next();


      }catch(error){
        console.log(error);
        res.status(401);
        throw new Error ("not authorized");
      }
    }
   
});

module.exports ={protect}
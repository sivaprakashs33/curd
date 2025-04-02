const User = require("../Model/user");

const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { model } = require("mongoose");
require("dotenv").config();

const registerUser = asyncHandler(async(req,res)=>{
    const {name, email, password, number,role} = req.body

    if(!name || !email || !password || !number || !role ){
        res.status(400);
        throw new Error("please fill the all fielg"); 
    }

    const userExists = await User.findOne({email:email});
    if(userExists){
        res.status(400);
        throw new Error("alredy user exists");
    }

    const secret = parseInt(process.env.SALT);
    const salt = await bcrypt.genSalt(secret);

    const hashedepassword = await bcrypt.hash(password,salt);

    const user = await User.create({
        name:name,
        email:email,
        password:hashedepassword,
        number:number,
        role:role,
    })
    console.log(user);

    if(user){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            number:user.number,
            role:user.role
        })
    }else{
        res.status(400);
        throw new Error("invalide user data");
        
    }
    
});

const loginUser = asyncHandler(async(req,res)=>{

    const {email,password} = req.body;
    const user = await User.findOne({email});
    console.log(user);
    
    if(user && (await bcrypt.compare(password,user.password))){
        res.status(200).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            number:user.number,
            toker:generatetoken(user._id)
        })
    }else{
        res.status(400);
        throw new Error("invalide usr or password");
        
    }
});

const updateUser = asyncHandler(async(req,res)=>{
    const {id} = req.params;

    if(!id || !req.body){
        res.status(400);
        throw new Error("invalide request data");
        
    }

    try {
         const updateUser = await User.findByIdAndUpdate(id, req.body, {new:true});

         if(!updateUser){
            res.status(404);
            throw new Error("user not found");
         }

         return res.status(200).json({
            massage: 'User updated successfully',
            data: updateUser
         });
        
    } catch {
        res.status(500);
        throw new Error("server erroe");
        
        
    }

});

const deleteUser = asyncHandler(async(req,res)=>{
    const {id} = req.params;

    if(!id || !req.body){
        res.status(400);
        throw new Error("invalide request data");
        
    }

    try {
        
        const deleteUser = await User.findByIdAndDelete(id, req.body,{new:true})

        if(!deleteUser){
            res.status(404)
            throw new Error("user not found"); 
        }

        return res.status(200).json({
            massage:"user delete successfully",
            data: deleteUser
        });
    } catch{
        req.status(500);
        throw new Error("servar error");
    }
})


const generatetoken = (id) =>{
    var token =jwt.sign({id},process.env.LOGIN_SECRET_KEY,
        {expiresIn: '30d'});

        console.log(token);
        return token;
};



module.exports = {registerUser,loginUser,updateUser,deleteUser}

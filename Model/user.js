const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    number:{
        type: Number,
        require:true
    },
    role:{
        type:String,
        require:true,
        default:'user'
    },
    
},

{
    timeStamps:true,
});

module.exports = mongoose. model("User",userSchema);
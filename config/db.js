const mongoose = require("mongoose")
require("dotenv").config();
const ConnectDB = async() =>{{
    try {
        const connect = await mongoose.connect(process.env.MONGOOSEURL);
        console.log("connecting mongodb successfully");
        
    } catch (e) {
        console.log(e)
        process.exit(1)
    }
}}
module.exports = ConnectDB;
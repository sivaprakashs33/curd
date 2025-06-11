const express = require("express");
const cors = require("cors");
const ConnectDB = require("./config/db");
require ('dotenv').config();
const bodyparser = require("body-parser");

const app = express();

app.use(cors());

const dashboardRouter = require("./Router/userRouter");
app.use(express.json());


app.use('/curd',dashboardRouter);

const { defulte : mongoose } = require("mongoose")
ConnectDB();

app.get("/",(req,res)=>{
   res.send("hello ")
})
app.listen(process.env.PORT, ()=>{
    console.log(`server started on port:${process.env.PORT}`);
})

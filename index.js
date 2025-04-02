const express = require("express");
const ConnectDB = require("./config/db");
require ('dotenv').config();
const app = express();
const cors = require("cors");

app.use(cors({
    origin: 'http://localhost:5173',  
    methods: ['GET', 'POST','PUT','DELETE'],        
    allowedHeaders: ['Content-Type', 'Authorization'], 
  }));

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

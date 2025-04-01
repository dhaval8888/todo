import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import todoRouter from "./routes/todo.route.js";
import userRouter from "./routes/user.route.js";
import cors from "cors";
import cookieParser from 'cookie-parser';

const app = express()

// grting data from evn file
dotenv.config();
const port= process.env.port || 4001;
const db_uri= process.env.mongodb_uri;

// midlle layer
app.use(express.json());

app.use(cookieParser());
// const cors = require('cors');
app.use(cors({ 
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods:"GET,PUT,POST,DELETE",
  allowedHeaders:["Content-Type" , "Authoriztion"],
}))


// to conect mongodb
try{
   await mongoose.connect(db_uri);
    console.log("mogngodb connected");
}
catch(error){
    console.log(error);
}

//go to route
app.use("/todo", todoRouter); 
app.use("/user", userRouter); 


app.get('/', (req, res) => {
  res.send('Hello World!')
})
   
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
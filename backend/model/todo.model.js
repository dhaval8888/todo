import mongoose from "mongoose";

const todoschema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean, 
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:true
    }
})

const Todo= mongoose.model("todo", todoschema);
export default Todo // export so we can use it in deff file



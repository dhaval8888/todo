// import express from "express";
import Todo from "../model/todo.model.js";

export const createTodo = async (req, res) => { // creating a function
    const todo= new Todo({
        title: req.body.title,
        completed: req.body.completed,
        user: req.user._id
    });

    try{
        const newtodo= await todo.save();
        return res.status(201).json({message:"todo creared",newtodo})
    } catch(error){
        console.log(error)
        return res.status(400).json({message:"error has been occered"})
    }
}


export const getTodo = async (req, res) => {
    try{
        const todo= await Todo.find({user: req.user._id});//{user: req.user._id}
        return res.status(201).json({message:"todo fetched",todo})
    } catch(error){
        console.log(error)
        return res.status(400).json({message:"error has been occered during fatching"})
    }
}

export const updateTodo = async (req, res) => {
    try{
        const todo= await Todo.findByIdAndUpdate(req.params.id, req.body,{
            new:true
        });
        return res.status(201).json({message:"todo updated",todo})
    } catch(error){
        console.log(error)
        return res.status(400).json({message:"error has been occered during updating"})
    }
}

export const deleteTodo = async (req, res) => {
    try{
        const todo= await Todo.findByIdAndDelete(req.params.id);
        return res.status(201).json({message:"todo deleted",todo})
    } catch(error){
        console.log(error)
        return res.status(400).json({message:"error has been occered during deleting"})
    }
}

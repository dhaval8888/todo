import { createTodo, deleteTodo, getTodo, updateTodo } from "../controller/todo.controller.js";
import express from 'express';
import authanticate from "../middleware/authorize.js";

const router= express.Router();

router.post("/create",authanticate, createTodo);
router.get("/fetch",authanticate, getTodo);
router.put("/update/:id",authanticate, updateTodo);
router.delete("/delete/:id",authanticate, deleteTodo);

export default router;
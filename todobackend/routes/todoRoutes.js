import express from "express";
import { createTodo, getAllTodos, getTodoById, deleteTodo } from "../controllers/todoController.js";

const router = express.Router();

router.post("/create", createTodo);  
router.get("/", getAllTodos);              
router.get("/:id", getTodoById);          
router.delete("/:id", deleteTodo);         

export default router;

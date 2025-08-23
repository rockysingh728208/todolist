import express from "express";
import { createTodo, getAllTodos, getTodoById, deleteTodo } from "../controllers/todoController.js";

const router = express.Router();

router.post("/create", createTodo);        // Create Todo
router.get("/", getAllTodos);              // Get All Todos
router.get("/:id", getTodoById);           // Get Todo by ID
router.delete("/:id", deleteTodo);         // Delete Todo

export default router;

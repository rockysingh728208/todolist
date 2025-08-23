import Todo from "../models/todoModel.js";

// Create Todo
export const createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }
    const todo = new Todo({ title });
    await todo.save();
    res.status(201).json({ success: true, message: "Todo created", todo });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get All Todos
export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({ success: true, message: "All todos fetched", todos });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get Todo by ID
export const getTodoById = async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ success: false, message: "Todo not found" });
    }
    res.status(200).json({ success: true, message: "Todo fetched successfully", todo });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete Todo
export const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ success: false, message: "Todo not found" });
    }
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

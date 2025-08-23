import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api/todos";

const TodoApp = () => {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [id, setId] = useState("");
  const [singleTodo, setSingleTodo] = useState(null);

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      const res = await axios.get(API_URL);
      setTodos(res.data.todos);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Create Todo
  const createTodo = async () => {
    if (!title) return alert("Please enter a title");
    try {
      await axios.post(`${API_URL}/create`, { title });
      setTitle("");
      fetchTodos();
    } catch (err) {
      console.error(err);
      alert("Error creating todo");
    }
  };

  // Get Todo by ID
  const getTodo = async () => {
    if (!id) return alert("Enter an ID");
    try {
      const res = await axios.get(`${API_URL}/${id}`);
      setSingleTodo(res.data.todo);
    } catch (err) {
      console.error(err);
      alert("Todo not found");
    }
  };

  // Delete Todo
  const deleteTodo = async (todoId) => {
    try {
      await axios.delete(`${API_URL}/${todoId}`);
      fetchTodos();
    } catch (err) {
      console.error(err);
      alert("Error deleting todo");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          📝 Todo App
        </h1>

        {/* Create Todo */}
        <div className="mb-6 flex">
          <input
            type="text"
            placeholder="Enter todo title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-grow border-2 border-gray-300 rounded-l-xl p-2 focus:outline-none focus:border-purple-500"
          />
          <button
            onClick={createTodo}
            className="bg-gradient-to-r from-green-400 to-green-600 text-white px-5 py-2 rounded-r-xl hover:opacity-90 transition"
          >
            ➕ Add
          </button>
        </div>

        {/* Get Todo by ID */}
        <div className="mb-6 flex">
          <input
            type="text"
            placeholder="Enter todo ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="flex-grow border-2 border-gray-300 rounded-l-xl p-2 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={getTodo}
            className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-5 py-2 rounded-r-xl hover:opacity-90 transition"
          >
            🔍 Find
          </button>
        </div>

        {/* Single Todo */}
        {singleTodo && (
          <div className="p-4 mb-6 bg-yellow-100 border-l-4 border-yellow-500 rounded shadow">
            <h2 className="text-lg font-semibold">📌 Todo Details</h2>
            <p><strong>ID:</strong> {singleTodo._id}</p>
            <p><strong>Title:</strong> {singleTodo.title}</p>
          </div>
        )}

        {/* All Todos */}
        <h2 className="text-xl font-bold text-gray-700 mb-3">📋 All Todos</h2>
        <ul className="space-y-3">
          {todos.map((t) => (
            <li
              key={t._id}
              className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow hover:shadow-md transition"
            >
              <span className="text-gray-800">{t.title}</span>
              <button
                onClick={() => deleteTodo(t._id)}
                className="bg-gradient-to-r from-red-400 to-red-600 text-white px-3 py-1 rounded hover:opacity-90 transition"
              >
                ❌ Delete
              </button>
            </li>
          ))}
          {todos.length === 0 && (
            <p className="text-gray-600 text-center">No todos yet. Add one!</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;

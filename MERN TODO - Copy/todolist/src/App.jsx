import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "./styles.css";
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import mongoose from "mongoose";


const API_BASE_URL ="http://localhost:5000/api/todos";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const response = await axios.get(API_BASE_URL);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }

  async function handleAddTodo(newItem) {
    try {
      const response = await axios.post(API_BASE_URL, {
        _id: uuidv4(), 
        title: newItem,
        completed: false,
      }, {
        headers: {
          "Content-Type": "application/json" //Content-Type header to JSON
        }
      });
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  }

  async function handleToggleTodo(id, completed) {
    try {
      await axios.put(`${API_BASE_URL}/${id}`, { completed }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      setTodos((currentTodos) =>
        currentTodos.map((todo) =>
          todo.id === id ? { ...todo, completed } : todo
        )
      );
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  }
  
  

  async function handleDeleteTodo(id) {
    try {
      if (!id) {
        console.error("Invalid ID: Cannot delete todo, ID is undefined.");
        return;
      }
  
      await axios.delete(`${API_BASE_URL}/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }
  
  return (
    <>
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList
        todos={todos}
        onToggleTodo={handleToggleTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}

export default App;

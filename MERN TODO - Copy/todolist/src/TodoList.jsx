import { useState } from "react";

function TodoList({ todos, onToggleTodo, onDeleteTodo }) {
  return (
    <>
      <h1 className="header">TO-DO LIST</h1>
      <ul className="list">
        {todos.length === 0 && "Add some tasks"}
        {todos.map((todo) => {
          return (
            <li key={todo.id}> {}
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => onToggleTodo(todo.id, e.target.checked)}
                />
                {todo.title}{" "}
              </label>
              <button
                className="btn btn-danger"
                onClick={() => onDeleteTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default TodoList;

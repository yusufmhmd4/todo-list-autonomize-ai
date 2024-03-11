import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { GrEdit } from "react-icons/gr";
import "./index.css";

const TodoItem = (props) => {
  const {
    todo,
    index,
    editTodoIndex,
    updateTodoEditIndex,
    updateTodo,
    deleteTodo,
  } = props;
  const [editedTodo, updateEditedTodo] = useState(todo.name);
  return (
    <li className="todo-item">
      {index === editTodoIndex ? (
        <div className="todo-edit-container">
          <input
            className="edit-todo-input"
            type="text"
            value={editedTodo}
            onChange={(e) => updateEditedTodo(e.target.value)}
          />
          <button
            className="save-button"
            onClick={() => {
              updateTodo(index, editedTodo);
              updateTodoEditIndex(null);
            }}
          >
            Save
          </button>
        </div>
      ) : (
        <span className="todo-name">
          {todo.name} ( updated {todo.updateCount} times )
        </span>
      )}
      <div className="button-container">
        {index !== editTodoIndex && (
          <button onClick={() => updateTodoEditIndex(index)}>
            <GrEdit id="edit-icon"/>
          </button>
        )}
        <button onClick={() => deleteTodo(index)}>
          <RxCross2 id="cross-icon" />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;

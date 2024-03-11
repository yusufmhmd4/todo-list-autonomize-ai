import React, { useState, useEffect } from "react";
import TodoItem from "./components/TodoItem";
import "./App.css";

function App() {
  const [todoList, updateTodoList] = useState(
    JSON.parse(localStorage.getItem("todoList")) || []
  );
  const [userInput, changeUserInput] = useState("");
  const [editTodoIndex, updateTodoEditIndex] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("todoList")) || [];
    updateTodoList(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const addTodo = (task, quantity) => {
    const newTodoList = [...todoList];

    if (quantity && quantity > 1) {
      for (let i = 0; i < quantity; i++) {
        newTodoList.push({ name: task, updateCount: 0 });
      }
    } else {
      newTodoList.push({ name: task, updateCount: 0 });
    }

    updateTodoList(newTodoList);
    changeUserInput("");
  };

  const updateTodo = (index, changedTodo) => {
    const newTodoList = [...todoList];
    newTodoList[index] = {
      name: changedTodo,
      updateCount:
        changedTodo !== newTodoList[index].name
          ? newTodoList[index].updateCount + 1
          : newTodoList[index].updateCount,
    };
    updateTodoList(newTodoList);
  };

  const deleteTodo = (index) => {
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    updateTodoList(newTodoList);
    updateTodoEditIndex(null);
  };

  return (
    <div className="app-container">
      <div className="todos-container">
        <h1 className="todos-heading">Day Goals!</h1>
        <div>
          <div className="input-container">
            <input
              className="add-input"
              type="text"
              placeholder="Add task with quantity"
              value={userInput}
              onChange={(e) => changeUserInput(e.target.value)}
            />
            <button
              className="add-todo-button"
              onClick={() => {
                let newTodoName = userInput.trim().split(" ");

                if (newTodoName.length > 1) {
                  const todoName = newTodoName.slice(0, -1).join(" ");
                  const todoCount = newTodoName[newTodoName.length - 1];

                  const quantity = !isNaN(todoCount)
                    ? parseInt(todoCount, 10)
                    : 1;

                  quantity===1?addTodo(newTodoName.join(" "), quantity):addTodo(todoName,quantity)
                } else {
                  if (userInput === "") {
                    alert("Enter Todo");
                    return;
                  }
                  addTodo(newTodoName.join(" "), 1);
                }
              }}
            >
              Add Todo
            </button>
          </div>
        </div>
        <ul>
          {todoList.map((todo, index) => (
            <TodoItem
              key={index}
              todo={todo}
              index={index}
              editTodoIndex={editTodoIndex}
              updateTodoEditIndex={updateTodoEditIndex}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import AddTask from "./Components/AddTask.js";

const App = () => {
  const [todolist, setTodoList] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [editText, setEditText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3500/")
      .then((res) => {
        setTodoList(res.data);
      })

      .catch((err) => {
        // console.log(err.message)
        setError(err.message);
      });
  }, []);

  const addTask = (newTask) => {
    setTodoList([...todolist, newTask]);
  };

  const handleChange = (task) => {
    setEditTaskId(task._id);
    setEditText(task.title);
  };

  const handleChangeStatus = (id) => {
    const current = todolist.find((task) => task._id === id);

    axios
      .put(`http://localhost:3500/${id}`, {
        isComplete: !current.isComplete,
      })
      .then((res) => {
        setTodoList(
          todolist.map((tasks) =>
            tasks._id === id
              ? { ...tasks, isComplete: !current.isComplete }
              : tasks
          )
        );
        setEditTaskId(null);
        setEditText("");
        setError("");
      })
      .catch((err) => setError(err.message));
  };

  const handleChangeSubmit = (id) => {
    const currentTask=todolist.find(task=>task._id===id)
    if(editText.trim()===""){
      setEditText(currentTask.title);
      setEditTaskId(null);
      return;
    }
    axios
      .put(`http://localhost:3500/${id}`, {
        title: editText,
      })
      .then((res) => {
        setTodoList(
          todolist.map((tasks) =>
            tasks._id === id ? { ...tasks, title: editText } : tasks
          )
        );
        setEditTaskId(null);
        setEditText("");
        setError("");
      })
      .catch((err) => setError(err.message));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3500/${id}`)
      .then((res) => {
        // console.log("delete success")
        setTodoList(todolist.filter((task) => task._id != id));
        setError("");
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  return (
    <div >
      <AddTask addTask={addTask} />
      <div className="outer-box">
      {error && <p style={{ color: "red" }}>{error}</p>}
      {todolist.map((tasks) => {
        return (
          <div className="inner-element"
            style={
              tasks.isComplete === true
                ? { textDecoration: "line-through" }
                : {}
            }
            key={tasks._id}
          >
            <div className="inner">
              <input
                type="checkbox"
                checked={tasks.isComplete}
                onChange={() => handleChangeStatus(tasks._id)}
              />
              <p>{tasks.title}</p>
              <div className="inner-inner">
              <button onClick={() => handleChange(tasks)}>edit</button>
              <button onClick={() => handleDelete(tasks._id)}>Delete</button>
              </div>
            </div>

            {editTaskId == tasks._id && (
              <div>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => handleChangeSubmit(tasks._id)}>
                  Save
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
    </div>
  );
};

export default App;

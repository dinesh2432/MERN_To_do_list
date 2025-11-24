import React, { useState,useRef } from "react";
import axios from "axios";
import "./AddTask.css"
const AddTask = (props) => {
  const [newTask, setNewTask] = useState("");
  const inputRef = useRef(null)
  const handleAdd = () => {
    if (newTask.trim() === "") {
      return;
    }
    axios
      .post("http://localhost:3500", {
        title: newTask,
        isComplete: false,
      })
      .then((res) => {
        setNewTask("");
        props.addTask(res.data);
        inputRef.current.focus()
      })

      .catch((err) => console.log(err.message));
  };
  return (
    <div className="outerbox">
      <h1>TO DO LIST</h1>
      <div className="innerbox">
        <input
          type="text"
          placeholder="enter your task.."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          ref={inputRef}
          required
        />
        <button onClick={handleAdd}>ADD TASK</button>
      </div>
    </div>
  );
};

export default AddTask;

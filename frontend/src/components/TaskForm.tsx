import React, { useContext, useState } from "react";
import { TaskContext } from "./TaskContext";
import { Button, TextField } from "@mui/material";
const TaskForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const { addTask } = useContext(TaskContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;
    addTask(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Add Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        required
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Add Task
      </Button>
    </form>
  );
};

export default TaskForm;

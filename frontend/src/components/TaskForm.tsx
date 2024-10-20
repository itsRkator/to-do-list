import React, { useContext, useState } from "react";
import { TaskContext } from "./TaskContext";
import { Button, TextField } from "@mui/material";

const TaskForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const { addTask } = useContext(TaskContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim().length <= 3) {
      setError("Task title must be at least 3 characters long.");
      setTimeout(() => setError(""), 5000);
      return;
    }
    addTask(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        placeholder="Type something"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        error={!!error}
        helperText={error}
        sx={{
          "& .MuiOutlinedInput-root": {
            pl: 2,
            margin: "0.5rem",
            borderRadius: "0.75rem",
            height: "40px",
            padding: "0.5rem",
            "& input": {
              padding: "10px",
            },
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={!title.length}
        sx={{
          mt: 2,
          background: "black",
          textTransform: "none",
          borderRadius: "0.75rem",
          margin: "0.5rem",
        }}
      >
        Add Task
      </Button>
    </form>
  );
};

export default TaskForm;

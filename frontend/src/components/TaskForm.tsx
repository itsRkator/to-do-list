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
        placeholder="Type something"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            pl: 2,
            margin: "0.5rem",
            borderRadius: "0.75rem", // Add border radius to the input field
            height: "40px", // Adjust the height of the input box
            padding: "0.5rem", // Optional: Adjust padding to ensure it fits well
            "& input": {
              padding: "10px", // Adjust padding within the input to fit the reduced height
            },
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
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

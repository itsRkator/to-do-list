import React, { useContext, useState } from "react";
import { TaskContext } from "./TaskContext";
import { Button, ButtonGroup, TextField } from "@mui/material";

const TaskFilter: React.FC = () => {
  const { fetchTasks } = useContext(TaskContext)!;
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const handleFilter = (newStatus: string) => {
    setStatus(newStatus);
    fetchTasks(search, newStatus === "all" ? "" : newStatus);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    fetchTasks(e.target.value, status === "all" ? "" : status);
  };
  return (
    <>
      <TextField
        label="Search Tasks"
        value={search}
        onChange={handleSearch}
        fullWidth
        sx={{ mb: 2 }}
      />
      <ButtonGroup fullWidth sx={{ mb: 2 }}>
        <Button
          onClick={() => handleFilter("all")}
          variant={status === "all" ? "contained" : "outlined"}
        >
          All
        </Button>
        <Button
          onClick={() => handleFilter("completed")}
          variant={status === "completed" ? "contained" : "outlined"}
        >
          Completed
        </Button>
        <Button
          onClick={() => handleFilter("incomplete")}
          variant={status === "incomplete" ? "contained" : "outlined"}
        >
          Incomplete
        </Button>
      </ButtonGroup>
    </>
  );
};

export default TaskFilter;

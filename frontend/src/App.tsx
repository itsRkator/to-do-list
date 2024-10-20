import React from "react";
import { TaskProvider } from "./components/TaskContext";
import { Container } from "@mui/material";
import TaskForm from "./components/TaskForm";
import TaskFilter from "./components/TaskFilter";
import TaskList from "./components/TaskList";

const App: React.FC = () => {
  return (
    <TaskProvider>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <h1>Today</h1>
        <TaskForm />
        <TaskFilter />
        <TaskList />
      </Container>
    </TaskProvider>
  );
};

export default App;

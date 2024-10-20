import React, { useContext } from "react";
import { TaskContext, TaskProvider } from "./components/TaskContext";
import {
  Box,
  CircularProgress,
  Container,
  LinearProgress,
} from "@mui/material";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  const { loading } = useContext(TaskContext);
  return (
    <TaskProvider>
      <Navbar />
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        {loading && (
          <>
            <LinearProgress color="success" />
            <Box display="flex" justifyContent="center">
              <CircularProgress size={100} color="success" />
            </Box>
          </>
        )}
        <TaskList />
        <TaskForm />
      </Container>
    </TaskProvider>
  );
};

export default App;

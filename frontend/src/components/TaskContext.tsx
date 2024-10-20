import React, {
  createContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { Task, TaskContextProps, TaskProviderProps } from "../types/Types";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../services/apiService";
import { sortTasks } from "../utils/utility";
import { Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TaskContext = createContext<TaskContextProps>({
  tasks: [],
  loading: false,
  currentPage: 1,
  totalPages: 1,
  fetchTasks: (search?: string, status?: string) => {},
  addTask: (title: string) => {},
  toggleTask: (id: string) => {},
  removeTask: (id: string) => {},
});

const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const fetchTasks = useCallback(
    async (search: string = "", status: string = "") => {
      setLoading(true);
      try {
        const response = await getTasks(search, status);
        const { tasks: taskList, currentPage, totalPages } = response;
        setTasks(sortTasks(taskList));
        setCurrentPage(currentPage);
        setTotalPages(totalPages);
        showSnackbar("Tasks fetched successfully", "success");
      } catch (error: any) {
        console.error(`Error while fetching the tasks: ${error.message}`);
        showSnackbar("Error fetching tasks", "error");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = useCallback(async (title: string) => {
    setLoading(true);
    try {
      const response = await createTask(title);
      setTasks((prevTasks) => [...prevTasks, response]);
      showSnackbar("Task added successfully", "success");
    } catch (error: any) {
      console.error(`Error while adding the task: ${error.message}`);
      showSnackbar("Error adding task", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleTask = useCallback(
    async (id: string) => {
      setLoading(true);
      const task = tasks.find((task) => task._id === id);
      try {
        if (!task) {
          throw new Error("Task does not exist");
        }
        const updatedTask = await updateTask(id, !task.completed);
        setTasks((prevTasks) =>
          sortTasks(
            prevTasks.map((task) => (task._id === id ? updatedTask : task))
          )
        );
        showSnackbar("Task completed successfully", "success");
      } catch (error: any) {
        console.error(`Error while updating the task: ${error.message}`);
        showSnackbar("Error updating task", "error");
      } finally {
        setLoading(false);
      }
    },
    [tasks]
  );

  const removeTask = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const response = await deleteTask(id);
      if (response) {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
        showSnackbar("Task deleted successfully", "success");
      }
    } catch (error: any) {
      console.error(`Error deleting the task: ${error.message}`);
      showSnackbar("Error deleting task", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      tasks,
      loading,
      currentPage,
      totalPages,
      fetchTasks,
      addTask,
      toggleTask,
      removeTask,
    }),
    [
      tasks,
      loading,
      currentPage,
      totalPages,
      fetchTasks,
      addTask,
      toggleTask,
      removeTask,
    ]
  );

  return (
    <>
      <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export { TaskContext, TaskProvider };

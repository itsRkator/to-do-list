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

  const fetchTasks = useCallback(
    async (search: string = "", status: string = "") => {
      setLoading(true);
      try {
        const response = await getTasks(search, status);
        const { tasks: taskList, currentPage, totalPages } = response;
        setTasks(sortTasks(taskList));
        setCurrentPage(currentPage);
        setTotalPages(totalPages);
        setLoading(false);
      } catch (error: any) {
        console.error(`Error while fetching the tasks: ${error.message}`);
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
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.error(`Error while adding the task: ${error.message}`);
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
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        console.error(`Error while updating the task: ${error.message}`);
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
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.error(`Error deleting the task: ${error.message}`);
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

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export { TaskContext, TaskProvider };

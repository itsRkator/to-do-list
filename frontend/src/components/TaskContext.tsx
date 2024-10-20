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

const TaskContext = createContext<TaskContextProps>({
  tasks: [],
  fetchTasks: () => {},
  addTask: async (title: string) => {},
  toggleTask: async (id: string) => {},
  removeTask: async (id: string) => {},
});

const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTasks = async (search: string = "", status: string = "") => {
    try {
      const response = await getTasks(search, status);
      const { tasks, currentPage, totalPages } = response;
      setTasks(tasks);
      setCurrentPage(currentPage);
      setTotalPages(totalPages);
    } catch (error: any) {
      console.error(`Error while fetching the tasks: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (title: string) => {
    try {
      const response = await createTask(title);
      const updatedTaskList = [...tasks, response];
      setTasks(updatedTaskList);
    } catch (error: any) {
      console.error(`Error while adding the task: ${error.message}`);
    }
  };

  const toggleTask = useCallback(
    async (id: string) => {
      const task = tasks.find((task) => task._id === id);
      try {
        if (!task) {
          throw new Error("Task does not exist");
        }
        const updatedTask = await updateTask(id, !task.completed);
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task._id === id ? updatedTask : task))
        );
      } catch (error: any) {
        console.error(`Error while updating the task: ${error.message}`);
      }
    },
    [tasks]
  );

  const removeTask = async (id: string) => {
    try {
      const response = await deleteTask(id);
      if (response) {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      }
    } catch (error: any) {
      console.error(`Error deleting the task: ${error.message}`);
    }
  };

  const value = useMemo(
    () => ({
      tasks,
      currentPage,
      totalPages,
      fetchTasks,
      addTask,
      toggleTask,
      removeTask,
    }),
    [addTask, currentPage, tasks, toggleTask, totalPages]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export { TaskContext, TaskProvider };

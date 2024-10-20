import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_BASE_URL}/api`;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

const getTasks = async (search: string, status: string) => {
  const response = await axiosInstance.get("/tasks", {
    params: { search, status },
  });

  return response.data;
};

const createTask = async (title: string) => {
  const response = await axiosInstance.post("/tasks", { title });
  return response.data;
};

const updateTask = async (id: string, completed: boolean) => {
  const response = await axiosInstance.put(`/tasks/${id}`, { completed });
  return response.data;
};

const deleteTask = async (id: string) => {
  const response = await axiosInstance.delete(`/tasks/${id}`);
  return response.data;
};

export { getTasks, createTask, updateTask, deleteTask };

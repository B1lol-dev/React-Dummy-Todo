import axios from "axios";
import { API_URL } from "../constants/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const loginUser = async (username: string, password: string) => {
  const response = await api.post("/auth/login", { username, password });
  return response.data;
};

export const getAllTodos = async () => {
  const response = await api.get("/todos");
  return response.data;
};

export const getUserTodos = async (userId: number) => {
  const response = await api.get(`/users/${userId}/todos`);
  return response.data;
};

export const addTodo = async (todo: {
  userId: number;
  todo: string;
  completed: boolean;
}) => {
  const response = await api.post("/todos/add", todo);
  return response.data;
};

export const updateTodo = async (
  id: number,
  todo: Partial<{ todo: string; completed: boolean }>
) => {
  const response = await api.put(`/todos/${id}`, todo);
  return response.data;
};

export const deleteTodo = async (id: number) => {
  const response = await api.delete(`/todos/${id}`);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const getUser = async (id: number) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const addUser = async (user: any) => {
  const response = await api.post("/users/add", user);
  return response.data;
};

export const updateUser = async (id: number, user: any) => {
  const response = await api.put(`/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

export default api;

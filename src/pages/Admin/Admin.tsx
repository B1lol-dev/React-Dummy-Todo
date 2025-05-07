import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../constants/api";

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}

function TodosAdmin() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/todos`)
      .then((response) => setTodos(response.data.todos || []))
      .catch((error) => console.error("Error:", error));
  }, []);

  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to delete todo");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Todos</h2>
      <div className="space-y-2">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex justify-between items-center p-4 bg-white rounded shadow"
          >
            <span className={todo.completed ? "line-through" : ""}>
              {todo.todo}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function UsersAdmin() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/users")
      .then((response) => setUsers(response.data.users || []))
      .catch((error) => console.error("Error:", error));
  }, []);

  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`https://dummyjson.com/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to delete user");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>
      <div className="space-y-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex justify-between items-center p-4 bg-white rounded shadow"
          >
            <div>
              <p className="font-medium">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <button
              onClick={() => deleteUser(user.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Admin() {
  const navigate = useNavigate();

  if (!localStorage.getItem("adminToken")) {
    navigate("/login");
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white p-4 rounded shadow mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Link to="/" className="text-blue-500 hover:text-blue-700">
            Back to Home
          </Link>
        </div>
        <nav className="mt-4 space-x-4">
          <Link to="/admin/todos" className="text-blue-500 hover:text-blue-700">
            Todos
          </Link>
          <Link to="/admin/users" className="text-blue-500 hover:text-blue-700">
            Users
          </Link>
        </nav>
      </div>

      <Routes>
        <Route path="todos" element={<TodosAdmin />} />
        <Route path="users" element={<UsersAdmin />} />
      </Routes>
    </div>
  );
}

export default Admin;

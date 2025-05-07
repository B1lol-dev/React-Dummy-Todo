import { Routes, Route, Link, useNavigate } from "react-router-dom";
import TodosAdmin from "./tabs/TodosAdmin";
import UsersAdmin from "./tabs/UsersAdmin";

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

import { useState, useEffect } from "react";
import {
  getAllTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../../../utils/api";
import TodoCard from "../../../components/common/TodoCard";
import TodoForm from "../../../components/common/TodoForm";
import { useAuth } from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { Loader2, Search, Filter, RefreshCw } from "lucide-react";

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

const TodosAdmin = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "completed" | "active"
  >("all");
  const { user } = useAuth();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const data = await getAllTodos();
      setTodos(data.todos || []);
    } catch (error) {
      console.error("Error fetching todos:", error);
      toast.error("Failed to load todos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTodo = async (todoText: string) => {
    if (!user) return;

    try {
      const newTodo = {
        todo: todoText,
        completed: false,
        userId: user.id,
      };

      const response = await addTodo(newTodo);
      setTodos((prevTodos) => [response, ...prevTodos]);
      toast.success("Todo added successfully!");
    } catch (error) {
      console.error("Error adding todo:", error);
      toast.error("Failed to add todo");
    }
  };

  //   const handleToggleComplete = async (id: number, completed: boolean) => {
  //     try {
  //       await updateTodo(id, { completed });
  //       setTodos((prevTodos) =>
  //         prevTodos.map((todo) =>
  //           todo.id === id ? { ...todo, completed } : todo
  //         )
  //       );
  //     } catch (error) {
  //       console.error("Error updating todo:", error);
  //       toast.error("Failed to update todo status");
  //     }
  //   };

  const handleEditTodo = async (id: number, text: string) => {
    try {
      await updateTodo(id, { todo: text });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, todo: text } : todo
        )
      );
      toast.success("Todo updated successfully!");
    } catch (error) {
      console.error("Error updating todo:", error);
      toast.error("Failed to update todo");
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      toast.success("Todo deleted successfully!");
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast.error("Failed to delete todo");
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Manage Todos</h1>
        <p className="text-gray-600">
          Create, edit, and manage todos for all users.
        </p>
      </div>

      <TodoForm onAddTodo={handleAddTodo} isLoading={isLoading} />

      <div className="mb-4 flex flex-col md:flex-row gap-3 justify-between">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search todos..."
            className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="flex gap-2">
          <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-md pl-3">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(
                  e.target.value as "all" | "completed" | "active"
                )
              }
              className="p-2 bg-transparent focus:outline-none text-gray-700"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <button
            onClick={fetchTodos}
            className="p-2 flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
          <span className="ml-2 text-gray-600">Loading todos...</span>
        </div>
      ) : todos.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 text-center">
          <p className="text-gray-600">No todos found.</p>
          {searchTerm && (
            <p className="text-gray-500 mt-2">
              Try adjusting your search or filters.
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {todos.map((todo: any) => (
            <TodoCard
              id={todo.id}
              key={todo.id}
              todo={todo.todo}
              completed={todo.completed}
              onToggle={() => {}}
              onDelete={handleDeleteTodo}
              onEdit={handleEditTodo}
            />
          ))}
        </div>
      )}

      <div className="mt-4 text-sm text-gray-500">
        Showing {todos.length} of {todos.length} todos
      </div>
    </div>
  );
};

export default TodosAdmin;

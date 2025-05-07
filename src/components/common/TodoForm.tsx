import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

interface TodoFormProps {
  onAddTodo: (todo: string) => Promise<void>;
  isLoading?: boolean;
}

const TodoForm = ({ onAddTodo, isLoading = false }: TodoFormProps) => {
  const [todoText, setTodoText] = useState("");
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (todoText.trim()) {
      try {
        await onAddTodo(todoText.trim());
        setTodoText("");
      } catch (error) {
        console.error("Failed to add todo:", error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 bg-white p-4 border border-gray-200 rounded-lg shadow-sm"
    >
      <div className="flex flex-col">
        <div className="mb-2">
          <label
            htmlFor="todo-text"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            New Todo
          </label>
          <div className="flex items-center gap-2">
            <input
              id="todo-text"
              type="text"
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
              placeholder={
                user ? "What needs to be done?" : "Login to add todos"
              }
              disabled={!user || isLoading}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-500"
            />
            <button
              type="submit"
              disabled={!user || !todoText.trim() || isLoading}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Add
            </button>
          </div>
        </div>

        {!user && (
          <p className="text-sm text-gray-500 mt-1">
            Please{" "}
            <a href="/login" className="text-indigo-600 hover:text-indigo-800">
              login
            </a>{" "}
            to add new todos.
          </p>
        )}
      </div>
    </form>
  );
};

export default TodoForm;

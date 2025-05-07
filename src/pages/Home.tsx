import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../constants/api";
import Header from "../components/Header";
import Container from "../components/helpers/Container";
import TodoCard from "../components/common/TodoCard";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  const { isAuthenticated, user } = useAuth();

  const toggleTodo = (id: number | string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number | string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    if (!isAuthenticated()) {
      return null;
    }

    try {
      const response = await axios.get(`${API_URL}/todos`);
      const filtredTodos = response.data.todos.filter(
        (todo: Todo) => todo.userId == user.id
      );
      setTodos(filtredTodos || []);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleAddTodo = async (e: any) => {
    e.preventDefault();
    if (!token) {
      alert("Please login to add todos");
      return;
    }

    if (!newTodo) {
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/todos/add`, {
        todo: newTodo,
        completed: false,
        userId: 1,
      });
      setTodos([response.data, ...todos]);
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
      alert("Failed to add todo");
    }
  };

  return (
    <>
      <Header />
      <main className="py-10">
        <section>
          {token && (
            <Container>
              <form onSubmit={handleAddTodo} className="mb-8">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new todo"
                    className="flex-1 p-2 border rounded"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Add Todo
                  </button>
                </div>
              </form>
            </Container>
          )}
        </section>

        {isAuthenticated() ? (
          <section>
            {isLoading ? (
              <Container>
                <p>Loading...</p>
              </Container>
            ) : (
              <Container>
                <div className="space-y-2">
                  {todos.map((todo) => (
                    <TodoCard
                      id={todo.id}
                      key={todo.id}
                      todo={todo.todo}
                      completed={todo.completed}
                      onToggle={toggleTodo}
                      onDelete={deleteTodo}
                    />
                  ))}
                </div>
              </Container>
            )}
          </section>
        ) : (
          <Container>
            <div className="min-h-[80vh] flex w-full items-center justify-center flex-col gap-10">
              <h1 className="text-3xl font-semibold">
                Please Login to see your todos
              </h1>
              <Link to={"/login"}>
                <button
                  type="button"
                  className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 px-15"
                >
                  Login
                </button>
              </Link>
            </div>
          </Container>
        )}
      </main>
    </>
  );
}

export default Home;

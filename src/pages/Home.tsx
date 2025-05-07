import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../constants/api";
import Header from "../components/Header";
import Container from "../components/helpers/Container";

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

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const response = await axios.get(`${API_URL}/todos`);
      setTodos(response.data.todos || []);
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

    try {
      const response = await axios.post("https://dummyjson.com/todos/add", {
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
      <main className="mt-10">
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

        <section>
          {isLoading ? (
            <Container>
              <p>Loading...</p>
            </Container>
          ) : (
            <Container>
              <div className="space-y-2">
                {todos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`p-4 rounded shadow bg-white ${
                      todo.completed ? "opacity-75" : ""
                    }`}
                  >
                    <p className={todo.completed ? "line-through" : ""}>
                      {todo.todo}
                    </p>
                  </div>
                ))}
              </div>
            </Container>
          )}
        </section>
      </main>
    </>
  );
}

export default Home;

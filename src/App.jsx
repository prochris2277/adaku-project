import { useEffect, useState } from "react";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import { Pencil, Trash2 } from "lucide-react";

const App = () => {
  const [newTask, setNewTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingTask, setEditingTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [theme, setTheme] = useState("light");
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getTasks = async () => {
      const response = await fetch(`${API_URL}/api/v1/tasks`);
      const data = await response.json();

      setTodos(data.data.tasks);
    };

    getTasks();
  }, []);

  // CRUD - Create, Read, Update, Delete

  const handleCreateTask = async (e) => {
    e.preventDefault();

    const trimmedTask = newTask.trim();

    if (trimmedTask === "") return;

    try {
      const response = await fetch(`${API_URL}/api/v1/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: trimmedTask,
          description: "",
          status: "pending",
          dueDate: "",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      const data = await response.json();

      setTodos([...todos, data.data.task]);
      setNewTask("");
    } catch (error) {
      console.error("Create task error:", error);
      alert("Could not create task. Please try again.");
    }
  };



  const handleToggleCompleted = async (id) => {
    const todo = todos.find((todo) => todo.id === id);

    const newStatus = todo.status === "completed" ? "pending" : "completed";

    try {
      const response = await fetch(`${API_URL}/api/v1/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task status");
      }

      const data = await response.json();

      setTodos(todos.map((todo) => (todo.id === id ? data.data.task : todo)));
    } catch (error) {
      console.error("Toggle task error:", error);
      alert("Could not update task. Please try again.");
    }
  };


  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/tasks/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      console.log("Deleted task:", data);

      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Delete task error:", error);
      alert("Could not delete task. Please try again.");
    }
  };


  const handleSave = async () => {
    const trimmedTask = editingTask.trim();

    if (trimmedTask === "") return;

    try {
      const response = await fetch(`${API_URL}/api/v1/tasks/${editingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: trimmedTask,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const data = await response.json();

      setTodos(
        todos.map((todo) => (todo.id === editingId ? data.data.task : todo)),
      );

      setEditingId(null);
      setEditingTask("");
    } catch (error) {
      console.error("Update task error:", error);
      alert("Could not update task. Please try again.");
    }
  };

  
  const handleEdit = (todo) => {
    setEditingId(todo.id);
    setEditingTask(todo.title);
  };

  return (
    <div className={theme}>
      <div className="min-h-screen bg-gray-100 px-4 py-10  dark:bg-gray-900 ">
        <div className="w-full max-w-lg mx-auto dark:text-gray-500">
          <Header theme={theme} setTheme={setTheme} />

          {/* Task Creator Form */}
          <TodoForm
            handleCreateTask={handleCreateTask}
            task={newTask}
            setTask={setNewTask}
          />

          {todos.length === 0 ? (
            <p className="text-center text-gray-500">No tasks yet.</p>
          ) : (
            <ul className="flex flex-col gap-2 mb-8">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="group flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 hover:border-gray-300 hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:border-gray-600"
                >
                  {editingId === todo.id ? (
                    <>
                      <input
                        value={editingTask}
                        onChange={(e) => setEditingTask(e.target.value)}
                        className="flex-1 rounded border px-2 py-1"
                      />

                      <button onClick={handleSave} className="text-green-600">
                        Save
                      </button>

                      <button
                        onClick={() => {
                          setEditingId(null);
                          setEditingTask("");
                        }}
                        className="text-red-500"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <input
                        type="checkbox"
                        checked={todo.status === "completed"}
                        onChange={() => handleToggleCompleted(todo.id)}
                        className="h-5 w-5 cursor-pointer rounded border-gray-300"
                      />

                      <span
                        className={`flex-1 text-gray-800 dark:text-gray-400 ${
                          todo.status === "completed" ? "line-through" : ""
                        }`}
                      >
                        {todo.title}
                      </span>

                      <button
                        onClick={() => handleEdit(todo)}
                        className="rounded p-1.5 text-gray-500 opacity-70 hover:bg-gray-100 group-hover:opacity-100"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(todo.id)}
                        className="rounded p-1.5 text-red-500 opacity-70 hover:bg-red-50 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

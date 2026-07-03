import { useState } from "react";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import { Pencil, Trash2 } from "lucide-react";


const App = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [theme, setTheme] = useState("light")

  console.log(todos);

  // console.log(todos);

  // CRUD - Create, Read, Update, Delete

  const handleCreateTask = (e) => {
    e.preventDefault();

    const trimmedTask = task.trim();
    if (trimmedTask === "") return;

    setTodos([
      ...todos,
      { id: Date.now(), text: trimmedTask, completed: false },
    ]);

    setTask("");
  };

  const handleToggleCompleted = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
   <div className={theme}>
       <div className="min-h-screen bg-gray-100 px-4 py-10  dark:bg-gray-900 ">
      <div className="w-full max-w-lg mx-auto dark:text-gray-500">
        <Header 
        theme={theme}
        setTheme={setTheme}       />
        
        

        {/* Task Creator Form */}
        <TodoForm
          handleCreateTask={handleCreateTask}
          task={task}
          setTask={setTask}
        />

        {todos.length === 0 ? (
          <p className="text-center text-gray-500">No tasks yet.</p>
        ) : (
          <ul className="flex flex-col gap-2 mb-8">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="group flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 hover:border-gray-300 hover:bg-gray-50 dark:bg-gray-900  dark:hover:bg-gray-700 dark:border-gray-600 hover:border-gray-600"
              >
                <input
                  type="checkbox"
                  onChange={() => handleToggleCompleted(todo.id)}
                  className="h-5 w-5 cursor-pointer rounded border-gray-300"
                />
                <span
                  className={`flex-1 text-gray-800 dark:text-gray-400 ${todo.completed ? "line-through" : ""}`}
                >
                  {todo.text}
                </span>
                <button className="rounded p-1.5 text-gray-500 opacity-70  hover:bg-gray-100 :   group-hover:opacity-100 dark:hover:bg-gray-300">
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="rounded p-1.5 text-red-500 opacity-70 hover:bg-red-50 group-hover:opacity-100 dark:hover:bg-gray-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
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

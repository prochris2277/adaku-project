import { Plus } from "lucide-react";

const TodoForm = ({ handleCreateTask, task, setTask }) => {
  return (
    <form onSubmit={handleCreateTask} className="flex gap-3 mb-6">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter tasks"
        className="flex-1 border border-gray-300 bg-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 dark:bg-gray-900 dark:border-gray-500 "
      />

      <button
        disabled={task.trim() === ""}
        className="group flex items-center justify-center rounded-lg bg-blue-600 text-white px-5 py-2.5 cursor-pointer hover:bg-blue-800 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:dark:bg-gray-600"
      >
        <Plus className="w-5 h-5" />
      </button>
    </form>
  );
};

export default TodoForm;

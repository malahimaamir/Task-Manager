import { useState } from "react";
import {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from "./services/taskApi";
import { Check, Plus, Trash2 } from "lucide-react";

export default function App() {
  const { data: tasks, isLoading, error } = useGetTasksQuery();
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTask = async () => {
    if (!title.trim()) return;
    await createTask({ title, description, status: "pending" });
    setTitle("");
    setDescription("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-10 tracking-tight text-white drop-shadow-lg">
        Task Manager
      </h1>

      <div className="bg-white text-gray-800 shadow-2xl rounded-xl p-6 mb-12 w-full max-w-lg transition-all duration-300">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
          rows={4}
        />
        <button
          onClick={handleAddTask}
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add Task
        </button>
      </div>

      <div className="w-full max-w-lg space-y-5">
        {isLoading && (
          <p className="text-gray-300 text-center animate-pulse">
            Loading tasks...
          </p>
        )}
        {error && (
          <p className="text-red-400 text-center">Error fetching tasks</p>
        )}

        {tasks?.map((task) => (
          <div
            key={task._id}
            className="bg-white text-gray-800 rounded-xl shadow-lg p-5 flex justify-between items-start hover:shadow-xl transition"
          >
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                {task.title}
              </h2>
              <p className="text-sm text-gray-600 mb-2">{task.description}</p>
              <span className="inline-block text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">
                Status: {task.status}
              </span>
            </div>
            <div className="flex flex-col gap-2 ml-4">
              <button
                onClick={() =>
                  updateTask({ id: task._id!, task: { status: "completed" } })
                }
                className="bg-green-500 text-white px-3 py-1 rounded-md text-xs hover:bg-green-600 transition flex items-center gap-1"
              >
                <Check className="w-4 h-4" /> Done
              </button>
              <button
                onClick={() => deleteTask(task._id!)}
                className="bg-red-500 text-white px-3 py-1 rounded-md text-xs hover:bg-red-600 transition flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
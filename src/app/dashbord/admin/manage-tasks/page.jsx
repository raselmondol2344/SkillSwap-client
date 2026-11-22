"use client";
import { useEffect, useState } from "react";
import DeleteTaskModalAdmin from "@/app/component/DeleteTaskModalAdmin";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function ManageTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);

  // Fetch All Tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/tasks`);
        const data = await res.json();

        if (res.ok) {
          setTasks(data);
        }
      } catch (error) {
       // console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Delete Task
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${BACKEND_URL}/task/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== id)
        );

        setSelectedTask(null);
      } else {
        alert(data.message);
      }
    } catch (error) {
      //console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center p-5 text-sm text-slate-600">
        Loading tasks...
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 p-3 sm:p-5 lg:p-6">

      {/* Header */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 sm:mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800 sm:text-2xl">
            Manage Tasks
          </h2>

          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Manage all posted tasks
          </p>
        </div>

        <span className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 sm:text-sm">
          Total Tasks: {tasks.length}
        </span>
      </div>

      {/* Mobile, sm & md Cards */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:hidden">

        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <div
              key={task._id}
              className="min-w-0 rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm transition hover:shadow-md sm:p-4"
            >
              <p className="text-[10px] text-slate-400 sm:text-xs">
                Task #{index + 1}
              </p>

              <h3 className="mt-2 line-clamp-2 break-words text-xs font-semibold text-slate-800 sm:text-base">
                {task.title}
              </h3>

              <div className="mt-3 space-y-2">

                <div>
                  <p className="text-[10px] text-slate-400 sm:text-xs">
                    Client
                  </p>

                  <p className="break-words text-[11px] font-medium text-slate-700 sm:text-sm">
                    {task.client_name}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-slate-400 sm:text-xs">
                    Status
                  </p>

                  <span className="mt-1 inline-block max-w-full break-words rounded-full bg-blue-100 px-2 py-1 text-[10px] font-medium capitalize text-blue-700 sm:text-xs">
                    {task.status?.replace("-", " ") || "Unknown"}
                  </span>
                </div>

                <div>
                  <p className="text-[10px] text-slate-400 sm:text-xs">
                    Price
                  </p>

                  <p className="text-xs font-semibold text-slate-800 sm:text-sm">
                    ${task.budget}
                  </p>
                </div>

              </div>

              <div className="mt-3 border-t border-slate-100 pt-3">
                <button
                  onClick={() => setSelectedTask(task)}
                  className="w-full rounded-lg bg-red-500 px-2 py-2 text-[10px] font-medium text-white transition hover:bg-red-600 active:scale-95 sm:px-4 sm:py-2.5 sm:text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 rounded-xl border border-slate-200 bg-white py-10 text-center text-sm text-slate-500">
            No tasks found
          </div>
        )}

      </div>

      {/* lg & xl Table */}
      <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:block">

        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">

            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-4 text-sm font-semibold text-slate-700 lg:px-5">
                  #
                </th>

                <th className="px-4 py-4 text-sm font-semibold text-slate-700 lg:px-5">
                  Title
                </th>

                <th className="px-4 py-4 text-sm font-semibold text-slate-700 lg:px-5">
                  Client Name
                </th>

                <th className="px-4 py-4 text-sm font-semibold text-slate-700 lg:px-5">
                  Status
                </th>

                <th className="px-4 py-4 text-sm font-semibold text-slate-700 lg:px-5">
                  Price
                </th>

                <th className="px-4 py-4 text-sm font-semibold text-slate-700 lg:px-5">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <tr
                    key={task._id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-4 py-4 text-sm text-slate-600 lg:px-5">
                      {index + 1}
                    </td>

                    <td className="max-w-[220px] break-words px-4 py-4 text-sm font-medium text-slate-800 lg:px-5">
                      {task.title}
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-600 lg:px-5">
                      {task.client_name}
                    </td>

                    <td className="px-4 py-4 lg:px-5">
                      <span className="inline-block whitespace-nowrap rounded-full bg-blue-100 px-3 py-1 text-xs font-medium capitalize text-blue-700">
                        {task.status?.replace("-", " ") || "Unknown"}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-slate-800 lg:px-5">
                      ${task.budget}
                    </td>

                    <td className="px-4 py-4 lg:px-5">
                      <button
                        onClick={() => setSelectedTask(task)}
                        className="whitespace-nowrap rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 active:scale-95"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-5 py-10 text-center text-sm text-slate-500"
                  >
                    No tasks found
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteTaskModalAdmin
        task={selectedTask}
        onDelete={handleDelete}
        onClose={() => setSelectedTask(null)}
      />

    </div>
  );
}

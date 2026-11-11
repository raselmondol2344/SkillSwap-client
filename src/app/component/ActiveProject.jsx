
"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

const BACKEND_URL = "http://localhost:8000";

export default function ActiveProject() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [deliveryLink, setDeliveryLink] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Get freelancer projects
  useEffect(() => {
    if (!user?.id) return;

    const getProjects = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${BACKEND_URL}/freelancer/active-projects/${user.id}`
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message);
        }

        setTasks(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getProjects();
  }, [user?.id]);

  // Submit delivery link
  const handleDelivery = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const res = await fetch(
        `${BACKEND_URL}/task/${selectedTask._id}/delivery`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            deliveryLink,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      alert("Delivery submitted successfully!");

      setSelectedTask(null);
      setDeliveryLink("");

      // Update local task data
      setTasks((prev) =>
        prev.map((task) =>
          task._id === selectedTask._id
            ? {
                ...task,
                deliveries: {
                  ...task.deliveries,
                  [user.id]: {
                    link: deliveryLink,
                  },
                },
              }
            : task
        )
      );

    } catch (error) {
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading projects...</div>;
  }

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Active Projects
        </h2>
        <p className="text-gray-500 mt-1">
          Manage your ongoing and completed projects.
        </p>
      </div>

      {tasks.length === 0 ? (
        <div className="bg-white border rounded-xl p-10 text-center">
          <h3 className="font-semibold text-lg">
            No Projects Found
          </h3>
          <p className="text-gray-500 mt-2">
            You do not have any active or completed projects.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {tasks.map((task) => {
            const delivery = task.deliveries?.[user.id];

            return (
              <div
                key={task._id}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
              >
                <div className="flex justify-between items-start gap-3 mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    {task.title}
                  </h3>

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap ${
                      task.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {task.status === "completed"
                      ? "Completed"
                      : "In Progress"}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <span className="font-medium text-gray-800">
                      Client:
                    </span>{" "}
                    {task.client_name}
                  </p>

                  <p>
                    <span className="font-medium text-gray-800">
                      Category:
                    </span>{" "}
                    {task.category}
                  </p>

                  <p>
                    <span className="font-medium text-gray-800">
                      Budget:
                    </span>{" "}
                    ${task.budget}
                  </p>

                  <p>
                    <span className="font-medium text-gray-800">
                      Deadline:
                    </span>{" "}
                    {task.deadline}
                  </p>
                </div>

                <div className="border-t mt-5 pt-4">
                  {delivery?.link ? (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-green-700">
                        Delivery Submitted
                      </p>

                      <a
                        href={delivery.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm underline break-all"
                      >
                        View Delivery
                      </a>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedTask(task);
                        setDeliveryLink("");
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium"
                    >
                      Delivery
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delivery Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-xl p-6">
            <h3 className="text-xl font-bold mb-2">
              Submit Delivery
            </h3>

            <p className="text-gray-500 text-sm mb-5">
              {selectedTask.title}
            </p>

            <form onSubmit={handleDelivery}>
              <label className="block text-sm font-medium mb-2">
                Delivery Link
              </label>

              <input
                type="url"
                required
                value={deliveryLink}
                onChange={(e) =>
                  setDeliveryLink(e.target.value)
                }
                placeholder="https://example.com/project"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:border-blue-500"
              />

              <div className="flex justify-end gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => setSelectedTask(null)}
                  className="border px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

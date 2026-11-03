
"use client";

import { useState } from "react";
import { Table, Button } from "@heroui/react";
import { EditTaskModal } from "./EditTaskModal";
import { DeleteTaskAlert } from "./DeleteTaskAlert";

export default function ClientTaskTable({ data }) {
  const [tasks, setTasks] = useState(data || []);


  const handleDelete = (id) => {
  setTasks((prev) => prev.filter((item) => item._id !== id));
};

  // Empty tasks
  if (!tasks || tasks.length === 0) {
    return (
      <div className="w-full px-2 sm:px-0">
        <div className="flex min-h-[250px] flex-col items-center justify-center rounded-2xl border border-blue-100 bg-white px-5 text-center shadow-sm sm:min-h-[300px]">
          <h3 className="text-lg font-semibold text-gray-800 sm:text-xl">
            No Tasks Found
          </h3>

          <p className="mt-2 max-w-md text-xs text-gray-500 sm:text-sm">
            You have not added any task yet.
          </p>
        </div>
      </div>
    );
  }

  // Update task in state
  const handleUpdate = (updatedTask) => {
    setTasks((prev) =>
      prev.map((item) =>
        item._id === updatedTask._id ? updatedTask : item
      )
    );
  };

  return (
    <div className="w-full min-w-0">

      {/* Mobile Layout */}
      <div className="grid grid-cols-1 gap-3 sm:hidden">
        {tasks.map((item) => (
          <div
            key={item._id}
            className="w-full min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <h3 className="break-words text-sm font-semibold leading-6 text-gray-800">
              {item.title}
            </h3>

            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="text-xs font-medium text-gray-500">
                Status
              </span>

              <span
                className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                  item.status === "open"
                    ? "bg-blue-100 text-blue-700"
                    : item.status === "in-progress"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                }`}
              >
                {item.status}
              </span>
            </div>

            <div className="mt-4 border-t border-gray-100 pt-3">
              {item.status === "open" && (
                <div className="flex gap-2">
                  <EditTaskModal
                    task={item}
                    onUpdate={handleUpdate}
                  />

                  <DeleteTaskAlert task={item} onDelete={handleDelete} />
                </div>
              )}

              {item.status === "in-progress" && (
                <span className="text-xs text-red-400">
                  No action
                </span>
              )}

              {item.status === "completed" && (
                <span className="text-xs text-red-400">
                  No action
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Tablet and Desktop Layout */}
      <div className="hidden w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm sm:block sm:rounded-2xl">
        <Table>
          <Table.ScrollContainer>
            <Table.Content
              aria-label="My Tasks"
              className="w-full min-w-[550px]"
            >
              <Table.Header className="bg-gray-50">
                <Table.Column
                  isRowHeader
                  className="px-4 py-4 text-xs font-semibold text-gray-600 md:text-sm lg:px-6"
                >
                  Task Name
                </Table.Column>

                <Table.Column className="px-4 py-4 text-xs font-semibold text-gray-600 md:text-sm lg:px-6">
                  Status
                </Table.Column>

                <Table.Column className="px-4 py-4 text-xs font-semibold text-gray-600 md:text-sm lg:px-6">
                  Action
                </Table.Column>
              </Table.Header>

              <Table.Body>
                {tasks.map((item) => (
                  <Table.Row
                    key={item._id}
                    className="border-b border-gray-100 transition-colors last:border-b-0 hover:bg-blue-50/40"
                  >
                    <Table.Cell className="max-w-[300px] px-4 py-4 lg:px-6">
                      <span className="break-words text-sm font-semibold text-gray-800 lg:text-base">
                        {item.title}
                      </span>
                    </Table.Cell>

                    <Table.Cell className="px-4 py-4 lg:px-6">
                      <span
                        className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                          item.status === "open"
                            ? "bg-blue-100 text-blue-700"
                            : item.status === "in-progress"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </Table.Cell>

                    <Table.Cell className="px-4 py-4 lg:px-6">
                      {item.status === "open" && (
                        <div className="flex flex-wrap items-center gap-2">
                          <EditTaskModal
                            task={item}
                            onUpdate={handleUpdate}
                          />

                         <DeleteTaskAlert task={item} onDelete={handleDelete} />
                        </div>
                      )}

                      {item.status === "in-progress" && (
                        <span className="text-sm text-red-400">
                          No action
                        </span>
                      )}

                      {item.status === "completed" && (
                        <span className="text-sm text-red-400">
                          No action
                        </span>
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>
    </div>
  );
}

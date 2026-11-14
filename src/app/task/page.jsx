
import { Suspense } from "react";
import TaskList from "../component/TaskList";

export default function TaskPage({ searchParams }) {
  return (
    <div className="p-5 mx-auto max-w-7xl">
      <h1 className="text-2xl font-bold mb-5">Task List</h1>

      <Suspense
        fallback={
          <div className="text-center py-10">
            Loading tasks...
          </div>
        }
      >
        <TaskList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

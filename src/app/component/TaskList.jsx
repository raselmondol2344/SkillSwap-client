import { getTask } from "@/lib/action";
import TaskCard from "../component/TaskCard";
import TaskPagination from "./TaskPagination";

export default async function TaskList({ searchParams }) {
  const searchQuery = await searchParams;

  const page = Number(searchQuery.page) || 1;
  const limit = 8;

  const tasks = await getTask(page, limit);

  return (
    <div>

      {/* Task Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {tasks.data?.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-end">
        <TaskPagination
          page={tasks.page}
          total_page={tasks.total_page}
        />
      </div>

    </div>
  );
}

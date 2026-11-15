import { getTask } from "@/lib/action";
import TaskCard from "../component/TaskCard";
import TaskPagination from "./TaskPagination";
import { Input } from "@heroui/react";
import { Button } from "@heroui/react";
import { FaSearch } from "react-icons/fa";


export default async function TaskList({ searchParams }) {
  const searchQuery = await searchParams;

  const page = Number(searchQuery.page) || 1;
  const limit = 8;

  const tasks = await getTask(page, limit,searchQuery);

  return (
    <div>
    {/* serch input fild */}
    <div className="max-w-md mx-auto my-8 px-4">
  <form action="/task" className="flex gap-2">
    <Input
      name="search"
      placeholder="Search task..."
      className="flex-1"
    />

    <Button type="submit" className="bg-blue-600 text-white">
      <FaSearch />
    </Button>
  </form>
</div>

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

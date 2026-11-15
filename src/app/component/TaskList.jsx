
import { getTask } from "@/lib/action";
import TaskCard from "../component/TaskCard";
import TaskPagination from "./TaskPagination";
import CategoryFilter from "./CategoryFilter";
import { FaSearch } from "react-icons/fa";
import { Button, Input } from "@heroui/react";

export default async function TaskList({ searchParams }) {
  const searchQuery = await searchParams;

  const page = Number(searchQuery.page) || 1;
  const limit = 8;

  const tasks = await getTask(page, limit, searchQuery);

  return (
    <div className="w-full">

      {/* Filter and Search */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        {/* Category Filter */}
        <div className="w-full lg:flex-1 overflow-x-auto">
          <CategoryFilter
            selectedCategory={searchQuery.category || "all"}
          />
        </div>

        {/* Search Input */}
        <div className="w-full lg:max-w-sm">
          <form action="/task" className="flex items-center gap-2">
            <Input
              name="search"
              placeholder="Search task..."
              defaultValue={searchQuery.search || ""}
              className="flex-1 min-w-0"
            />

            <Button
              type="submit"
              className="bg-blue-600 text-white min-w-11"
            >
              <FaSearch />
            </Button>
          </form>
        </div>

      </div>

      {/* Task Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {tasks.data?.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>

      {/* No Task Found */}
      {tasks.data?.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold text-gray-700">
            No Tasks Found!
          </h3>
          <p className="text-gray-500 mt-2">
            Try another search or category.
          </p>
        </div>
      )}

      {/* Pagination */}
      <div className="mt-8 flex justify-center sm:justify-end">
        <TaskPagination
          page={tasks.page}
          total_page={tasks.total_page}
        />
      </div>

    </div>
  );
}

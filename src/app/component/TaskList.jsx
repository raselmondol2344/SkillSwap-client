import { getTask } from "@/lib/action";
import TaskCard from "../component/TaskCard";

export default async function TaskList() {
  const tasks = await getTask();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {tasks?.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
}
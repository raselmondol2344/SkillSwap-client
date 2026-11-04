import { Suspense } from "react";
import TaskList from "@/app/component/TaskList";

export default function FreelancerBrowseTaskPage() {
  return (
    <div className="p-5 mx-auto max-w-7xl">
      <h1 className="text-2xl font-bold mb-5">Task List</h1>
      
    
      <Suspense fallback={<div className="text-center py-10">Loading tasks...</div>}>
        <TaskList />
      </Suspense>
    </div>
  );
}
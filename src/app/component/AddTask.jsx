"use client"
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function AddTask() {
  const { data: session } = authClient.useSession();
    const user = session?.user;

     const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

                  const task = Object.fromEntries(formData.entries());

                  const taskData = {
                    ...task,
                    client_name: user?.name,
                    client_id: user?.id,
                  };

                  console.log(taskData);


  
      const res = await fetch("http://localhost:8000/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      const data = await res.json();

     
      if(res.ok){
        toast.success("A Task Added")
      }
      else{
        toast.error("Task not be added")
      }
    
   
  };



  return (
    <div>
      <form onSubmit={handleSubmit} className="mx-auto w-full max-w-3xl rounded-2xl border border-blue-100 bg-white p-3 shadow-sm sm:p-4 md:p-5">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl">
            Add a New <span className="text-blue-600">Task</span>
          </h2>

          <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
            Create a task and find the right freelancer for your project.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Task Title
            </label>

            <input
              id="title"
              type="text"
              name="title"
              placeholder="Build a Responsive Business Website"
              className="w-full rounded-lg border border-blue-100 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:px-4 sm:py-3"
            />
          </div>

          {/* Category + Budget */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4">
            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Category
              </label>

              <select
                id="category"
                name="category"
                className="w-full rounded-lg border border-blue-100 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:px-4 sm:py-3"
              >
                <option value="">Select Category</option>
                <option value="web development">Web Development</option>
                <option value="programming">Programming</option>
                <option value="data science">Data Science</option>
                <option value="machine learning">Machine Learning</option>
                <option value="graphic design">Graphic Design</option>
              </select>
            </div>

            {/* Budget */}
            <div>
              <label
                htmlFor="budget"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Budget
              </label>

              <input
                id="budget"
                type="number"
                name="budget"
                placeholder="450"
                className="w-full rounded-lg border border-blue-100 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:px-4 sm:py-3"
              />
            </div>
          </div>

          {/* Deadline */}
          <div>
            <label
              htmlFor="deadline"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Deadline
            </label>

            <input
              id="deadline"
              type="date"
              name="deadline"
              className="w-full rounded-lg border border-blue-100 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:px-4 sm:py-3"
            />
          </div>

          {/* Details */}
          <div>
            <label
              htmlFor="details"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Task Details
            </label>

            <textarea
              id="details"
              name="details"
              rows={3}
              placeholder="Need a responsive business website with Home, About, Services, Contact, and mobile-friendly design."
              className="w-full resize-none rounded-lg border border-blue-100 bg-white px-3 py-3 text-sm leading-6 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:px-4"
            />
          </div>

          {/* Submit Button */}
          <button
          
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 active:scale-[0.99] sm:py-3.5"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}

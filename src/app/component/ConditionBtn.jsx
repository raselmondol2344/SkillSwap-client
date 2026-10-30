"use client"
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { FaArrowRight, FaBriefcase } from "react-icons/fa";

export default  function ConditionBtn() {
      const { data: session } = authClient.useSession();
    const user = session?.user;
  return (
    
           <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-9">
                {user?.role === "client" ? (
                  <Link
                    href="/post-task"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 text-white font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300"
                  >
                    <FaBriefcase />
                    Post a Task
                  </Link>
                ) : user?.role === "freelancer" ? (
                  <Link
                    href="/task"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 text-white font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300"
                  >
                    Browse Tasks
                    <FaArrowRight className="text-sm" />
                  </Link>
                ) : null}
              </div>

  )
}

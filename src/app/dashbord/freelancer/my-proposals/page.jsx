"use client";

import { useEffect, useState } from "react";
import { getMyProposals } from "@/lib/action";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function MyProposalsPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    const fetchProposals = async () => {
      try {
        const data = await getMyProposals(user.id);
        console.log("My Proposals Data:", data);
        setProposals(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="py-10 text-center text-gray-500">
        Loading proposals...
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          My Proposals
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage all the tasks you have applied for.
        </p>
      </div>

      {/* Total Proposals */}
      <div className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">
          Total Proposals
        </p>
        <h2 className="mt-2 text-3xl font-bold text-blue-600">
          {proposals.length}
        </h2>
      </div>

      {/* Applied Tasks */}
      <div className="overflow-hidden rounded-xl border border-blue-100 bg-white shadow-sm">

        <div className="border-b border-gray-100 p-5">
          <h2 className="font-semibold text-gray-800">
            Applied Tasks
          </h2>
        </div>

        {proposals.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <h3 className="text-lg font-semibold text-gray-700">
              No Proposals Found
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              You have not applied for any tasks yet.
            </p>
            <Link
              href="/task"
              className="mt-4 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Browse Tasks
            </Link>
          </div>
        ) : (
          <>
            {/* SM & MD Card Layout */}
            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3 lg:hidden">
              {proposals.map((task, index) => (
                <div
                  key={task._id}
                  className="flex flex-col justify-between rounded-xl border border-blue-100 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:shadow-md"
                >
                  <div className="space-y-3">

                    <div className="flex items-start justify-between gap-2">
                      <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600">
                        #{index + 1}
                      </span>

                      <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold capitalize text-yellow-700">
                        {task.status}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-gray-800">
                        {task.title}
                      </h3>
                      <p className="mt-1 text-xs capitalize text-gray-500">
                        {task.category}
                      </p>
                    </div>

                    <div className="space-y-2 border-t border-gray-100 pt-3">
                      <div className="flex justify-between gap-2 text-sm">
                        <span className="text-gray-500">Budget</span>
                        <span className="font-semibold text-blue-600">
                          ${task.budget}
                        </span>
                      </div>

                      <div className="flex justify-between gap-2 text-sm">
                        <span className="text-gray-500">Deadline</span>
                        <span className="font-medium text-gray-700">
                          {task.deadline}
                        </span>
                      </div>

                      <div className="flex justify-between gap-2 text-sm">
                        <span className="text-gray-500">Client</span>
                        <span className="font-medium text-gray-700">
                          {task.client_name}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/task/${task._id}`}
                    className="mt-4 block rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>

            {/* LG Table Layout */}
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[850px] text-left text-sm">

                <thead className="bg-blue-50 text-gray-600">
                  <tr>
                    <th className="px-5 py-4 font-semibold">#</th>
                    <th className="px-5 py-4 font-semibold">Task Title</th>
                    <th className="px-5 py-4 font-semibold">Category</th>
                    <th className="px-5 py-4 font-semibold">Budget</th>
                    <th className="px-5 py-4 font-semibold">Deadline</th>
                    <th className="px-5 py-4 font-semibold">Client</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 font-semibold">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {proposals.map((task, index) => (
                    <tr
                      key={task._id}
                      className="transition hover:bg-blue-50/40"
                    >
                      <td className="px-5 py-4 text-gray-500">
                        {index + 1}
                      </td>

                      <td className="px-5 py-4 font-medium text-gray-800">
                        {task.title}
                      </td>

                      <td className="px-5 py-4 capitalize text-gray-600">
                        {task.category}
                      </td>

                      <td className="px-5 py-4 font-semibold text-blue-600">
                        ${task.budget}
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {task.deadline}
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {task.client_name}
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold capitalize text-yellow-700">
                          {task.status}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <Link
                          href={`/task/${task._id}`}
                          className="font-semibold text-blue-600 hover:text-blue-800"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

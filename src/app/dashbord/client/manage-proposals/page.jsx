"use client";
import { RejectProposalAlert } from "@/app/component/RejectProposalAlert";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getManageProposals } from "@/lib/action";
import { Button } from "@heroui/react";

export default function ManageProposalsPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleReject = (taskId, freelancerId) => {
    setProposals((prev) =>
      prev.map((task) =>
        task._id === taskId
          ? {
              ...task,
              applied_freelancers: task.applied_freelancers.filter(
                (id) => id !== freelancerId,
              ),
            }
          : task,
      ),
    );
  };

  useEffect(() => {
    if (!user?.id) return;

    const fetchProposals = async () => {
      try {
        const data = await getManageProposals(user.id);
        setProposals(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, [user?.id]);

  // Each freelancer gets a separate proposal
  const proposalRows = proposals.flatMap((task) =>
    (task.applied_freelancers || []).map((freelancerId) => ({
      taskId: task._id,
      title: task.title,
      budget: task.budget,
      freelancerId,
    })),
  );

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
        <h1 className="text-2xl font-bold text-gray-800">Manage Proposals</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage freelancers who applied for your tasks.
        </p>
      </div>

      {/* Total Proposals */}
      <div className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">Total Proposals</p>

        <h2 className="mt-2 text-3xl font-bold text-blue-600">
          {proposalRows.length}
        </h2>
      </div>

      {/* Proposals */}
      <div className="overflow-hidden rounded-xl border border-blue-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-5">
          <h2 className="font-semibold text-gray-800">Freelancer Proposals</h2>
        </div>

        {proposalRows.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <h3 className="text-lg font-semibold text-gray-700">
              No Proposals Found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              No freelancers have applied for your tasks yet.
            </p>
          </div>
        ) : (
          <>
            {/* SM & MD Card Layout */}
            <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-1 md:grid-cols-2 lg:hidden">
              {proposalRows.map((proposal, index) => (
                <div
                  key={`${proposal.taskId}-${proposal.freelancerId}-${index}`}
                  className="flex flex-col justify-between space-y-4 rounded-xl border border-blue-100 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:shadow-md"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600">
                        Proposal #{index + 1}
                      </span>

                      <span className="text-sm font-semibold text-blue-600">
                        ${proposal.budget}
                      </span>
                    </div>

                    {/* Task Title */}
                    <div>
                      <p className="text-xs text-gray-500">Task Title</p>

                      <h3 className="mt-1 font-semibold text-gray-800">
                        {proposal.title}
                      </h3>
                    </div>

                    {/* Freelancer ID */}
                    <div>
                      <p className="text-xs text-gray-500">Freelancer ID</p>

                      <p className="mt-1 break-all text-sm text-gray-700">
                        {proposal.freelancerId}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 border-t border-gray-100 pt-3">
                    <form action={"/api/payment"} method="POST">
                        <input
                              type="hidden"
                              name="budget"
                              defaultValue={proposal.budget}
                            />

                            <input
                              type="hidden"
                              name="title"
                              defaultValue={proposal.title}
                            />

                            <input
                              type="hidden"
                              name="taskId"
                              defaultValue={proposal.taskId}
                            />

                            <input
                              type="hidden"
                              name="freelancerId"
                              defaultValue={proposal.freelancerId}
                            />
                      <button
                        type="button"
                        className="flex-1 rounded-lg bg-green-100 px-3 py-2 text-sm font-semibold text-green-700 hover:bg-green-200"
                      >
                        Pay
                      </button>
                    </form>

                    <RejectProposalAlert
                      taskId={proposal.taskId}
                      freelancerId={proposal.freelancerId}
                      onReject={handleReject}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* LG Table Layout */}
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full text-left text-sm">
                <thead className="bg-blue-50 text-gray-600">
                  <tr>
                    <th className="px-5 py-4 font-semibold">#</th>
                    <th className="px-5 py-4 font-semibold">Task Title</th>
                    <th className="px-5 py-4 font-semibold">Price</th>
                    <th className="px-5 py-4 font-semibold">Freelancer ID</th>
                    <th className="px-5 py-4 font-semibold">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {proposalRows.map((proposal, index) => (
                    <tr
                      key={`${proposal.taskId}-${proposal.freelancerId}-${index}`}
                      className="transition hover:bg-blue-50/40"
                    >
                      <td className="px-5 py-4 text-gray-500">{index + 1}</td>

                      <td className="px-5 py-4 font-medium text-gray-800">
                        {proposal.title}
                      </td>

                      <td className="px-5 py-4 font-semibold text-blue-600">
                        ${proposal.budget}
                      </td>

                      <td className="max-w-[220px] break-all px-5 py-4 text-gray-600">
                        {proposal.freelancerId}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <form action={"/api/payment"} method="POST">
                            <input
                              type="hidden"
                              name="budget"
                              defaultValue={proposal.budget}
                            />

                            <input
                              type="hidden"
                              name="title"
                              defaultValue={proposal.title}
                            />

                            <input
                              type="hidden"
                              name="taskId"
                              defaultValue={proposal.taskId}
                            />

                            <input
                              type="hidden"
                              name="freelancerId"
                              defaultValue={proposal.freelancerId}
                            />

                            <Button
                              type="submit"
                              className="rounded-lg bg-green-100 px-4 py-2 font-semibold text-green-700 hover:bg-green-200"
                            >
                              Pay
                            </Button>

                          </form>

                          <RejectProposalAlert
                            taskId={proposal.taskId}
                            freelancerId={proposal.freelancerId}
                            onReject={handleReject}
                          />
                        </div>
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

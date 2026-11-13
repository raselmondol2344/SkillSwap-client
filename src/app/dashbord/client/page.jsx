
"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import ClientOverviewChart from "@/app/component/ClientOverviewChart";

export default function ClientOverview() {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const [overview, setOverview] = useState({
    totalTasks: 0,
    openTasks: 0,
    inProcessTasks: 0,
    completedTasks: 0,
    totalSpent: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.id) return;

    const fetchOverview = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `http://localhost:8000/client-overview/${user.id}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch overview data");
        }

        const data = await res.json();

        setOverview(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, [user?.id]);

  const stats = [
    {
      title: "Total Tasks",
      count: overview.totalTasks,
      color: "text-blue-600",
    },
    {
      title: "Open Tasks",
      count: overview.openTasks,
      color: "text-green-600",
    },
    {
      title: "In Process",
      count: overview.inProcessTasks,
      color: "text-yellow-600",
    },
    {
      title: "Completed",
      count: overview.completedTasks,
      color: "text-purple-600",
    },
    {
      title: "Total Spent",
      count: `$${overview.totalSpent}`,
      color: "text-blue-600",
    },
  ];

  if (!user?.id) {
    return
     <div className="p-4">Loading user...</div>;
  }

  return (
   <div>
     <div className="p-4 md:p-5">
      <h2 className="text-xl font-bold text-gray-800 mb-1">
        Client Overview
      </h2>

      <p className="text-sm text-gray-500 mb-5">
        Overview of your posted tasks and expenses.
      </p>

      {error && (
        <p className="text-sm text-red-500 mb-4">{error}</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white border border-gray-200 rounded-lg p-3 md:p-4 shadow-sm"
          >
            <p className="text-xs md:text-sm text-gray-500 font-medium">
              {item.title}
            </p>

            <h3
              className={`text-xl md:text-2xl font-bold mt-2 ${item.color}`}
            >
              {loading ? "..." : item.count}
            </h3>
          </div>
        ))}
      </div>
    </div>

    <div>
      <ClientOverviewChart overview={overview} />
    </div>
   </div>
  );
}


"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import FreelancerOverviewChart from "@/app/component/FreelancerOverviewChart";

export default function FreelancerOverview() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [overview, setOverview] = useState({
    totalProposals: 0,
    inProgressTasks: 0,
    completedTasks: 0,
    totalEarnings: 0,
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
          `http://localhost:8000/freelancer-overview/${user.id}`
        );

        if (!res.ok) {
          throw new Error("Failed to load overview");
        }

        const data = await res.json();
        setOverview(data);
      } catch (error) {
        console.error(error);
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, [user?.id]);

  if (isPending || loading) {
    return (
      <div className="p-6 text-center text-slate-500">
        Loading overview...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 text-center text-red-500">
        Please login to view your overview.
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        {error}
      </div>
    );
  }

  const cards = [
    {
      title: "Total Proposals",
      value: overview.totalProposals,
      description: "Tasks you have applied for",
      color: "blue",
    },
    {
      title: "In Progress",
      value: overview.inProgressTasks,
      description: "Currently active tasks",
      color: "amber",
    },
    {
      title: "Completed Tasks",
      value: overview.completedTasks,
      description: "Successfully completed tasks",
      color: "green",
    },
    {
      title: "Total Earnings",
      value: overview.totalEarnings,
      description: "Earnings from completed tasks",
      color: "purple",
    },
  ];

  const colorStyles = {
    blue: "border-blue-500 bg-blue-50 text-blue-600",
    amber: "border-amber-500 bg-amber-50 text-amber-600",
    green: "border-green-500 bg-green-50 text-green-600",
    purple: "border-purple-500 bg-purple-50 text-purple-600",
  };

  return (
    <div>
      <div className="p-4 sm:p-5 lg:p-6">

      {/*
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-slate-800">
          Overview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Track your proposals, tasks and earnings.
        </p>
      </div> */}

      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`rounded-xl border border-slate-200 border-l-4 bg-white p-5 shadow-sm ${colorStyles[card.color]}`}
          >
            <p className="text-sm font-medium text-slate-500">
              {card.title}
            </p>

            <h3 className="mt-3 text-3xl font-bold text-slate-800">
              {card.title === "Total Earnings"
                ? Number(card.value).toLocaleString()
                : card.value} 
            </h3>

            <p className="mt-2 text-xs text-slate-500">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>

   <div> <FreelancerOverviewChart overview={overview} /></div>
    </div>
  );
}

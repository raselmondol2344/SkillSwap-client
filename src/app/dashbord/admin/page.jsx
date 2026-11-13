
"use client";

import { useEffect, useState } from "react";
import AdminOverviewChart from "@/app/component/AdminOverviewChart";

export default function AdminOverview() {
  const [overview, setOverview] = useState({
    totalUsers: 0,
    totalTasks: 0,
    totalRevenue: 0,
    activeTasks: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await fetch("http://localhost:8000/admin-overview");
        const data = await res.json();

        if (res.ok) {
          setOverview(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  const cards = [
    {
      title: "Total Users",
      value: overview.totalUsers,
    },
    {
      title: "Total Tasks",
      value: overview.totalTasks,
    },
    {
      title: "Total Revenue",
      value: overview.totalRevenue,
    },
    {
      title: "Active Tasks",
      value: overview.activeTasks,
    },
  ];

  if (loading) {
    return <div className="p-5">Loading overview...</div>;
  }

  return (
    <div className="p-3 sm:p-5">
      <h2 className="mb-5 text-2xl font-bold text-slate-800">
        Admin Overview
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-medium text-slate-500">
              {card.title}
            </p>

            <h3 className="mt-4 text-2xl font-bold text-slate-800">
              {card.title === "Total Revenue"
                ? `$${Number(card.value).toLocaleString()}`
                : card.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Recharts */}
      <AdminOverviewChart overview={overview} />
    </div>
  );
}

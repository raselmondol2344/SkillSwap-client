
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ClientOverviewChart({ overview }) {
  const chartData = [
    {
      name: "Total Tasks",
      tasks: overview.totalTasks,
    },
    {
      name: "Open",
      tasks: overview.openTasks,
    },
    {
      name: "In Process",
      tasks: overview.inProcessTasks,
    },
    {
      name: "Completed",
      tasks: overview.completedTasks,
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-5 mt-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-gray-800">
          Task Overview
        </h2>

        <p className="text-sm text-gray-500">
          Your task statistics at a glance
        </p>
      </div>

      <div className="w-full h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: -15,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{ fill: "#f3f4f6" }}
            />

            <Bar
              dataKey="tasks"
              fill="#3B82F6"
              radius={[6, 6, 0, 0]}
              barSize={45}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

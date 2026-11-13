
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function AdminOverviewChart({ overview }) {
  const chartData = [
    {
      name: "Users",
      count: overview.totalUsers,
      revenue: 0,
    },
    {
      name: "Tasks",
      count: overview.totalTasks,
      revenue: 0,
    },
    {
      name: "Active Tasks",
      count: overview.activeTasks,
      revenue: 0,
    },
    {
      name: "Revenue",
      count: 0,
      revenue: overview.totalRevenue,
    },
  ];

  return (
    <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <h3 className="mb-5 text-lg font-bold text-slate-800">
        Platform Overview
      </h3>

      <div className="h-[300px] w-full sm:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 15, left: -15, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              interval={0}
            />

            {/* Count Axis */}
            <YAxis
              yAxisId="left"
              allowDecimals={false}
            />

            {/* Revenue Axis */}
            <YAxis
              yAxisId="right"
              orientation="right"
              tickFormatter={(value) => `$${value}`}
            />

            <Tooltip
              formatter={(value, name) => [
                name === "Revenue"
                  ? `$${Number(value).toLocaleString()}`
                  : value,
                name,
              ]}
            />

            <Legend />

            <Bar
              yAxisId="left"
              dataKey="count"
              name="Users / Tasks"
              fill="#2563eb"
              radius={[6, 6, 0, 0]}
            />

            <Bar
              yAxisId="right"
              dataKey="revenue"
              name="Revenue"
              fill="#16a34a"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { Button, Card } from "@heroui/react";
import { CircleDollar } from "@gravity-ui/icons";

export const instant = false;

export default async function TaskDetailsPage({ params }) {
  const { id } = await params;

  const res = await fetch(`http://localhost:8000/task/${id}`);
  const task = await res.json();

  const {
    title,
    client_name,
    category,
    budget,
    deadline,
    _id,
    details,
  } = task;

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-50 px-3 py-5 sm:px-6">
      <div className="mx-auto w-full max-w-3xl">

        <Card className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-md">

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-500 px-5 py-5 text-white sm:px-7">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
                <CircleDollar className="size-5" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium text-blue-100">
                  TASK DETAILS
                </p>

                <h1 className="mt-1 text-xl font-bold sm:text-2xl">
                  {title}
                </h1>

                <p className="mt-1 text-xs text-blue-100 sm:text-sm">
                  Posted by {client_name}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 sm:p-7">

            {/* Category */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-sm font-bold text-slate-700">
                Overview
              </h2>

              <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold capitalize text-blue-700">
                {category}
              </span>
            </div>

            {/* Budget & Deadline */}
            <div className="grid grid-cols-2 gap-3">

              <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-4">
                <p className="text-xs font-medium text-blue-500">
                  Project Budget
                </p>

                <p className="mt-2 text-xl font-bold text-blue-700 sm:text-2xl">
                  ${budget}
                </p>
              </div>

              <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-4">
                <p className="text-xs font-medium text-blue-500">
                  Submission Deadline
                </p>

                <p className="mt-2 text-base font-bold text-blue-700 sm:text-lg">
                  {deadline}
                </p>
              </div>

            </div>

            {/* Details */}
            <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 p-4">
              <h2 className="text-sm font-bold text-slate-800">
                Project Description
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {details}
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-5 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row">

              <Link href="/task" className="w-full sm:w-1/2">
                <Button
                  variant="secondary"
                  className="w-full border border-blue-200 bg-white py-5 font-semibold text-blue-600 hover:bg-blue-50"
                >
                  Explore More Tasks
                </Button>
              </Link>

              <Link href={`/task/${_id}/apply`} className="w-full sm:w-1/2">
                <Button className="w-full bg-blue-600 py-5 font-semibold text-white shadow-sm hover:bg-blue-700">
                  Apply for this Task
                </Button>
              </Link>

            </div>

          </div>
        </Card>

        <p className="mt-3 text-center text-xs text-slate-400">
          Find your next opportunity with Skill Swap
        </p>

      </div>
    </div>
  );
}
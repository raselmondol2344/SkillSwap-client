
import Link from "next/link";
import { Button, Card } from "@heroui/react";

export default function TaskCard({ task }) {
  const { title, client_name, category, budget, deadline, _id } = task;

  return (
    <Card className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">

      <Card.Header className="space-y-4 p-4 sm:space-y-5 sm:p-5">

        {/* Title */}
        <div className="min-w-0">
          <Card.Title className="line-clamp-2 text-lg leading-snug font-bold text-slate-800 sm:text-xl">
            {title}
          </Card.Title>

          <Card.Description className="mt-2 text-xs text-slate-500 sm:text-sm">
            Posted by <span className="font-semibold text-slate-700">{client_name}</span>
          </Card.Description>
        </div>

        {/* Category */}
        <div>
          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-semibold capitalize text-blue-600 sm:text-xs">
            {category}
          </span>
        </div>

        {/* Budget & Deadline */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">

          <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-3 sm:p-4">
            <p className="text-[11px] font-medium text-slate-500 sm:text-xs">
              Budget
            </p>

            <p className="mt-1 truncate text-base font-bold text-blue-700 sm:text-lg">
              ${budget}
            </p>
          </div>

          <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-3 sm:p-4">
            <p className="text-[11px] font-medium text-slate-500 sm:text-xs">
              Deadline
            </p>

            <p className="mt-1 truncate text-sm font-bold text-blue-700 sm:text-base">
              {deadline}
            </p>
          </div>

        </div>

      </Card.Header>

      {/* Buttons */}
      <Card.Footer className="mt-auto flex flex-row gap-2.5 border-t border-blue-100 bg-slate-50/80 p-4 sm:gap-3 sm:p-5">

        <Link href={`/task/${_id}`} className="w-1/2">
          <Button
            variant="secondary"
            className="w-full rounded-xl border border-blue-200 bg-white text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50"
          >
            Details
          </Button>
        </Link>

        <Button className="w-1/2 rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700">
          Apply
        </Button>

      </Card.Footer>
    </Card>
  );
}

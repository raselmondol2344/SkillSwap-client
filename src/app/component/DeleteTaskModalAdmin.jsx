
"use client";

export default function DeleteTaskModalAdmin({
  task,
  onDelete,
  onClose,
}) {
  if (!task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl sm:p-6">

        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <span className="text-2xl text-red-600">!</span>
        </div>

        <h2 className="text-lg font-bold text-slate-800 sm:text-xl">
          Delete Task?
        </h2>

        <p className="mt-2 text-sm text-slate-600">
          Are you sure you want to delete
          <span className="font-semibold text-slate-800">
            {" "}{task.title}
          </span>
          ? This action cannot be undone.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

          <button
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            onClick={() => onDelete(task._id)}
            className="rounded-lg bg-red-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-600"
          >
            Confirm Delete
          </button>

        </div>
      </div>
    </div>
  );
}

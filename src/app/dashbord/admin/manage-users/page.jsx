
"use client";

import { useEffect, useState } from "react";
import DeleteUserModal from "@/app/component/DeleteUserModal";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch All Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:8000/users");
        const data = await res.json();

        if (res.ok) {
          setUsers(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Delete User
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/user/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== id)
        );

        setSelectedUser(null);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center p-5 text-sm text-slate-600">
        Loading users...
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 p-3 sm:p-5 lg:p-6">

      {/* Header */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 sm:mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800 sm:text-2xl">
            Manage Users
          </h2>

          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Manage all registered users
          </p>
        </div>

        <span className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 sm:text-sm">
          Total Users: {users.length}
        </span>
      </div>

      {/* Mobile, sm & md User Cards */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:hidden">
        {users.length > 0 ? (
          users.map((user, index) => (
            <div
              key={user._id}
              className="min-w-0 rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm transition hover:shadow-md sm:p-4"
            >
              <div className="flex flex-col items-start gap-2">

                <p className="text-[10px] text-slate-400 sm:text-xs">
                  User #{index + 1}
                </p>

                <h3 className="w-full break-words text-xs font-semibold text-slate-800 sm:text-base">
                  {user.name}
                </h3>

                <span className="max-w-full rounded-full bg-blue-100 px-2 py-1 text-[10px] font-medium capitalize text-blue-700 sm:text-xs">
                  {user.role}
                </span>

              </div>

              <p className="mt-3 break-all text-[10px] text-slate-600 sm:text-sm">
                {user.email}
              </p>

              <div className="mt-3 border-t border-slate-100 pt-3">
                <button
                  onClick={() => setSelectedUser(user)}
                  className="w-full rounded-lg bg-red-500 px-2 py-2 text-[10px] font-medium text-white transition hover:bg-red-600 active:scale-95 sm:px-4 sm:py-2.5 sm:text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 rounded-xl border border-slate-200 bg-white py-10 text-center text-sm text-slate-500">
            No users found
          </div>
        )}
      </div>

      {/* lg & xl Table */}
      <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:block">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[650px] text-left">

            <thead className="bg-slate-100">
              <tr>
                <th className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-slate-700 lg:px-5">
                  #
                </th>

                <th className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-slate-700 lg:px-5">
                  Name
                </th>

                <th className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-slate-700 lg:px-5">
                  Email
                </th>

                <th className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-slate-700 lg:px-5">
                  Role
                </th>

                <th className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-slate-700 lg:px-5">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr
                    key={user._id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-4 py-4 text-sm text-slate-600 lg:px-5">
                      {index + 1}
                    </td>

                    <td className="max-w-[180px] break-words px-4 py-4 text-sm font-medium text-slate-800 lg:px-5">
                      {user.name}
                    </td>

                    <td className="break-all px-4 py-4 text-sm text-slate-600 lg:px-5">
                      {user.email}
                    </td>

                    <td className="px-4 py-4 lg:px-5">
                      <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium capitalize text-blue-700">
                        {user.role}
                      </span>
                    </td>

                    <td className="px-4 py-4 lg:px-5">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="whitespace-nowrap rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 active:scale-95"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-5 py-10 text-center text-sm text-slate-500"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteUserModal
        user={selectedUser}
        onDelete={handleDelete}
        onClose={() => setSelectedUser(null)}
      />

    </div>
  );
}

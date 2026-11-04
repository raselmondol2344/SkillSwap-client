
"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Dropdown, Label } from "@heroui/react";
import Link from "next/link";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import { FiMenu } from "react-icons/fi";

export default function DashbordNavbar({ onMenuClick }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-blue-100 bg-white px-3 sm:h-20 sm:px-6">

      {/* Left Side */}
      <div className="flex items-center gap-3">

        {/* Mobile Hamburger */}
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-gray-700 transition hover:bg-blue-50 hover:text-blue-600 md:hidden"
          aria-label="Open dashboard menu"
        >
          <FiMenu size={24} />
        </button>

        <div>
          <h1 className="text-lg font-semibold text-gray-800 sm:text-xl">
            Dashboard
          </h1>
          <p className="hidden text-xs text-gray-500 sm:block">
            Manage your SkillSwap account
          </p>
        </div>
      </div>

      {/* Right Side */}
      {user && (
        <div className="flex items-center gap-3">

          {/* User Dropdown */}
          <Dropdown>
            <Dropdown.Trigger className="flex cursor-pointer items-center gap-2 rounded-full outline-none">

              <Avatar size="md">
                <Avatar.Image
                  alt={user?.name || "User"}
                  src={user?.image || ""}
                />
                <Avatar.Fallback>
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </Avatar.Fallback>
              </Avatar>

              {/* User Info - Desktop */}
              <div className="hidden text-left md:block">
                <p className="text-sm font-semibold text-gray-800">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.role}
                </p>
              </div>

            </Dropdown.Trigger>

            <Dropdown.Popover>
              {/* User Information */}
              <div className="border-b border-gray-100 px-3 py-3">
                <div className="flex items-center gap-2">

                  <Avatar size="sm">
                    <Avatar.Image
                      alt={user?.name || "User"}
                      src={user?.image || ""}
                    />
                    <Avatar.Fallback>
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </Avatar.Fallback>
                  </Avatar>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-800">
                      {user?.name}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {user?.email}
                    </p>
                  </div>

                </div>
              </div>

              {/* Dropdown Menu */}
              <Dropdown.Menu>

                <Dropdown.Item
                  id="dashboard"
                  textValue="Dashboard"
                >
                  <Link
                    href={`/dashbord/${user?.role}`}
                    className="flex w-full items-center gap-2"
                  >
                    <MdDashboard size={18} />
                    <Label>Dashboard</Label>
                  </Link>
                </Dropdown.Item>

                <Dropdown.Item
                  id="profile"
                  textValue="Profile"
                >
                  <Link
                    href={`/dashbord/${user?.role}/profile`}
                    className="flex w-full items-center gap-2"
                  >
                    <CgProfile size={18} />
                    <Label>Profile</Label>
                  </Link>
                </Dropdown.Item>

                <Dropdown.Item
                  id="logout"
                  textValue="Logout"
                  variant="danger"
                  onClick={handleSignOut}
                >
                  <BiLogOut size={18} />
                  <Label>Logout</Label>
                </Dropdown.Item>

              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>

        </div>
      )}

    </header>
  );
}

"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";

export default function DashbordAsidebar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const role = user?.role || "client";

  const navMenu = {
    client: [
      {
        title: "Overview",
        href: "/dashbord/client",
      },
      {
        title: "Post a Task",
        href: "/dashbord/client/post-task",
      },
      {
        title: "My Tasks",
        href: "/dashbord/client/my-tasks",
      },
      {
        title: "Manage Proposals",
        href: "/dashbord/client/manage-proposals",
      },
      {
        title: "Profile",
        href: "/dashbord/client/profile",
      },
      
    ],

    freelancer: [
      {
        title: "Overview",
        href: "/dashbord/freelancer",
      },
      {
        title: "Browse Tasks",
        href: "/dashbord/freelancer/browse-task",
      },
      {
        title: "Proposal Form",
        href: "/dashbord/freelancer/proposal-form",
      },
      {
        title: "My Proposals",
        href: "/dashbord/freelancer/my-proposals",
      },
      {
        title: "Active Projects",
        href: "/dashbord/freelancer/active-projects",
      },
      {
        title: "My Earnings",
        href: "/dashbord/freelancer/my-earnings",
      },
      {
        title: "Profile",
        href: "/dashbord/freelancer/profile",
      },
    ],

    admin: [
      {
        title: "Overview",
        href: "/dashbord/admin",
      },
      {
        title: "Manage Users",
        href: "/dashbord/admin/manage-users",
      },
      {
        title: "Manage Tasks",
        href: "/dashbord/admin/manage-tasks",
      },
    ],
  };

  const menu = navMenu[role] || [];

  return (
    <aside className="hidden h-screen w-64 shrink-0 border-r border-blue-100 bg-white md:block">
      <div className="h-full p-5">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/asset/sslogo.png"
            width={55}
            height={55}
            alt="SkillSwap Logo"
            className="h-11 w-11 object-contain sm:h-12 sm:w-12"
          />

          <h3 className="text-xl font-bold text-blue-700 sm:text-2xl">
            Skill<span className="text-gray-900">Swap</span>
          </h3>
        </Link>

        {/* Sidebar Menu */}
        <nav className="mt-8 space-y-2">
          {menu.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="block rounded-lg px-4 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
            >
              {item.title}
            </Link>
          ))}
        </nav>

      </div>
    </aside>
  );
}
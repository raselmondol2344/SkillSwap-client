
import "server-only";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


// All Task (Public API)
export const getTask = async (
  page = 1,
  limit = 8,
  searchParams = {}
) => {
  const searchQuery = await searchParams;

  const searchText = searchQuery?.search || "";
  const category = searchQuery?.category || "";

  const res = await fetch(
    `${BACKEND_URL}/task?page=${page}&limit=${limit}&search=${encodeURIComponent(searchText)}&category=${encodeURIComponent(category)}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return res.json();
};


// All Freelancer (Private API)
export const getFreelancer = async () => {
  const requestHeaders = await headers();

  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  if (!session) {
    return [];
  }

  const { token } = await auth.api.getToken({
    headers: requestHeaders,
  });

  if (!token) {
    return [];
  }

  const res = await fetch(`${BACKEND_URL}/freelancer`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch freelancer");
  }

  return res.json();
};

import { authClient } from "./auth-client";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// High paying task
export const getHighPriceTask = async () => {
  const res = await fetch(`${BACKEND_URL}/task/high-price`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch high price tasks");
  }

  return res.json();
};


// High rating freelancer
export const getTopRattingFreelancer = async () => {
  const res = await fetch(
    `${BACKEND_URL}/freelancer/top-freelancers`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch top freelancer");
  }

  return res.json();
};


// My proposals
export const getMyProposals = async (userId) => {
  const res = await fetch(
    `${BACKEND_URL}/my-proposals/${userId}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch my proposals");
  }

  return res.json();
};


// Manage proposals
export const getManageProposals = async (clientId) => {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(
    `${BACKEND_URL}/manage-proposals/${clientId}`,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch manage proposals");
  }

  return res.json();
};


// Reject proposal
export const rejectProposal = async (taskId, freelancerId) => {
  const res = await fetch(
    `${BACKEND_URL}/task/${taskId}/reject`,
    {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ freelancerId }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to reject proposal");
  }

  return res.json();
};

//all task
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getTask = async () => {
  const res = await fetch(`${BACKEND_URL}/task`);

  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return res.json();
};

// high paying task
export const getHighPriceTask = async () => {
  const res = await fetch(`${BACKEND_URL}/task/high-price`);

  if (!res.ok) {
    throw new Error("Failed to fetch high price tasks");
  }

  return res.json();
};


 

// all  freelancer
export const getFreelancer = async () => {
  const res = await fetch(`${BACKEND_URL}/freelancer`);

  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return res.json(); 
};


// high rating freelancer
export const getTopRattingFreelancer = async () => {
  const res = await fetch(`${BACKEND_URL}/freelancer/top-freelancers`);

  if (!res.ok) {
    throw new Error("Failed to fetch top freelancer");
  }

  return res.json();
};


// my-proposal
export const getMyProposals = async (userId) => {
  const res = await fetch(`${BACKEND_URL}/my-proposals/${userId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch my proposals");
  }

  return res.json();
};


// manage proposals
export const getManageProposals = async (clientId) => {
  const res = await fetch(
    `${BACKEND_URL}/manage-proposals/${clientId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch manage proposals");
  }

  return res.json();
};

// client reject api fetch

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



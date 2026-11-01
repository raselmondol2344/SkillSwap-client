
//all task
const BACKEND_URL = process.env.BACKEND_URL;

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



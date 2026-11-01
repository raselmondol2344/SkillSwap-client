

import { getTopRattingFreelancer } from "@/lib/action";
import FreelancerCard from "./FreelancerCard";

export default async function TopFreelancer() {
  const freelancers = await getTopRattingFreelancer();

  return (
            <div>
            <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Top Rating <span className="text-blue-600">Freelancer</span>
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-500 md:text-base">
            Explore high-budget tasks and find opportunities worth your skills.
            Turn your expertise into valuable earnings.
          </p>
        </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 max-w-7xl mx-auto">
      {freelancers.map((freelancer) => (
       < FreelancerCard key={freelancer._id} freelancer={freelancer}/>
      ))}
    </div>
    </div>
  );
}
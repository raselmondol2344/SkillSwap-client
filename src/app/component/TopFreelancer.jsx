

import { getTopRattingFreelancer } from "@/lib/action";
import FreelancerCard from "./FreelancerCard";

export default async function TopFreelancer() {
  const freelancers = await getTopRattingFreelancer();

  return (
 <div className="w-full px-4 py-10 sm:px-6 md:py-14 bg-slate-50 max-w-7xl mx-auto">
  {/* Section Heading */}
  <div className="mb-8 text-center">
    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
      Top Rated <span className="text-blue-600">Freelancers</span>
    </h1>

    <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base sm:leading-7">
      Meet our most trusted and highly rated freelancers. Explore talented
      professionals with proven experience and find the right experts
      to bring your projects to life.
    </p>
  </div>

  {/* Freelancer Cards */}
  <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {freelancers.map((freelancer) => (
      <FreelancerCard
        key={freelancer._id}
        freelancer={freelancer}
      />
    ))}
  </div>
</div>
  );
}
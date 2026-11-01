import { getFreelancer } from "@/lib/action";
import FreelancerCard from "./FreelancerCard";


export default async function Freelancerlist() {
  const freelancers = await getFreelancer();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {freelancers?.map((freelancer) => (
        <FreelancerCard key={freelancer._id} freelancer={freelancer} />
      ))}
    </div>
  );
}
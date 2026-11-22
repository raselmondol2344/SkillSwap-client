import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getFreelancer } from "@/lib/server-api";
import FreelancerCard from "./FreelancerCard";

export default async function Freelancerlist() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const freelancers = await getFreelancer();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {freelancers?.map((freelancer) => (
        <FreelancerCard key={freelancer._id} freelancer={freelancer} />
      ))}
    </div>
  );
}


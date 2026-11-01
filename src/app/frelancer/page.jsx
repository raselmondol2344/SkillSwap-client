import { Suspense } from "react";
import Freelancerlist from "../component/Freelancerlist";


export default function freelancerPage() {
  return (
    <div className="p-5 mx-auto max-w-7xl">
      <h1 className="text-2xl font-bold mb-5">Freelancer List</h1>
      
    
      <Suspense fallback={<div className="text-center py-10">Loading tasks...</div>}>
        <Freelancerlist />
      </Suspense>
    </div>
  );
}
import Image from "next/image";
import { Star } from "@gravity-ui/icons";
import { Button, Card } from "@heroui/react";

export default function FreelancerCard({ freelancer }) {
  return (
    <Card className="w-full border border-blue-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Card.Header className="flex flex-col items-center p-6 text-center">
        {/* Profile Image */}
        <div className="relative size-24 overflow-hidden rounded-full border-4 border-blue-100">
          <Image
            src={freelancer.image}
            alt={freelancer.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Name */}
        <Card.Title className="mt-4 text-xl font-bold text-slate-800">
          {freelancer.name}
        </Card.Title>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1">
          <Star className="size-4 text-yellow-500" />
          <span className="text-sm font-semibold text-slate-700">
            {freelancer.rating}
          </span>
          <span className="text-sm text-slate-400">/ 5.0</span>
        </div>
      </Card.Header>

      {/* Skills */}
      <div className="px-6">
        <p className="mb-2 text-sm font-semibold text-slate-700">
          Skills
        </p>

        <div className="flex flex-wrap gap-2">
          {freelancer.skills.map((skill, index) => (
            <span
              key={index}
              className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Finished Work */}
      <div className="mx-6 my-5 rounded-lg border border-blue-100 bg-blue-50 p-3 text-center">
        <p className="text-xs text-blue-500">Finished Work</p>

        <p className="mt-1 text-xl font-bold text-blue-700">
          {freelancer.finished_work}
        </p>
      </div>

      {/* Button */}
      <Card.Footer className="mt-auto border-t border-blue-100 bg-slate-50 p-5">
        <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
       Hire Me
        </Button>
      </Card.Footer>
    </Card>
  );
}
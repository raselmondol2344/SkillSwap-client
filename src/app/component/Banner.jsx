import Link from "next/link";
import { FaArrowRight, FaBriefcase } from "react-icons/fa";

const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-slate-50">
      {/* Background Shapes */}
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-blue-100/60 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-blue-50 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-16 sm:py-20 lg:py-24">
          <div className="w-full max-w-4xl mx-auto text-center">

            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold animate-pulse">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              Connect. Work. Grow.
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-tight">
              Get your tasks done by{" "}
              <span className="text-blue-600">skilled freelancers</span>
            </h1>

            {/* Description */}
            <p className="max-w-2xl mx-auto mt-6 text-base sm:text-lg md:text-xl text-slate-500 leading-relaxed">
              SkillSwap connects clients with talented freelancers. Post your
              task, find the right person, and get quality work completed
              quickly and easily.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-9">
              <Link
                href="/post-task"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 text-white font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300"
              >
                <FaBriefcase />
                Post a Task
              </Link>

              <Link
                href="/task"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-700 font-semibold hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 hover:-translate-y-1 transition-all duration-300"
              >
                Browse Tasks
                <FaArrowRight className="text-sm" />
              </Link>
            </div>

            {/* Bottom Stats */}
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-10 text-sm text-slate-400">
              <span>✓ Skilled Freelancers</span>
              <span>✓ Quality Work</span>
              <span>✓ Easy & Secure</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
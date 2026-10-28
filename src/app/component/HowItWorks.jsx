import { FaSearch, FaPaperPlane, FaCheckCircle } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FaSearch />,
      title: "Find a Task",
      description:
        "Browse available tasks and find the project that matches your skills and interests.",
    },
    {
      id: 2,
      icon: <FaPaperPlane />,
      title: "Send Your Proposal",
      description:
        "Submit your proposal with your budget, estimated time, and a short message to the client.",
    },
    {
      id: 3,
      icon: <FaCheckCircle />,
      title: "Complete the Work",
      description:
        "Get selected by the client, complete the task, and deliver quality work on time.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-sm font-semibold text-blue-600 mb-4">
            Simple Process
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            How It <span className="text-blue-600">Works</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-500 leading-relaxed">
            Getting started with SkillSwap is simple. Find the right task,
            connect with clients, and complete your work.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="relative bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
             

              {/* Icon */}
              <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl sm:text-3xl">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="mt-6 text-xl sm:text-2xl font-bold text-slate-900">
                {step.title}
              </h3>

              <p className="mt-3 text-sm sm:text-base text-slate-500 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
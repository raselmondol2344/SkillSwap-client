
import {
  FaCode,
  FaDatabase,
  FaLaptopCode,
  FaBrain,
} from "react-icons/fa";

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      icon: <FaCode />,
      title: "Programming",
      description:
        "Build software, solve coding problems, and develop powerful applications.",
    },
    {
      id: 2,
      icon: <FaDatabase />,
      title: "Data Science",
      description:
        "Analyze data, create visualizations, and discover valuable insights.",
    },
    {
      id: 3,
      icon: <FaLaptopCode />,
      title: "Web Development",
      description:
        "Create modern websites and responsive web applications.",
    },
    {
      id: 4,
      icon: <FaBrain />,
      title: "Machine Learning",
      description:
        "Build intelligent models, automate tasks, and explore AI solutions.",
    },
  ];

  return (
    <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <span className="mb-4 inline-block rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
            Explore Opportunities
          </span>

          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
            Popular{" "}
            <span className="text-blue-600">Categories</span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
            Explore popular categories and find tasks that match your
            skills and interests.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg sm:p-7"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl text-blue-600 transition-colors duration-300 hover:bg-blue-600 hover:text-white">
                {category.icon}
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                {category.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                {category.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;

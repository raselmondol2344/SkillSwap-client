
import Link from "next/link";

const categories = [
  "web development",
  "programming",
  "data science",
  "machine learning",
  "all",
];

export default function CategoryFilter({ selectedCategory }) {
  return (
    <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 my-8">
      {categories.map((category) => (
        <Link
          key={category}
          href={
            category === "all"
              ? "/task"
              : `/task?category=${encodeURIComponent(category)}`
          }
          className={`px-4 py-2 text-center rounded-md border capitalize transition
            ${
              selectedCategory === category ||
              (!selectedCategory && category === "all")
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
            }
            ${category === "all" ? "col-span-2 sm:col-span-1" : ""}
          `}
        >
          {category}
        </Link>
      ))}
    </div>
  );
}

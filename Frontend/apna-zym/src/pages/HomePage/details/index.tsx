import { Link, useLocation, useNavigate } from "react-router-dom";
import type { IProgramCategory } from "../index";

const CatalogDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { item } = location.state;

  if (!item) {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-white"
        style={{
          background:
            "linear-gradient(90deg, #000000 0%, #1e3a8a 50%, #2563eb 100%)",
          width: "100vw",
          overflow: "hidden",
        }}
      >
        Category not found
      </div>
    );
  }

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background:
          "linear-gradient(90deg, #000000 0%, #1e3a8a 50%, #2563eb 100%)",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      {/* Hero Section */}
      <div className="relative h-[480px]">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <h1 className="text-6xl md:text-8xl font-bold">{item.title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <p className="text-gray-100 max-w-3xl mb-10 text-2xl md:text-4xl font-bold">
          {item.description}
        </p>
        {/* Back Button */}
        <div className="mt-12">
          <Link
            to="/"
            className="inline-block text-blue-400 hover:text-red-500"
          >
            ← Back to Program
          </Link>
        </div>
        {/* Programs */}
        <h2 className="text-3xl font-bold mb-8 text-gray-100">
          Programs Categories
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-center">
          {item?.subCategories.map((program: IProgramCategory, i: number) => (
            <div
              key={program._id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col"
              style={{ width: "320px", height: "520px" }} // fixed width & height
            >
              {/* Image */}
              <div className="h-56 w-full overflow-hidden">
                <img
                  src={program.image[i]}
                  alt={program.title}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-1 truncate">
                    {program.title}
                  </h3>
                  <h4 className="text-sm font-medium mb-2 line-clamp-2 text-gray-200">
                    {program.description}
                  </h4>

                  <div className="text-sm text-gray-400 mb-4 space-y-1">
                    <p>⏱️ Duration: {program.duration}</p>
                    <p>💰 Price: ₹{program.price}</p>
                    <p>📅 Start Date: {program.schedule}</p>
                    <p>🕒 Start Time: {program.programTime}</p>
                  </div>
                </div>

                <button
                  className="w-full text-white py-2 rounded transition
                            focus:outline-none
                            focus:ring-2 focus:ring-white
                            active:border active:border-white"
                  style={{
                    background:
                      "linear-gradient(90deg, #111827 40%, #374151 70%, #000000 100%)",
                  }}
                  onClick={() =>
                    navigate("/membership", {
                      state: { program: program, category: item }, // pass subcategory & main category
                    })
                  }
                >
                  Join Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatalogDetail;

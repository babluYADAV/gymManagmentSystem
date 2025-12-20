
import { useParams, Link } from "react-router-dom";
import data from "./data";

const CatalogDetail = () => {
  const { id } = useParams<{ id: string }>();

  const catalog = data.find(
    (item) => item.id === Number(id)
  );

  if (!catalog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white " style={{
        background:
          "linear-gradient(90deg, #000000 0%, #1e3a8a 50%, #2563eb 100%)",
        width: "100vw",
        overflow: "hidden",
      }}>
        Category not found
      </div>
    );
  }

  return (
    <div className=" min-h-screen text-white"   style={{
        background:
          "linear-gradient(90deg, #000000 0%, #1e3a8a 50%, #2563eb 100%)",
        width: "100vw",
        overflow: "hidden",
      }}>

      {/* Hero Section */}
      <div className="relative h-72">
        <img
          src={catalog.image}
          alt={catalog.category}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            {catalog.category}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">

        <p className="text-gray-300 max-w-3xl mb-10">
          {catalog.description}
        </p>

        {/* Programs */}
        <h2 className="text-3xl font-bold mb-8 text-red-500">
          Programs
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {catalog?.programs.map((program) => (
            <div
              key={program.id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition"
            >
              <img
                src={program.image}
                alt={program.name}
                className="h-48 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {program.name}
                </h3>

                <div className="text-sm text-gray-400 mb-4 space-y-1">
                  <p>⏱ Duration: {program.duration}</p>
                  <p>🔥 Level: {program.level}</p>
                </div>

                <button className="w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg font-medium">
                  Join Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="mt-12">
          <Link
            to="/"
            className="inline-block text-red-400 hover:text-red-500"
          >
            ← Back to Catalog
          </Link>
        </div>

      </div>
    </div>
  );
};

export default CatalogDetail;

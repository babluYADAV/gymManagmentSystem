import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export interface IProgram {
  _id: string;
  title: string;
  description?: string;
  image: string;
  trainer: string;
  qualification: string;
  subCategories: IProgramCategory[];
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IProgramCategory {
  _id: string;
  title: string;
  image: string[];
  description: string;
  schedule: string;
  programTime?: string;
  price: string;
  duration: string;
  status: boolean;
}

const HomePage = () => {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/api/program/program",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPrograms(response.data); // safe
      } catch (error) {
        console.error(error);
      }
    };

    fetchProgram();
  }, []);

  return (
    <section
      className="min-h-screen text-white"
      style={{
        background:
          "linear-gradient(90deg, #000000 0%, #1e3a8a 50%, #2563eb 100%)",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Our <span className="text-red-500">Zym Programs</span>
        </h2>

        {/* Catalog Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((item: IProgram) => (
            <div
              key={item._id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col"
              style={{ width: "320px", height: "500px" }} // fixed width & height
            >
              {/* Image */}
              <div className="h-56 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-2 truncate">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {item.description}
                  </p>

                  <div className="pb-4">
                    <span className="text-white font-semibold">
                      Trainer: {item.trainer}
                    </span>
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
                  onClick={() => navigate(`/${item._id}`, { state: { item } })}
                >
                  See more info
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePage;

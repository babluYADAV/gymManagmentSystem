import { useNavigate } from "react-router-dom";
import zymCatalogData from "./data";


interface CatalogItem {
            id: number;
            image: string;
            title: string;
            description: string;
        }
const HomePage = () => {
      const navigate = useNavigate();
  return (
    <section className=" py-16 px-6"  style={{
        background:
          "linear-gradient(90deg, #000000 0%, #1e3a8a 50%, #2563eb 100%)",
        width: "100vw",
        overflow: "hidden",
      }}>
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Our <span className="text-red-500">Zym Programs</span>
        </h2>

        {/* Catalog Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {zymCatalogData.map((item:CatalogItem) => (
            <div
              key={item.id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-56 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 mb-4">
                  {item.description}
                </p>

                <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium"  onClick={()=>navigate(`/${item.id}`)}>
                  Join Now
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

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const MemberShipPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { program, category } = location.state || {};

  const [selectedPeriod, setSelectedPeriod] = useState<number>(1); // in months

  const [personalTrainer, setPersonalTrainer] = useState<boolean>(false);
  const personalTrainerFee = 50;

  if (!program || !category) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gray-900">
        No program selected
      </div>
    );
  }

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background:
          "linear-gradient(90deg, #000000 0%, #1e3a8a 50%, #2563eb 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <button
          className="inline-block text-blue-400 hover:text-red-500 mb-6"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        {/* Program Details */}
        <h1 className="text-4xl font-bold mb-4">{program.title}</h1>
        <h2 className="text-2xl font-semibold text-gray-200 mb-4">
          Category: {category.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="h-64 w-full overflow-hidden rounded-xl shadow-lg">
            <img
              src={program.image[2]}
              alt={program.title}
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="text-gray-200 space-y-2">
            <p>{program.description}</p>
            <p>⏱️ Duration: {program.duration}</p>
            <p>💰 Price per Month: ${program.price}</p>
            <p>📅 Start Date: {program.schedule}</p>
            <p>🕒 Start Time: {program.programTime}</p>
          </div>
        </div>

        {/* Trainer / Category Info */}
        <div className="mb-8">
          <p className="text-gray-200">Trainer: {category.trainer}</p>
          <p className="text-gray-200">
            Qualification: {category.qualification}
          </p>
        </div>

        {/* Subscription Period Dropdown */}
        <div className="mb-6">
          <label htmlFor="period" className="block text-gray-200 mb-2">
            Select Subscription Period:
          </label>
          <select
            id="period"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(Number(e.target.value))}
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={1}>1 Month</option>
            <option value={3}>3 Months</option>
            <option value={6}>6 Months</option>
            <option value={9}>9 Months</option>
            <option value={12}>12 Months</option>
          </select>
        </div>
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-red-500"
              checked={personalTrainer}
              onChange={(e) => setPersonalTrainer(e.target.checked)}
            />
            <span className="ml-2 text-gray-200">
              Add Personal Trainer (+${personalTrainerFee}/month)
            </span>
          </label>
        </div>
        {/* Total Price Display */}
        <div className="mb-6 text-xl font-semibold">
          Total Price:{" "}
          <span className="text-green-400">
            ${Number(program.price) * selectedPeriod} + $
            {personalTrainer ? personalTrainerFee * selectedPeriod : 0}
          </span>
        </div>

        {/* Subscription / Checkout Button */}
        <button
          className="w-full text-white py-3 rounded-lg font-medium hover:bg-red-600 transition"
          style={{
            background:
              "linear-gradient(90deg, #111827 40%, #374151 70%, #000000 100%)",
          }}
          onClick={() =>
            navigate("/subscription", {
              state: { program, category, period: selectedPeriod },
            })
          }
        >
          Proceed to Subscribe
        </button>
      </div>
    </div>
  );
};

export default MemberShipPage;

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentPage from "./paymentPage";

export interface SuccessPayload {
  paymentIntentId: string;
  userId: string;
  programId: string;
  subCategory: string;
  duration: number;
  personalTrainer: boolean;
}

const MemberShipPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { program, category } = location.state || {};
  const [selectedPeriod, setSelectedPeriod] = useState<number>(1); // in months
  const [successPayload, setSuccessPayload] = useState<SuccessPayload | null>(
    null
  );
  const [clientSecret, setClientSecret] = useState("");
  const [showCardPage, setShowCardPage] = useState(false);
  const [personalTrainer, setPersonalTrainer] = useState<boolean>(false);

  const personalTrainerFee = 500;
  const secret_key = import.meta.env.VITE_CLIENT_SECRET;
  const stripePromise = loadStripe(secret_key);

  const totalPrice =
    Number(program?.price) * selectedPeriod +
    (personalTrainer ? personalTrainerFee * selectedPeriod : 0);

  const handleCheckout = () => {
    try {
      const token = localStorage.getItem("token");
      const userString = localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;

      if (!user || !program || !category) return;

      // Create payment intent on backend
      axios
        .post(
          "http://localhost:5000/api/memberShip/payment",
          {
            price: totalPrice, // send total price
            userId: user.user.id,
            programId: program._id,
            subCategory: category.title,
            duration: selectedPeriod * 30, // approximate days
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          console.log(response.data);
          const { paymentIntent } = response.data;
          if (paymentIntent) {
            setClientSecret(paymentIntent.client_secret);
            const payload = {
              paymentIntentId: paymentIntent.id,
              userId: user.user.id,
              programId: program._id,
              subCategory: category.title,
              duration: selectedPeriod * 30,
              personalTrainer,
            };
            console.log("Payload to set:", payload);
            setSuccessPayload(payload);
            setShowCardPage(true);
          }
        });
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

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
      {" "}
      {showCardPage && successPayload ? (
        <Elements stripe={stripePromise}>
          <PaymentPage
            successPayload={successPayload}
            price={totalPrice}
            clientSecret={clientSecret}
          />
        </Elements>
      ) : (
        <div className="max-w-4xl mx-auto px-6 py-12">
          <button
            className="inline-block text-blue-400 hover:text-red-500 mb-6"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>

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
              <p>💰 Price per Month: ₹{program.price}</p>
              <p>📅 Start Date: {program.schedule}</p>
              <p>🕒 Start Time: {program.programTime}</p>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-gray-200">Trainer: {category.trainer}</p>
            <p className="text-gray-200">
              Qualification: {category.qualification}
            </p>
          </div>

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
                Add Personal Trainer (+₹{personalTrainerFee}/month)
              </span>
            </label>
          </div>

          <div className="mb-6 text-xl font-semibold">
            Total Price: <span className="text-green-400">₹{totalPrice}</span>
          </div>

          <button
            className="w-full text-white py-3 rounded-lg font-medium hover:bg-red-600 transition"
            style={{
              background:
                "linear-gradient(90deg, #111827 40%, #374151 70%, #000000 100%)",
            }}
            onClick={handleCheckout}
          >
            Proceed to Subscribe
          </button>
        </div>
      )}
    </div>
  );
};

export default MemberShipPage;

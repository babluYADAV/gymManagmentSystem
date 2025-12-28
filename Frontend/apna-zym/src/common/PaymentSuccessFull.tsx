import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import successAnimation from "../assets/Success.json";

export default function MembershipSuccess() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background:
          "linear-gradient(90deg, #000000 0%, #1e3a8a 50%, #2563eb 100%)",
      }}
    >
      <div className="p-8 rounded-xl w-full max-w-md text-center">
        <div className="w-48 mx-auto">
          <Lottie animationData={successAnimation} loop={false} />
        </div>

        <h2 className="text-2xl font-bold mt-4 text-gray-100">
          Membership Activated! 💪
        </h2>

        <p className="text-gray-100 mt-2">
          Your gym membership payment was successful. You now have full access
          to your selected workout program. Let’s start your fitness journey!
        </p>

        <button
          className="mt-6 w-full text-white py-3 rounded transition
                     focus:outline-none
                     focus:ring-2 focus:ring-white
                     active:border active:border-white"
          style={{
            background:
              "linear-gradient(90deg, #111827 40%, #374151 70%, #000000 100%)",
          }}
          onClick={() => navigate("/")}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

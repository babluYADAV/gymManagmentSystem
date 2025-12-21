import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import successAnimation from "../assets/Success.json";

export default function RegisterSuccess() {
  const navigate = useNavigate();

  return (
    <div
      className="py-16 px-6 min-h-screen flex items-center justify-center"
      style={{
        background:
          "linear-gradient(90deg, #000000 0%, #1e3a8a 50%, #2563eb 100%)",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <div className=" p-8 rounded-xl w-full max-w-md text-center">
        <div className="w-48 mx-auto">
          <Lottie animationData={successAnimation} loop={false} />
        </div>

        <h2 className="text-2xl font-bold mt-4 text-gray-100">
          Registration Successful!
        </h2>

        <p className="text-gray-100 mt-2">
          Your account has been created successfully. You can now log in and
          start using the app.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="mt-6 w-full text-white py-3  rounded transition
                            focus:outline-none
                            focus:ring-2 focus:ring-white
                            active:border active:border-white
                     "
          style={{
            background:
              "linear-gradient(90deg, #111827 40%, #374151 70%, #000000 100%)",
          }}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}

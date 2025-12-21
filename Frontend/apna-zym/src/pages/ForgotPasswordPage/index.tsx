import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!/\S+@\S+\.\S+/.test(e.target.value) && e.target.value !== "") {
      setEmailError("Please enter a valid email address");
      setEmail(e.target.value);
    } else {
      setEmail(e.target.value);
      setEmailError("");
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setOtpError("Please enter a valid email address");
      return;
    }
    axios
      .post("http://localhost:5000/api/auth/sendOTP", {
        email,
      })
      .then((response) => {
        console.log("OTP sent successfully", response);
        if (response.data) {
          navigate("/verifyOTP", { state: { email } });
        }
      })
      .catch((error) => {
        console.error("Error sending OTP", error);
        setOtpError("Error sending OTP. Please try again.");
      });
  };
  return (
    <section
      className="py-16 px-6 min-h-screen flex items-center"
      style={{
        background:
          "linear-gradient(90deg, #000000 0%, #1e3a8a 50%, #2563eb 100%)",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-100">
          Forgot Your Password?
        </h2>
        <p className="mb-6 text-center text-gray-300">
          Enter your email and we’ll send you a password reset link.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
          <div>
            <label className="block text-gray-200 mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-900 text-gray-100 border-blue-900"
              placeholder="Enter your email"
              required
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full text-white py-2 rounded transition
                            focus:outline-none
                            focus:ring-2 focus:ring-white
                            active:border active:border-white"
            style={{
              background:
                "linear-gradient(90deg, #111827 40%, #374151 70%, #000000 100%)",
            }}
          >
            Send Reset Link
          </button>
          {otpError && <p className="text-red-500 text-sm mt-1">{otpError}</p>}

          {}
          <div className="text-center">
            <a href="/login" className="text-sm text-blue-200 hover:underline">
              Back to Sign In
            </a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;

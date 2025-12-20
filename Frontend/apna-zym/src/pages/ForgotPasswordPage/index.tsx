import { useState } from "react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");

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
    setSubmitted(true);
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

        {!submitted ? (
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

            <div className="text-center">
              <a
                href="/login"
                className="text-sm text-blue-200 hover:underline"
              >
                Back to Sign In
              </a>
            </div>
          </form>
        ) : (
          <div className="max-w-md mx-auto bg-gray-900 border border-blue-900 rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-green-400 mb-2">
              Check Your Email
            </h3>
            <p className="text-gray-300 mb-4">
              If an account exists for{" "}
              <span className="text-blue-300">{email}</span>, you’ll receive a
              password reset link shortly.
            </p>
            <a href="/login" className="text-blue-200 hover:underline">
              Return to Login
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default ForgotPasswordPage;

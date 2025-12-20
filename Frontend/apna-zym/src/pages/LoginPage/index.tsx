import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../common/Loader";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!/\S+@\S+\.\S+/.test(e.target.value) && e.target.value !== "") {
      setEmailError("Please enter a valid email address");
      setEmail(e.target.value);
    } else {
      setEmail(e.target.value);
      setEmailError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;

    if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else if (!passwordRegex.test(value)) {
      setPasswordError(
        "Password must contain an uppercase letter, lowercase letter, number, and special character"
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setEmailError("Please enter a valid email address");
      return;
    } else if (!password) {
      setPasswordError("Please enter a valid password");
      return;
    }
    setLoading(true);
    axios
      .post("http://localhost:5000/api/auth/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          setLoginError("");
          setLoginError("");
          setLoading(false);
          localStorage.setItem("token", response.data.token);
          navigate("/");
        }
      })
      .catch((error) => {
        setLoginError("Invalid email or password");
        setLoading(false);
        console.error("There was an error!", error);
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
          Sign In to Your Gym Account
        </h2>
        <p className="mb-6 text-center text-gray-300">
          Enter your credentials to access your fitness dashboard.
        </p>
        <form className="space-y-4 max-w-md mx-auto">
          <div>
            <label className="block text-gray-200 mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-900 text-gray-100 border-blue-900"
              placeholder="Enter your email"
              required
              value={email}
              onChange={handleEmailChange}
            />
            <span className="text-sm text-red-400">{emailError}</span>
          </div>
          <div>
            <label className="block text-gray-200 mb-1" htmlFor="password">
              Password
            </label>
            <div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 pr-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-900 text-gray-100 border-blue-900"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                />

                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.293-3.95m3.249-2.383A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.965 9.965 0 01-4.293 5.03M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3l18 18"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {/* Error message OUTSIDE */}
              {passwordError && (
                <span className="mt-1 block text-sm text-red-400">
                  {passwordError}
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <a
              href="/forgot-password"
              className="text-sm text-blue-200 hover:underline"
            >
              Forgot password?
            </a>
          </div>
          {loading ? (
            <Loader />
          ) : (
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
              onClick={handleSubmit}
            >
              Sign In
            </button>
          )}
          <span className="text-sm text-red-400">{loginError}</span>
        </form>
        <p className="mt-6 text-center text-gray-200">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-200 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;

import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ConfirmPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, otp } = location.state;

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [error, setError] = useState("");
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
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
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    axios
      .post("http://localhost:5000/api/auth/resetPassword", {
        otp,
        newPassword: confirmPassword,
        email,
      })
      .then((response) => {
        console.log("Password reset successfully", response);
        if (response.data) {
          navigate("/resetPasswordSuccess");
        }
      })
      .catch((error) => {
        console.error("Error resetting password", error);
        setError("Error resetting password. Please try again.");
      });
  };

  return (
    <div
      className=" flex items-center justify-center"
      style={{
        background:
          "linear-gradient(90deg, #000000 0%, #1e3a8a 50%, #2563eb 100%)",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div className="rounded-xl p-8 w-full max-w-md justify-center mx-auto text-gray-100">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new password"
              required
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm new password"
              required
            />
            {confirmPasswordError && (
              <p className="text-red-500 text-sm mt-1">
                {confirmPasswordError}
              </p>
            )}
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
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
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

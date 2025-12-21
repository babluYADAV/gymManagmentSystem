import axios from "axios";
import { useRef, useState } from "react";
import Loader from "../../common/Loader";
import { useNavigate } from "react-router-dom";

const labelOptions = [
  "Beginner",
  "Weight Loss",
  "Muscle Gain",
  "Fitness",
  "Bodybuilding",
];

const RegisterPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [profileImg, setProfileImg] = useState<string | null>(null);

  const [selectedLabel, setSelectedLabel] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [disease, setDisease] = useState<string>("none");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [dobError, setDobError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [weightError, setWeightError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [labelError, setLabelError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [profileImgError, setProfileImgError] = useState("");
  const [heightError, setHeightError] = useState("");
  const [diseaseError, setDiseaseError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleProfilePicChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "gymManagementSystem");
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dyt4evmw6/image/upload",
          formData
        );

        if (response.data.secure_url) {
          setProfileImgError("");
          setProfileImg(response.data.secure_url);
        }
      } catch (error) {
        setProfileImgError("Image upload failed. Please try again.");
        console.error("Image upload failed", error);
      }
    }
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim() === "") {
      setNameError("Name cannot be empty");
      setName(e.target.value);
    } else {
      setName(e.target.value);
      setNameError("");
    }
  };

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
  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMobileNumber(value);
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(value)) {
      setMobileError("Please enter a valid 10-digit mobile number");
    } else {
      setMobileError("");
    }
  };
  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDob(e.target.value);
    if (!e.target.value) {
      setDobError("Please select your date of birth");
    } else {
      setDobError("");
    }
  };
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    if (e.target.value.trim() === "") {
      setAddressError("Address cannot be empty");
    } else {
      setAddressError("");
    }
  };
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWeight(value);
    if (Number(value) <= 0) {
      setWeightError("Please enter a valid weight");
    } else {
      setWeightError("");
    }
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "") {
      setGenderError("Please select your gender");
      setGender(e.target.value);
    } else {
      setGender(e.target.value);
      setGenderError("");
    }
  };
  const handleLabelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "") {
      setLabelError("Please select a label");
      setSelectedLabel(e.target.value);
    } else {
      setSelectedLabel(e.target.value);
      setLabelError("");
    }
  };
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHeight(value);
    if (Number(value) <= 0) {
      setHeightError("Please enter a valid height");
    } else {
      setHeightError("");
    }
  };
  const handleDiseaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDisease(value);
    if (value.trim() === "") {
      setDiseaseError("Please enter disease information or 'none'");
    } else {
      setDiseaseError("");
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Handle form submission logic here
    if (
      !name ||
      !email ||
      !password ||
      !mobileNumber ||
      !dob ||
      !address ||
      !weight ||
      !gender ||
      !selectedLabel ||
      !height
    ) {
      setRegisterError("Please fix the errors before submitting the form");
      setLoading(false);
      return;
    }
    axios
      .post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        phone: mobileNumber,
        gender,
        dob,
        mnumber: mobileNumber,
        hieght: height,
        weight,
        disease,
        label: selectedLabel,
        profilePic: profileImg,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          setRegisterError("");
          setLoading(false);
          navigate("/registrationSuccess");
        }
      })
      .catch((error) => {
        setRegisterError("Registration failed. Please try again.");
        setLoading(false);
        console.error(error);
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
          Create Your Gym Account
        </h2>
        <p className="mb-6 text-center text-gray-300">
          Fill out the form below to register and start your fitness journey
          with us.
        </p>
        <form className="space-y-4">
          {/* Profile Picture Upload (centered image) */}
          <div className="flex flex-col items-center mb-4">
            <div className="w-24 h-24 rounded-full bg-blue-900 flex items-center justify-center mb-2 border-2 border-blue-400 overflow-hidden">
              {profileImg ? (
                <img
                  src={profileImg}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14c3.866 0 7 1.343 7 3v2H5v-2c0-1.657 3.134-3 7-3zm0-2a4 4 0 100-8 4 4 0 000 8z"
                  />
                </svg>
              )}
            </div>
            <label className="block text-gray-200 mb-1" htmlFor="profilePic">
              Profile Picture
            </label>
          </div>
          {/* 3-column grid for fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Name */}
            <div>
              <label className="block text-gray-200 mb-1" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-900 text-gray-100 border-blue-900"
                placeholder="Enter your name"
                value={name}
                onChange={handleNameChange}
                required
              />
              <span className="text-sm text-red-400">{nameError}</span>
            </div>
            {/* Email */}
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
            {/* Password */}
            <div>
              <label className="block text-gray-200 mb-1" htmlFor="password">
                Password
              </label>
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
              <span className="text-sm text-red-400">{passwordError}</span>
            </div>
            {/* Gender */}
            <div>
              <label className="block text-gray-200 mb-1" htmlFor="gender">
                Gender
              </label>
              <select
                id="gender"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-900 text-gray-100 border-blue-900"
                required
                value={gender}
                onChange={handleGenderChange}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <span className="text-sm text-red-400">{genderError}</span>
            </div>
            {/* Date of Birth */}
            <div>
              <label className="block text-gray-200 mb-1" htmlFor="dob">
                Date of Birth
              </label>
              <input
                id="dob"
                type="date"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-900 text-gray-100 border-blue-900"
                required
                value={dob}
                onChange={handleDobChange}
              />
              <span className="text-sm text-red-400">{dobError}</span>
            </div>
            {/* Mobile Number */}
            <div>
              <label className="block text-gray-200 mb-1" htmlFor="mobile">
                Mobile Number
              </label>
              <input
                id="mobile"
                type="tel"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-900 text-gray-100 border-blue-900"
                placeholder="Enter your mobile number"
                required
                value={mobileNumber}
                onChange={handleMobileChange}
              />
              <span className="text-sm text-red-400">{mobileError}</span>
            </div>
            {/* Address */}
            <div>
              <label className="block text-gray-200 mb-1" htmlFor="address">
                Address
              </label>
              <input
                id="address"
                type="text"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-900 text-gray-100 border-blue-900"
                placeholder="Enter your address"
                required
                value={address}
                onChange={handleAddressChange}
              />
              <span className="text-sm text-red-400">{addressError}</span>
            </div>
            {/* Height */}
            <div>
              <label className="block text-gray-200 mb-1" htmlFor="height">
                Height (feet)
              </label>
              <input
                id="height"
                type="text"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-900 text-gray-100 border-blue-900"
                placeholder="Enter your height"
                required
                value={height}
                onChange={handleHeightChange}
              />
              <span className="text-sm text-red-400">{heightError}</span>
            </div>
            {/* Weight */}
            <div>
              <label className="block text-gray-200 mb-1" htmlFor="weight">
                Weight (kg)
              </label>
              <input
                id="weight"
                type="text"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-900 text-gray-100 border-blue-900"
                placeholder="Enter your weight"
                required
                value={weight}
                onChange={handleWeightChange}
              />
              <span className="text-sm text-red-400">{weightError}</span>
            </div>
            {/* Disease */}
            <div>
              <label className="block text-gray-200 mb-1" htmlFor="disease">
                Disease (if any)
              </label>
              <input
                id="disease"
                type="text"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-900 text-gray-100 border-blue-900"
                placeholder="Mention any disease"
                value={disease}
                onChange={handleDiseaseChange}
              />
              <span className="text-sm text-red-400">{diseaseError}</span>
            </div>
            {/* Label for Gym to Start as Dropdown */}
            <div>
              <label className="block text-gray-200 mb-1" htmlFor="gymLabel">
                Label for Gym to Start
              </label>
              <select
                id="gymLabel"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-900 text-gray-100 border-blue-900"
                required
                value={selectedLabel}
                onChange={handleLabelChange}
              >
                <option value="">Select label</option>
                {labelOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <span className="text-sm text-red-400">{labelError}</span>
            </div>
            <input
              id="profilePic"
              type="file"
              accept="image/*"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-900 text-gray-100 border-blue-900"
              ref={fileInputRef}
              onChange={handleProfilePicChange}
            />
            <span className="text-sm text-red-400">{profileImgError}</span>
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
              Register
            </button>
          )}
          <span className="text-sm text-red-400">{registerError}</span>
        </form>
        <p className="mt-6 text-center text-gray-200">
          Already have an account?{" "}
          <a href="/login" className="text-blue-200 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </section>
  );
};

export default RegisterPage;

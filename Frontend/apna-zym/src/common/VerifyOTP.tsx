import axios from "axios";
import { useState, useRef, type ChangeEvent, type KeyboardEvent } from "react";
import ConfirmPassword from "./ConfirmPassword";

const OTP_LENGTH = 6;

const VerifyOtp: React.FC<{ email: string }> = ({ email }) => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [otpError, setOtpError] = useState("");
  const [showResetPasswordPage, setShowResetPasswordPage] = useState(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
console.log('???????????????????',email);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const value = e.target.value;

    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number
  ): void => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (): void => {
    // const enteredOtp = otp.join("");
    if(otp.join("").length<6){
      setOtpError("Please enter a valid 6-digit OTP");
      return;
    }
    if(email===""){
      setOtpError("something went wrong. Please try again later.");
      return;
    }
    axios
      .post("http://localhost:5000/api/auth/validateOTP", {
        otp: otp.join(""),
        email
      })
      .then((response) => {
        console.log("OTP verified successfully", response);
        if(response.data){
          setShowResetPasswordPage(true);
        }
      })
      .catch((error) => {
        console.error("Error verifying OTP", error);
        setOtpError("Invalid OTP. Please try again.");
      });
  };

  return (
  <>
    {showResetPasswordPage ? (
      <ConfirmPassword otp={otp.join("")} email={email} />
    ) : (
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
      <div className="rounded-xl p-8 w-full max-w-md justify-center mx-auto ">
        <h2 className="text-2xl font-semibold text-center text-gray-100">
          Verify OTP
        </h2>

        <p className="text-center text-gray-100 mt-2">
          Enter the {OTP_LENGTH}-digit code sent to your phone
        </p>

        <div className="flex justify-center gap-3 mt-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-lg font-semibold border rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>
        {otpError && (
          <div className="text-red-500 text-sm mt-2">{otpError}</div>
        )}
        <button
          onClick={handleVerify}
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
          Verify OTP
        </button>
      </div>
    </div>
    )}
  </>
  );
};

export default VerifyOtp;

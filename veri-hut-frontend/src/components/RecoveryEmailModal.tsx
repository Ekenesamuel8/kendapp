import React, { useEffect, useState } from "react";
import { FiMail } from "react-icons/fi";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RecoveryEmailModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<"email" | "verify">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes countdown

  // countdown timer for verification
  useEffect(() => {
    if (step === "verify" && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [step, timeLeft]);

  const handleCodeChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
    }
  };

  const formatTime = () => {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#BFBFBF]/70 z-50">
      {/* Modal Card */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {step === "email" && (
          <>
            <div className="flex justify-center mb-2">
              <FiMail className="text-3xl" />
            </div>

            {/* Title */}
            <h2 className="text-center text-lg font-semibold text-gray-800">
              Stay secure
            </h2>

            {/* Subtitle */}
            <p className="text-center text-sm text-gray-500 mb-6">
              Add an email to help recover your account if you lose access.
            </p>

            {/* Input */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your recovery email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6 focus:ring-1 focus:ring-[#ff6d75] outline-none"
            />

            {/* Buttons */}
            <div className="flex justify-between space-x-3">
              <button
                onClick={onClose}
                className="w-1/2 py-2 rounded-full border border-gray-400 text-gray-700 hover:bg-gray-100"
              >
                Close
              </button>
              <button
                onClick={() => setStep("verify")}
                className="w-1/2 py-2 rounded-full bg-[#ff6d75] text-white hover:bg-red-600"
              >
                Send confirmation
              </button>
            </div>
          </>
        )}
        {step === "verify" && (
          <>
            <h2 className="text-center text-lg font-semibold text-gray-800 mb-2">
              Verify email address
            </h2>
            <p className="text-center text-sm text-gray-500 mb-6">
              Enter the <span className="font-medium">6 digit code</span> sent
              to your email address <br />
              <span className="font-mono text-gray-700">
                {email || "j*******@gmail.com"}
              </span>
            </p>

            {/* Code Input */}
            <div className="flex justify-center space-x-2 mb-4">
              {code.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(e.target.value, idx)}
                  className="w-10 h-12 text-center text-lg border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 outline-none"
                />
              ))}
            </div>

            {/* Countdown */}
            <p className="text-center text-sm text-gray-500 mb-4">
              Code expires in{" "}
              <span className="font-semibold">{formatTime()}</span>
            </p>

            {/* Resend */}
            <p className="text-center text-sm text-gray-500 mb-6">
              Didn’t get code?{" "}
              <button className="text-red-500 font-medium hover:underline">
                Resend Code
              </button>
            </p>

            {/* Verify Button */}
            <button className="w-full py-3 rounded-lg bg-[#ff6d75] text-white hover:bg-red-600">
              Verify Email
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RecoveryEmailModal;

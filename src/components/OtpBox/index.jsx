import React, { useState } from "react";

const OtpBox = ({ length, onChange }) => {
  const[otp, setOtp] = useState(new Array(length).fill(""));

  const handleChange = (element, index) => {
    const value = element.value;
    if (isNaN(value)) return; // Onlyy number Allowed

    //Update OTP Value
    const newOpt = [...otp];
    newOpt[index] = value;
    setOtp(newOpt);
    onChange(newOpt.join(""));

    // focus on next input
    if (value && index < length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }

    const handleKeyDown = (event, index) => {
      if (event.key === "Backspace" && !otp[index] && index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    };
  };

  return (
    <div className="flex gap-2 justify-center otpBox">
      {otp.map((data, index) => (
        <input
          key={index}
          type="text"
          id={`otp-input-${index}`}
          maxLength={1}
          value={otp[index]}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) =>{ handleKeyDown(e, index)}}
          className="w-[45px] h-[45px] text-center text-[17px]"
        />
      ))}
    </div>
  );
};

export default OtpBox;

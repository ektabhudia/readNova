import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [users, setUsers] = useState({
    email: "",
    password: "",
  });

  const handleClick = async () => {
    try {
      await axios.post("http://localhost:3000/api/users/resetPassMailVerify", {
        email: users.email,
      });
      navigate("/NewPasswordScreen");
    } catch (err) {
      console.error(err);
    }
  };

  const onTextFieldChange = (e) => {
    users[e.target.name] = e.target.value;
    setUsers({ ...users });
  };

  return (
    <div className="flex flex-col items-center h-screen gap-4 bg-white">
      <div className="inline-flex flex-col items-center justify-center  pt-[30px] pb-[60px]">
        <div className="flex flex-col w-[420px] items-center  [font-family:'Noto_Sans-Regular',Helvetica] ">
          {/* Logo */}
          <p className="font-montserrat mx-auto text-2xl font-bold text-center">
            Read<span className="text-orange-500">Nova</span>
          </p>

          {/* Heading + Description */}
          <div className="flex flex-col w-[315px] items-start gap-2  [font-family:'Noto_Sans-Regular',Helvetica] ">
            <div className="font-bold text-[#6a6c6f] text-base text-center w-full">
              Welcome to READNOVA
            </div>

            <p className="font-normal [font-family:'Noto_Sans-Regular',Helvetica]  text-[#9a9ea5] text-[13px] text-center leading-[21px]">
              We’ve emailed you a 6-digit verification code. Please enter it
              below to confirm your email address
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="flex flex-col w-[420px]  gap-5 [font-family:'Noto_Sans-SemiBold',Helvetica] items-center  p-[30px] bg-[#fbfbfd] rounded-xl border border-[#4d31cb24]">
          <div className="flex flex-col items-start gap-3 w-full">
            {/* Email */}
            <p className="relative self-stretch mt-[-1.00px] [font-family:'Noto_Sans-SemiBold',Helvetica] font-semibold text-transparent text-[13px] tracking-[0] leading-[19px]">
              <span className="text-[#6a6c6f]">Email address</span>
              <span className="text-[#e74c3c]"> *</span>
            </p>
            <div className="flex h-[20px] items-center gap-2.5 px-3 py-2 relative self-stretch w-full flex-[0_0_auto] rounded border border-solid border-[#e7e9eb]">
              <input
                type="email"
                placeholder="you@example.com"
                onChange={onTextFieldChange}
                className="w-full h-full border-none mt-[-1px] font-sans text-[#9a9ea5] text-[13px] leading-[21px]  rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* 6-digit code */}
            <p className="relative self-stretch mt-[-1.00px] [font-family:'Noto_Sans-SemiBold',Helvetica] font-semibold text-transparent text-[13px] tracking-[0] leading-[19px]">
              <span className="text-[#6a6c6f]">Enter your 6-digit code</span>
              <span className="text-[#e74c3c]"> *</span>
            </p>
            <div>
              <div className="flex space-x-2 h-[40px] ">
                {[...Array(6)].map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength="1"
                    className="w-full h-full  mt-[-1px] font-sans text-[#9a9ea5] text-[13px] leading-[21px] rounded border border-solid border-[#e7e9eb] focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                ))}
              </div>
            </div>

            {/* Password */}
            <p className="relative self-stretch mt-[-1.00px] [font-family:'Noto_Sans-SemiBold',Helvetica] font-semibold text-transparent text-[13px] tracking-[0] leading-[19px]">
              <span className="text-[#6a6c6f]">Password</span>
              <span className="text-[#e74c3c]"> *</span>
            </p>
            <div className="flex h-[20px] items-center gap-2.5 px-3 py-2 relative self-stretch w-full flex-[0_0_auto] rounded border border-solid border-[#e7e9eb]">
              <input
                type="password"
                onChange={onTextFieldChange}
                className="w-full h-full border-none mt-[-1px] font-sans text-[#9a9ea5] text-[13px] leading-[21px]  rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <p className="text-xs text-[#9a9ea5] mt-1">
              Use 8+ characters with letters, numbers & symbols.
            </p>
            {/* Confirm Password */}
            <p className="relative self-stretch mt-[-1.00px] [font-family:'Noto_Sans-SemiBold',Helvetica] font-semibold text-transparent text-[13px] tracking-[0] leading-[19px]">
              <span className="text-[#6a6c6f]">Confirm New Password</span>
              <span className="text-[#e74c3c]"> *</span>
            </p>
            <div className="flex h-[20px] items-center gap-2.5 px-3 py-2 relative self-stretch w-full flex-[0_0_auto] rounded border border-solid border-[#e7e9eb]">
              <input
                type="password"
                className="w-full h-full border-none mt-[-1px] font-sans text-[#9a9ea5] text-[13px] leading-[21px]  rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                className="w-full h-full border-none mt-[-1px] font-sans text-[#9a9ea5] text-[13px] leading-[21px]  rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <label className="ml-2 block text-sm text-gray-600">
              Agree the Terms & Policy
            </label>
            {/* Button */}
            <button
              type="button"
              onClick={handleClick}
              className="bg-[#ff9f0a] relative border-none rounded-md w-[400px] h-[36px] mt-[-1.00px] [font-family:'Noto_Sans-DisplaySemiBold',Helvetica] font-semibold text-white text-[13px] tracking-[0] leading-[21px] whitespace-nowrap"
            >
              Update Password
            </button>
            <div className="items-center">
              {/* Links */}
              <p className="relative self-stretch [font-family:'Noto_Sans-Regular',Helvetica] font-normal text-transparent text-[13px] tracking-[0] leading-[19px]">
                <span className="text-[#9a9ea5]">
                  Don’t have a code?&nbsp;&nbsp;
                </span>

                <span className="text-[#ff9f0a] underline [font-family:'Noto_Sans-SemiBold',Helvetica] font-semibold ">
                  Resend{" "}
                </span>

                <span className="text-[#9a9ea5]">Or&nbsp;&nbsp;</span>

                <span className="[font-family:'Noto_Sans-SemiBold',Helvetica]  text-[#ff9f0a] underline font-semibold">
                  Call Us{" "}
                </span>
              </p>
              <p className="relative self-stretch [font-family:'Noto_Sans-Regular',Helvetica] font-normal text-transparent text-[13px] tracking-[0] leading-[19px]">
                <span className="text-[#9a9ea5]"> Return to&nbsp;&nbsp;</span>

                <span
                  className="[font-family:'Noto_Sans-SemiBold',Helvetica] font-semibold text-[#ff9f0a] underline cursor-pointer"
                  onClick={() => {
                    navigate("/SigninScreen");
                  }}
                >
                  Sign In
                </span>
              </p>

              {/* Footer */}
              <div className="text-center mt-8 text-xs text-gray-400">
                © 2015 - 2025 APP
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import "../Styles/gettemp.css";
import group11 from "../images/image16.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API from "./api.js";
export default function SigninScreen() {
  const navigate = useNavigate();
  const [users, setUsers] = useState({
    email: "",
    password: "",
  });
  const handleClick = async () => {
    try {
      await axios.post("http://localhost:3000/auth/login", {
        email: users.email,
        password: users.password,
      });
      alert("User added!");
      navigate("/HomeScreen"); // route programmatically
    } catch (err) {
      console.error(err);
    }
  };
  const onTextFieldChange = (e) => {
    users[e.target.name] = e.target.value;
    setUsers({ ...users });
  };
  const goToResetPassword = () => {
    navigate("/ResetPasswordScreen"); // route programmatically
  };
  return (
    <div className="flex flex-col items-center h-screen gap-4">
      <div className="inline-flex flex-col items-center justify-center gap-[30px] pt-[30px] pb-[60px] px-0 relative">
        <div className="flex flex-col w-[420px] items-center gap-5 relative flex-[0_0_auto]">
          {/* <img
          className="relative w-[166.26px] h-[30px] aspect-[5.54]"
          alt="Group"
          src={group11}
        /> */}
          <p className="font-montserrat mx-auto text-2xl font-bold text-center">
            Read<span className="text-orange-500">Nova</span>
          </p>
          <div className="flex flex-col w-[315px] items-start gap-2 relative flex-[0_0_auto]">
            <div className="relative self-stretch mt-[-1.00px] [font-family:'Noto_Sans-Bold',Helvetica] font-bold text-[#6a6c6f] text-base text-center tracking-[0] leading-6">
              Welcome to READNOVA
            </div>

            <p className="relative self-stretch [font-family:'Noto_Sans-Regular',Helvetica] font-normal text-[#9a9ea5] text-[13px] text-center tracking-[0] leading-[21px]">
              Let’s get you signed in. Enter your email and password to
              continue.
            </p>
          </div>
        </div>

        <div className="flex flex-col w-[420px] items-center gap-[30px] p-[30px] relative flex-[0_0_auto] bg-[#fbfbfd] rounded-xl overflow-hidden border border-solid border-[#4d31cb24]">
          <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
              <p className="relative self-stretch mt-[-1.00px] [font-family:'Noto_Sans-SemiBold',Helvetica] font-semibold text-transparent text-[13px] tracking-[0] leading-[19px]">
                <span className="text-[#6a6c6f]">Email address</span>

                <span className="text-[#e74c3c]"> *</span>
              </p>

              <div className="flex h-[20px] items-center gap-2.5 px-3 py-2 relative self-stretch w-full flex-[0_0_auto] rounded border border-solid border-[#e7e9eb]">
                <input
                  type="text"
                  name="email"
                  placeholder="you@example.com"
                  value={users.email}
                  onChange={(e) => {
                    onTextFieldChange(e);
                  }}
                  className="w-full h-full border-none mt-[-1px] font-sans text-[#9a9ea5] text-[13px] leading-[21px]  rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
              <p className="relative self-stretch mt-[-1.00px] [font-family:'Noto_Sans-SemiBold',Helvetica] font-semibold text-transparent text-[13px] tracking-[0] leading-[19px]">
                <span className="text-[#6a6c6f]">Password </span>

                <span className="text-[#e74c3c]">*</span>
              </p>

              <div className="flex h-[20px] items-center gap-2.5 px-3 py-2 relative self-stretch w-full flex-[0_0_auto] rounded border border-solid border-[#e7e9eb]">
                <input
                  type="text"
                  name="password"
                  placeholder="......"
                  value={users.password}
                  onChange={(e) => {
                    onTextFieldChange(e);
                  }}
                  className="w-full h-full border-none mt-[-1px] font-sans text-[#9a9ea5] text-[13px] leading-[21px]  rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
              <div className="inline-flex items-start gap-2 relative flex-[0_0_auto]">
                <div className="relative w-[18px] h-[18px] bg-[#e7e9eb] rounded border border-solid aspect-[1]" />

                <div className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans-Regular',Helvetica] font-normal text-[#6a6c6f] text-[13px] tracking-[0] leading-[19px] whitespace-nowrap">
                  Keep me signed in
                </div>
              </div>

              <div className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans-Regular',Helvetica] font-normal text-[#9a9ea5] text-[13px] tracking-[0] leading-[19px] underline whitespace-nowrap">
                <span className="cursor-pointer" onClick={goToResetPassword}>
                  Forgot Password?
                </span>
              </div>
            </div>

            <div class="">
              <button
                type="submit"
                class="bg-[#ff9f0a] relative border-none rounded-md w-[400px] h-[36px] mt-[-1.00px] [font-family:'Noto_Sans-DisplaySemiBold',Helvetica] font-semibold text-white text-[13px] tracking-[0] leading-[21px] whitespace-nowrap"
                data-twe-ripple-init
                data-twe-ripple-color="light"
                onClick={handleClick}
              >
                Sign In
              </button>
            </div>
          </div>

          <p className="relative self-stretch [font-family:'Noto_Sans-Regular',Helvetica] font-normal text-transparent text-[13px] tracking-[0] leading-[19px]">
            <span className="text-[#9a9ea5]">New here?&nbsp;&nbsp;</span>

            <span className="text-[#ff9f0a] underline"> </span>

            <span className="[font-family:'Noto_Sans-SemiBold',Helvetica] font-semibold text-[#ff9f0a] underline">
              Create an account
            </span>
          </p>
        </div>

        <p className="relative w-fit [font-family:'Noto_Sans-Regular',Helvetica] font-normal text-[#9a9ea5] text-sm text-center tracking-[0] leading-[21px] whitespace-nowrap">
          © 2015 - 2025 APP
        </p>
      </div>
    </div>
  );
}

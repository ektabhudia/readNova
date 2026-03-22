import React from "react";
import bgImage from "../images/image16.png";
import "../Styles/gettemp.css";
import "@fontsource/montserrat"; // Default (400 weight)
import "@fontsource/montserrat/500.css"; // Semi-bold
import { useNavigate } from "react-router-dom";
export default function GetStarted() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/SignUpScreen"); // route programmatically
  };
  return (
    <div>
      <div
        className="h-screen justify-center w-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <div class="flex flex-col items-center justify-center h-screen gap-4">
          <div>
            <p className="font-montserrat text-5xl font-bold">
              Read<span className="text-orange-500">Nova</span>
            </p>
          </div>
          <div class="relative self-stretch mt-[-1.00px] [font-family:'Noto_Sans-Bold',Helvetica] font-bold text-[#6a6c6f] text-base text-center tracking-[0] leading-6">
            “Your English Learning Journey Starts Here.”
          </div>
          <div class="relative self-stretch [font-family:'Noto_Sans-Regular',Helvetica] font-normal text-[#9a9ea5] text-sm text-center tracking-[0] leading-[21px]">
            Follow the roadmap, practice daily, and improve your fluency.
          </div>
          <div class="">
            <button
              type="submit"
              class="bg-[#ff9f0a] relative border-none rounded-md w-[400px] h-[36px] mt-[-1.00px] [font-family:'Noto_Sans-DisplaySemiBold',Helvetica] font-semibold text-white text-[13px] tracking-[0] leading-[21px] whitespace-nowrap"
              data-twe-ripple-init
              data-twe-ripple-color="light"
              onClick={handleClick}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

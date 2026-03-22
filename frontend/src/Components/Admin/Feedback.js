import React from "react";
import { FaStar, FaUserCircle } from "react-icons/fa";

const feedbacks = [
  {
    id: 1,
    name: "abcd ersfd",
    time: "2 hours ago",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim",
    rating: 5,
  },
  {
    id: 2,
    name: "abcd ersfd",
    time: "2 hours ago",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim",
    rating: 4,
  },
  {
    id: 3,
    name: "abcd ersfd",
    time: "2 hours ago",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim",
    rating: 5,
  },
  {
    id: 4,
    name: "abcd ersfd",
    time: "2 hours ago",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim",
    rating: 5,
  },
  {
    id: 5,
    name: "abcd ersfd",
    time: "2 hours ago",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim",
    rating: 4,
  },
];

const FeedbackCard = ({ feedback }) => {
  return (
    <div className="bg-orange-50 rounded-lg p-6 shadow-sm flex flex-col gap-2 [font-family:'Noto_Sans-Bold',Helvetica] ">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="text-orange-400 text-3xl">
            <FaUserCircle />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{feedback.name}</h3>
            <p className="text-gray-500 text-sm">{feedback.time}</p>
          </div>
        </div>
        <div className="flex text-orange-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar
              key={i}
              className={`${
                i < feedback.rating ? "text-orange-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-gray-800">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        </h4>
        <p className="text-gray-600 text-sm">{feedback.text}</p>
      </div>
    </div>
  );
};

const FeedbackPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col [font-family:'Noto_Sans-Bold',Helvetica] ">
      {/* Navbar */}
      <header className="w-full bg-white shadow-sm py-4 px-6 flex justify-center border-b">
        <h1 className="text-2xl font-bold text-orange-500">ReadNova</h1>
      </header>

      {/* Content */}
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 py-10">
        <h2 className="text-2xl font-bold mb-6">Feedbacks</h2>
        <div className="flex flex-col gap-6">
          {feedbacks.map((fb) => (
            <FeedbackCard key={fb.id} feedback={fb} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black py-6 text-center text-white">
        <h3 className="font-bold text-orange-500">ReadNova</h3>
        <p className="text-gray-400 text-sm mt-2">
          © 2025 ReadNova. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default FeedbackPage;

import React, { useState } from "react";

// QuizNavigator: handles navigation and state for quiz questions
const QuizNavigator = ({ quizList }) => {
  const [current, setCurrent] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [userAnswers, setUserAnswers] = useState(
    Array(quizList.length).fill(null)
  );

  // Handler to update answer correctness
  const handleAnswered = (isCorrect, answer) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[current] = { isCorrect, answer };
    setUserAnswers(updatedAnswers);
    setCorrectCount(updatedAnswers.filter((a) => a && a.isCorrect).length);
  };

  const goNext = () =>
    setCurrent((prev) => Math.min(prev + 1, quizList.length - 1));
  const goPrev = () => setCurrent((prev) => Math.max(prev - 1, 0));

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">
          Question {current + 1} of {quizList.length} &nbsp;|&nbsp; Correct:{" "}
          {correctCount}
        </span>
        <div>
          <button
            onClick={goPrev}
            disabled={current === 0}
            className="px-2 py-1 mr-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={goNext}
            disabled={current === quizList.length - 1}
            className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      <QuizBox
        quiz={quizList[current]}
        onAnswered={handleAnswered}
        userAnswer={userAnswers[current]}
        key={current}
      />
    </div>
  );
};

// QuizBox: two-column quiz interaction and answer reveal
const QuizBox = ({ quiz, onAnswered, userAnswer }) => {
  const [selected, setSelected] = useState(userAnswer?.answer || "");
  const [submitted, setSubmitted] = useState(!!userAnswer);
  const [shortAnswer, setShortAnswer] = useState(userAnswer?.answer || "");
  const isMCQ = quiz.OptionDetails && quiz.OptionDetails.length > 0;

  const handleOptionChange = (e) => setSelected(e.target.value);
  const handleShortChange = (e) => setShortAnswer(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    let isCorrect = false;
    let answer = "";
    if (isMCQ) {
      isCorrect = selected === quiz.Answer;
      answer = selected;
    } else {
      isCorrect =
        shortAnswer.trim().toLowerCase() === quiz.Answer.trim().toLowerCase();
      answer = shortAnswer;
    }
    if (onAnswered) onAnswered(isCorrect, answer);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      {/* Left: Quiz interaction */}
      <form className="flex-1" onSubmit={handleSubmit}>
        <p className="font-medium text-gray-800 mb-2">
          {quiz.QueNo}. {quiz.Question}
        </p>
        {isMCQ ? (
          <div className="space-y-2">
            {quiz.OptionDetails.map((opt, oidx) => (
              <label
                key={oidx}
                className={`block px-2 py-1 rounded cursor-pointer border ${
                  submitted
                    ? opt.OptionValue === quiz.Answer
                      ? "border-green-500 bg-green-50"
                      : selected === opt.OptionValue
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200"
                    : "border-gray-200 hover:bg-orange-50"
                }`}
              >
                <input
                  type="radio"
                  name={`quiz-${quiz.QueNo}`}
                  value={opt.OptionValue}
                  checked={selected === opt.OptionValue}
                  onChange={handleOptionChange}
                  disabled={submitted}
                  className="mr-2"
                />
                {opt.OptionValue}
              </label>
            ))}
            {!submitted && (
              <button
                type="submit"
                className="mt-2 px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                Check
              </button>
            )}
          </div>
        ) : (
          <div>
            <textarea
              className="w-full border border-gray-300 rounded p-2 mb-2"
              rows={2}
              value={shortAnswer}
              onChange={handleShortChange}
              disabled={submitted}
              placeholder="Type your answer..."
            />
            {!submitted && (
              <button
                type="submit"
                className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                Check
              </button>
            )}
          </div>
        )}
      </form>
      {/* Right: Show answer after submit */}
      <div className="flex-1 bg-white border border-gray-200 rounded p-3 min-h-[60px]">
        {submitted ? (
          <>
            <p className="font-semibold text-green-700">Correct Answer:</p>
            <p className="text-gray-800 mt-1">{quiz.Answer}</p>
            {isMCQ && selected && (
              <p
                className={`mt-2 font-bold ${
                  selected === quiz.Answer ? "text-green-600" : "text-red-500"
                }`}
              >
                {selected === quiz.Answer
                  ? "Your answer is correct!"
                  : "Your answer is incorrect."}
              </p>
            )}
            {!isMCQ && shortAnswer && (
              <p
                className={`mt-2 font-bold ${
                  shortAnswer.trim().toLowerCase() ===
                  quiz.Answer.trim().toLowerCase()
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {shortAnswer.trim().toLowerCase() ===
                quiz.Answer.trim().toLowerCase()
                  ? "Your answer is correct!"
                  : "Your answer is incorrect."}
              </p>
            )}
          </>
        ) : (
          <p className="text-gray-400">
            Submit your answer to see the correct answer.
          </p>
        )}
      </div>
    </div>
  );
};

// FeedbackSection: two-column feedback UI
const FeedbackSection = () => {
  const [stars, setStars] = useState(0);
  const [message, setMessage] = useState("");
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      user: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      stars: 5,
      message: "Great topic! Very helpful and clear.",
    },
    {
      id: 2,
      user: "Jane Smith",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      stars: 4,
      message: "Good explanation, but could use more examples.",
    },
  ]);
  const [saving, setSaving] = useState(false);

  const handleStarClick = (n) => setStars(n);
  const handleMessageChange = (e) => setMessage(e.target.value);
  const handleSave = (e) => {
    e.preventDefault();
    if (!stars || !message.trim()) return;
    setSaving(true);
    setTimeout(() => {
      setFeedbacks([
        {
          id: Date.now(),
          user: "You",
          avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
          stars,
          message,
        },
        ...feedbacks.slice(0, 1),
      ]);
      setStars(0);
      setMessage("");
      setSaving(false);
    }, 700);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 mt-8">
      {/* Left: Feedback form */}
      <form
        className="flex-1 shadow-sm border-none rounded-xl p-6"
        style={{ background: "#e7e7e7", padding: "5px" }}
        onSubmit={handleSave}
      >
        <h4 className="font-semibold text-gray-700 mb-3">Leave Feedback</h4>
        <div className="flex items-center mb-3">
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              onClick={() => handleStarClick(n)}
              className={`text-2xl cursor-pointer transition-colors ${
                n <= stars ? "text-yellow-400" : "text-gray-300"
              } drop-shadow-sm`}
              role="button"
              aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          className="w-full bg-gray-100 text-gray-700 rounded-lg p-3 mb-3 border-none focus:ring-2 focus:ring-gray-300 placeholder-gray-400 resize-none shadow-inner"
          rows={2}
          value={message}
          onChange={handleMessageChange}
          placeholder="Write your feedback..."
          disabled={saving}
          style={{ outline: "none", border: "none" }}
        />
        <button
          type="submit"
          className="px-5 py-2 bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded-lg shadow-md hover:from-gray-500 hover:to-gray-700 transition-colors border-none focus:outline-none disabled:opacity-50"
          disabled={saving || !stars || !message.trim()}
          style={{ border: "none" }}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </form>
      {/* Right: Show up to 2 feedbacks */}
      <div
        className="flex-1 shadow-sm border-none rounded-xl p-6"
        style={{ background: "#e7e7e7", padding: "5px" }}
      >
        <h4 className="font-semibold text-gray-700 mb-3">Recent Feedback</h4>
        {feedbacks.slice(0, 2).map((fb) => (
          <div
            key={fb.id}
            className="flex items-start gap-3 mb-5 border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
          >
            <img
              src={fb.avatar}
              alt={fb.user}
              className="w-11 h-11 rounded-full object-cover border-2 border-gray-200 shadow"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-700 text-base">
                  {fb.user}
                </span>
                <span className="text-yellow-400 text-lg">
                  {"★".repeat(fb.stars)}
                  <span className="text-gray-300">
                    {"★".repeat(5 - fb.stars)}
                  </span>
                </span>
              </div>
              <p className="text-gray-600 text-sm mt-1 font-medium">
                {fb.message}
              </p>
            </div>
          </div>
        ))}
        {feedbacks.length === 0 && (
          <p className="text-gray-400">No feedback yet.</p>
        )}
      </div>
    </div>
  );
};

const TopicItem = ({ topic, isMainTopic = false }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  return (
    <div key={topic.TopicID}>
      {/* Topic Header */}
      <div
        className={`flex items-center justify-between ${
          isMainTopic
            ? "bg-orange-100 px-3 py-2 rounded-md"
            : "bg-blue-100 px-3 py-2 rounded-md"
        }`}
      >
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <span
            className={`w-3 h-3 rounded-full mr-2 ${
              isMainTopic ? "bg-orange-500" : "bg-blue-500"
            }`}
          ></span>
          {topic.BDSTitle}
        </h2>
        <button
          onClick={toggleOpen}
          className={`${
            isMainTopic ? "text-orange-600" : "text-blue-600"
          } font-bold bg-transparent border-none text-sm focus:outline-none`}
        >
          {open ? "▲" : "Details ›"}
        </button>
      </div>

      {/* Details Section */}
      {open && (
        <div className="mt-2 space-y-4 ml-6">
          {/* Description */}
          {topic.BDSDescription && (
            <div
              className="text-gray-600 text-sm leading-relaxed"
              style={{ background: "#e7e7e7", padding: "20px" }}
              dangerouslySetInnerHTML={{ __html: topic.BDSDescription }}
            />
          )}

          {/* Examples */}
          {topic.Examples?.length > 0 && (
            <div className="bg-gray-100 p-3 rounded-md">
              <h4 className="font-semibold text-gray-800 mb-2">Examples</h4>
              <ul className="list-disc list-inside text-gray-700 text-sm">
                {topic.Examples.map((ex, idx) => (
                  <li key={idx}>{ex}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Video */}
          {topic.Video && (
            <div className="bg-gray-100 p-3 rounded-md">
              <h4 className="font-semibold text-gray-800 mb-2">Video</h4>
              <iframe
                width="100%"
                height="250"
                src={topic.Video}
                title="Video Lesson"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          )}

          {/* Quiz */}
          {Array.isArray(topic.QuizDetails) && topic.QuizDetails.length > 0 && (
            <div
              className="p-3 rounded-md"
              style={{ background: "#e7e7e7", padding: "20px" }}
            >
              <h4 className="font-semibold text-gray-800 mb-2">Quiz</h4>
              <QuizNavigator quizList={topic.QuizDetails} />
            </div>
          )}

          {/* Feedback section moved above subtopics */}
          <FeedbackSection />

          {/* Subtopics recursively */}
          {topic.SubTopics?.length > 0 && (
            <div className="mt-4 space-y-4">
              {topic.SubTopics.map((sub) => (
                <TopicItem key={sub.TopicID} topic={sub} isMainTopic={false} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TopicItem;

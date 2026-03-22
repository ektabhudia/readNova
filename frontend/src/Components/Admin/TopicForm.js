import { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { FiUploadCloud } from "react-icons/fi";
import Collapsible from "./Collapsible.js";
import "../../Styles/collapsibleStyle.css";
import "../../Styles/TopicStyles.css";
import "./TopicForm.css";

export default function TopicForm({
  topic,
  onAddSubTopic,
  handleFileChange,
  topicIndex,
  onTextBoxChange,
  onQuizChange,
  addQuestion,
  onAnswerChange,
}) {
  let [testType, setTestType] = useState(1); // local per topic

  useEffect(() => {}, []);

  const onChangeTextBox = (e) => {
    onTextBoxChange(e, topic.TopicID);
  };
  const onQuizTypeChange = (e) => {
    const value = e.target.value;
    setTestType(value);
    onQuizChange(e, 0, topic.TopicID);
  };
  const onQuestionChange = (e, index) => {
    onQuizChange(e, index, topic.TopicID);
  };

  const onQueAddClick = (topicIndex) => {
    addQuestion(topic.TopicID, topic.IsMainTopic);
    console.log(topic);
  };
  const onCorrectAnswerChange = (e, topicIndex, quizIndex, optionIndex) => {
    onAnswerChange(e, topic.TopicID, quizIndex, optionIndex);
  };

  const handleEditorChange = (content, editor, fieldName) => {
    onTextBoxChange(
      { target: { name: fieldName, value: content } },
      topic.TopicID
    );
  };

  // Per-topic file upload handler
  const handleTopicFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    handleFileChange(file, topic.TopicID);
  };
  return (
    <div
      className={
        topic.IsMainTopic === 1
          ? "mx-auto mt-10 mb-10 w-4/5 [font-family:'system-ui'] "
          : "w[85%] mt-2 [font-family:'system-ui'] "
      }
    >
      <Collapsible
        open={false}
        header={
          topic.IsMainTopic === 1
            ? "Add New Topic"
            : "Add Sub Topic " + (topicIndex + 1)
        }
      >
        {/* ------- Basic Section ------- */}
        <div className="border-2 border-gray-300 border-solid p-4 w-[95%] rounded-lg">
          <label className="text-2xl font-bold">Basic Details Section</label>

          <div className="pt-2">
            <label className="color-gray-400">Title</label>
            <input
              type="text"
              name="BDSTitle"
              value={topic.BDSTitle}
              className="border-2 border-gray-300 border-solid p-2 w-[98%] h-[35px] rounded-lg mb-4 "
              placeholder="Enter topic title"
              onChange={(e) => {
                onChangeTextBox(e, topicIndex, topic.TopicID);
              }}
            />
          </div>

          <div>
            <label className="color-gray-400">Description</label>
            <Editor
              key={topic.TopicID + "-desc"}
              apiKey="cc4j2opufahhtlq9k4yl3rhot53sg7xtvdabvun4kj31od9o"
              initialValue={topic.BDSDescription}
              init={{ height: 400, menubar: true }}
              onEditorChange={(content, editor) =>
                handleEditorChange(content, editor, "BDSDescription")
              }
            />
          </div>

          <div>
            <label className="color-gray-400">Example</label>
            <Editor
              key={topic.TopicID + "-ex"}
              apiKey="cc4j2opufahhtlq9k4yl3rhot53sg7xtvdabvun4kj31od9o"
              initialValue={topic.BDSExample}
              init={{ height: 400, menubar: true }}
              onEditorChange={(content, editor) =>
                handleEditorChange(content, editor, "BDSExample")
              }
            />
          </div>
        </div>

        {/* ------- Video Section ------- */}
        <div className="border-2 border-gray-300 border-solid p-4 w-[95%] rounded-lg mt-8">
          <label className="text-2xl font-bold">Video Details Section</label>

          <div className="pt-2">
            <label>Video Lesson Title</label>
            <input
              type="text"
              name="VSLessonTitle"
              value={topic.VSLessonTitle}
              className="border-2 border-gray-300 border-solid p-2 w-[98%] h-[35px] rounded-lg mb-4 "
              placeholder="Video Lesson Title"
              onChange={(e) => {
                onChangeTextBox(e, topicIndex, topic.TopicID);
              }}
            />
          </div>

          <div>
            <label>Video URL</label>
            <input
              type="text"
              name="VSVideoURL"
              value={topic.VSVideoURL}
              className="border-2 border-gray-300 border-solid p-2 w-[98%] h-[35px] rounded-lg mb-4 "
              placeholder="Video URL"
              onChange={(e) => {
                onChangeTextBox(e, topicIndex, topic.TopicID);
              }}
            />
          </div>

          <div>
            <div>
              <label>Thumbnail Upload</label>
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-xl p-6 bg-gray-50 hover:bg-gray-100 transition cursor-pointer min-h-[200px]">
                {!topic.VSThumbnailFile ? (
                  <>
                    <FiUploadCloud className="text-6xl text-blue-600 mb-2" />
                    <p className="text-gray-500 text-sm">
                      Click the icon to select a file
                    </p>
                  </>
                ) : topic.VSThumbnailFilePreview ? (
                  <img
                    src={topic.VSThumbnailFilePreview}
                    alt="preview"
                    className="max-h-48 rounded-lg shadow-md"
                  />
                ) : (
                  <span className="text-gray-600 font-medium">
                    {topic.VSThumbnailFile.name}
                  </span>
                )}

                {/* Hidden input but wrapped by label, so it auto-triggers */}
                <input
                  type="file"
                  onChange={handleTopicFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* ------- Quiz Section ------- */}
        <div className="border-2 border-gray-300 border-solid p-4 w-[95%] rounded-lg mt-8">
          <div className="mx-auto bg-white border border-gray-300 rounded-md shadow-sm">
            {/* Title */}
            <h2 className="text-xl font-semibold mb-4">Quiz Section</h2>

            {/* Choose Test Type */}
            <div className="border-2 border-gray-300 border-solid p-4 w-[95%] rounded-lg">
              <p className="mb-2 font-medium">Choose Test Type</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`QuizType`}
                    value="1"
                    checked={testType == 1}
                    onChange={onQuizTypeChange}
                    className="accent-orange-500"
                  />
                  Multiple Choice Question (MCQ)
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`QuizType`}
                    value="2"
                    checked={testType == 2}
                    onChange={onQuizTypeChange}
                    className="accent-orange-500"
                  />
                  Short Question & Answer
                </label>
              </div>
              {/* Add Question */}
              {testType == 1 ? (
                <div className="border border-gray-300 rounded-md p-4 mt-4">
                  <h3 className="font-medium mb-3">Add Question</h3>
                  <div className="pt-2">
                    <label className="color-gray-400">
                      {"Question " + (topic.QuizDetails.length + 1)}
                    </label>
                    <input
                      type="text"
                      className="border-2 border-gray-300 border-solid p-2 w-[98%] h-[35px] rounded-lg mb-4 "
                      placeholder="Enter your question"
                      name="Question"
                      value={topic.queObj.Question}
                      onChange={(e) => {
                        onQuestionChange(e, topicIndex, topic.TopicID);
                      }}
                    />
                    {/* Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      <input
                        type="text"
                        className="border-2 border-gray-300 border-solid p-2 w-[80%] h-[35px] rounded-lg mb-4 "
                        placeholder="Option 1"
                        name="OptionValue"
                        value={topic.queObj.OptionDetails[0].OptionValue}
                        onChange={(e) => {
                          onQuestionChange(e, 0, topic.TopicID);
                        }}
                      />
                      <input
                        type="text"
                        className="border-2 border-gray-300 border-solid p-2 w-[80%] h-[35px] rounded-lg mb-4 "
                        placeholder="Option 2"
                        name="OptionValue"
                        value={topic.queObj.OptionDetails[1].OptionValue}
                        onChange={(e) => {
                          onQuestionChange(e, 1, topic.TopicID);
                        }}
                      />
                      <input
                        type="text"
                        className="border-2 border-gray-300 border-solid p-2 w-[80%] h-[35px] rounded-lg mb-4 "
                        placeholder="Option 3"
                        name="OptionValue"
                        value={topic.queObj.OptionDetails[2].OptionValue}
                        onChange={(e) => {
                          onQuestionChange(e, 2, topic.TopicID);
                        }}
                      />
                      <input
                        type="text"
                        className="border-2 border-gray-300 border-solid p-2 w-[80%] h-[35px] rounded-lg mb-4 "
                        placeholder="Option 4"
                        name="OptionValue"
                        value={topic.queObj.OptionDetails[3].OptionValue}
                        onChange={(e) => {
                          onQuestionChange(e, 3, topic.TopicID);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-6 border border-gray-300 rounded-md p-4 mt-4">
                  <h3 className="font-medium mb-3">Add Question</h3>
                  <input
                    type="text"
                    className="border-2 border-gray-300 border-solid p-2 w-[98%] h-[35px] rounded-lg mb-4 "
                    placeholder="Enter your question"
                    name="Question"
                    value={topic.queObj.Question}
                    onChange={(e) => {
                      onQuestionChange(e, topicIndex, topic.TopicID);
                    }}
                  />
                  <input
                    type="text"
                    className="border-2 border-gray-300 border-solid p-2 w-[98%] h-[35px] rounded-lg mb-4 "
                    placeholder="Enter Correct Answer"
                    name="OptionValue"
                    value={topic.queObj.OptionDetails[0].OptionValue}
                    onChange={(e) => {
                      onQuestionChange(e, 0, topic.TopicID);
                    }}
                  />
                </div>
              )}
              {/* Show file reference if available */}
              {topic.fileUrl && (
                <div className="mt-2 text-green-700 text-sm">
                  File uploaded:{" "}
                  <a
                    href={topic.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {topic.fileUrl}
                  </a>
                </div>
              )}
              <button
                className="bg-orange-500 border-none text-white px-6 py-2 rounded-md hover:bg-orange-600 transition"
                onClick={() => {
                  onQueAddClick(topicIndex);
                }}
              >
                Add
              </button>
            </div>
            <div>
              {topic.QuizDetails.length > 0 && (
                <div className="border-2 border-gray-300 border-solid p-4 w-[95%] rounded-lg">
                  <h3 className="font-medium mb-3">Preview</h3>
                  {topic.QuizDetails.map((quiz, quizIndex) => {
                    return (
                      <>
                        {quiz.QuizType == 1 && (
                          <div className="mb-4">
                            <p className="">
                              {quizIndex + 1 + ".) "}
                              {quiz.Question}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                              {quiz.OptionDetails.map((option, optionIndex) => {
                                return (
                                  <button
                                    key={optionIndex}
                                    className="option-btn bg-gray-50 px-4 py-2 border-2 border-gray-300 border-solid p-2 w-[98%] h-[35px] rounded-lg mb-4"
                                    onClick={(e) => {
                                      onCorrectAnswerChange(
                                        e,
                                        topicIndex,
                                        quizIndex,
                                        optionIndex
                                      );
                                    }}
                                    style={{
                                      backgroundColor:
                                        quiz.Answer === option.OptionValue
                                          ? "#f97316"
                                          : "",
                                      color:
                                        quiz.Answer === option.OptionValue
                                          ? "white"
                                          : "",
                                    }}
                                  >
                                    {option.OptionValue}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                        {quiz.QuizType == 2 && (
                          <div className="mb-4">
                            <p className="mb-2">
                              {quizIndex + 1 + ".) "} {quiz.Question}
                            </p>
                            <input
                              type="text"
                              value={quiz.OptionDetails[0].OptionValue}
                              readOnly
                              className="border-2  border-gray-300 border-solid p-2 w-[98%] h-[35px] rounded-lg mb-4 "
                            />
                          </div>
                        )}
                      </>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Add SubTopic Button */}
        <button
          className="bg-orange-500 border-none text-white px-6 py-2 rounded-md hover:bg-orange-600 transition mt-5"
          onClick={() => onAddSubTopic(topic.TopicID)}
        >
          Add Sub Topic
        </button>

        {/* Render Subtopics recursively */}
        {topic.subTopics?.length > 0 &&
          topic.subTopics.map((sub, idx) => (
            <TopicForm
              key={sub.TopicID}
              topic={sub}
              onAddSubTopic={onAddSubTopic}
              handleFileChange={handleFileChange}
              topicIndex={idx}
              onTextBoxChange={onTextBoxChange}
              onQuizChange={onQuizChange}
              addQuestion={addQuestion}
              onAnswerChange={onAnswerChange}
            />
          ))}
      </Collapsible>
    </div>
  );
}

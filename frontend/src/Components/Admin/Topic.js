import { useState } from "react";
import TopicForm from "./TopicForm";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function Topics() {
  const token = localStorage.getItem("token");
  const [topics, setTopics] = useState([
    {
      CourseID: 1,
      TopicID: uuidv4(),
      ParentTopicID: null,
      TopicName: "Main Topic",
      BDSTitle: "",
      BDSDescription: "",
      BDSExample: "",
      VSLessonTitle: "",
      VSVideoURL: "",
      VSThumbnailFile: "",
      VSThumbnailFilePreview: null,
      IsMainTopic: 1,
      QuizDetails: [],
      subTopics: [],
      queObj: {
        QuizType: 1,
        QueNo: 0,
        Question: "",
        Answer: "",
        QuestionSortOrder: "",
        OptionDetails: [
          {
            OptionNo: "",
            OptionSortOrder: "",
            OptionValue: "",
          },
          {
            OptionNo: "",
            OptionSortOrder: "",
            OptionValue: "",
          },
          {
            OptionNo: "",
            OptionSortOrder: "",
            OptionValue: "",
          },
          {
            OptionNo: "",
            OptionSortOrder: "",
            OptionValue: "",
          },
        ],
      },
    },
  ]);
  const [fileUploads, setFileUploads] = useState([]); // [{ topicId, file }, ...]

  // Recursively add a new subtopic to the correct parent topic/subtopic
  const addSubTopicByParentId = (topicsArr, parentId, newTopic) => {
    return topicsArr.map((topic) => {
      if (topic.TopicID === parentId) {
        return {
          ...topic,
          subTopics: [...(topic.subTopics || []), newTopic],
        };
      }
      if (topic.subTopics && topic.subTopics.length > 0) {
        return {
          ...topic,
          subTopics: addSubTopicByParentId(topic.subTopics, parentId, newTopic),
        };
      }
      return topic;
    });
  };

  const createNewTopic = (data = {}) => ({
    CourseID: 1,
    TopicID: uuidv4(),
    ParentTopicID: null,
    TopicName: "Sub Topic",
    BDSTitle: "",
    BDSDescription: "",
    BDSExample: "",
    VSLessonTitle: "",
    VSVideoURL: "",
    VSThumbnailFile: "",
    VSThumbnailFileObject: null,
    IsMainTopic: 0,
    QuizDetails: [],
    subTopics: [],
    queObj: {
      QuizType: 1,
      QueNo: 0,
      Question: "",
      Answer: "",
      QuestionSortOrder: "",
      OptionDetails: [
        { OptionNo: "", OptionSortOrder: "", OptionValue: "" },
        { OptionNo: "", OptionSortOrder: "", OptionValue: "" },
        { OptionNo: "", OptionSortOrder: "", OptionValue: "" },
        { OptionNo: "", OptionSortOrder: "", OptionValue: "" },
      ],
    },
    ...data,
  });

  const onAddSubTopic = (parentId) => {
    const newTopic = createNewTopic({
      ParentTopicID: parentId,
      IsMainTopic: 0,
    });
    setTopics((prev) => addSubTopicByParentId(prev, parentId, newTopic));
  };
  const updateTopicFieldById = (topicsArr, topicId, field, value) => {
    return topicsArr.map((topic) => {
      if (topic.TopicID === topicId) {
        if (typeof field === "object" && field !== null) {
          // merge object updates
          return { ...topic, ...field };
        } else {
          return { ...topic, [field]: value };
        }
      }
      if (topic.subTopics && topic.subTopics.length > 0) {
        return {
          ...topic,
          subTopics: updateTopicFieldById(
            topic.subTopics,
            topicId,
            field,
            value
          ),
        };
      }
      return topic;
    });
  };

  const onTextBoxChangeEvent = (e, topicId) => {
    setTopics((prevTopics) =>
      updateTopicFieldById(prevTopics, topicId, e.target.name, e.target.value)
    );
  };
  // Recursively update queObj for the correct topic/subtopic and always ensure valid structure
  const updateQueObjByTopicId = (
    topicsArr,
    topicId,
    optionIdx,
    name,
    value
  ) => {
    return topicsArr.map((topic) => {
      if (topic.TopicID === topicId) {
        let newQueObj = { ...topic.queObj };
        // Always ensure OptionDetails is an array of 4 objects
        if (
          !Array.isArray(newQueObj.OptionDetails) ||
          newQueObj.OptionDetails.length !== 4
        ) {
          newQueObj.OptionDetails = [
            { OptionNo: "", OptionSortOrder: "", OptionValue: "" },
            { OptionNo: "", OptionSortOrder: "", OptionValue: "" },
            { OptionNo: "", OptionSortOrder: "", OptionValue: "" },
            { OptionNo: "", OptionSortOrder: "", OptionValue: "" },
          ];
        }
        if (name === "Question" || name === "QuizType") {
          newQueObj[name] = value;
        } else {
          newQueObj.OptionDetails = newQueObj.OptionDetails.map((opt, idx) =>
            idx === optionIdx ? { ...opt, [name]: value } : opt
          );
        }
        return { ...topic, queObj: newQueObj };
      }
      if (topic.subTopics && topic.subTopics.length > 0) {
        return {
          ...topic,
          subTopics: updateQueObjByTopicId(
            topic.subTopics,
            topicId,
            optionIdx,
            name,
            value
          ),
        };
      }
      return topic;
    });
  };

  const quizChangeEvent = (e, index, topicId) => {
    setTopics((prevTopics) =>
      updateQueObjByTopicId(
        prevTopics,
        topicId,
        index,
        e.target.name,
        e.target.value
      )
    );
  };
  // Recursively add quiz to the correct topic/subtopic and reset its queObj
  const addQuizToTopicById = (topicsArr, targetId) => {
    return topicsArr.map((topic) => {
      if (topic.TopicID === targetId) {
        const quizList = topic.QuizDetails || [];
        const nextNo = quizList.length + 1;
        const quizObj = {
          ...topic.queObj,
          QueNo: nextNo,
          QuestionSortOrder: nextNo,
        };
        // Add quizObj to QuizDetails and reset queObj
        return {
          ...topic,
          QuizDetails: [...quizList, quizObj],
          queObj: {
            QuizType: 1,
            QueNo: 0,
            Question: "",
            Answer: "",
            QuestionSortOrder: "",
            OptionDetails: [
              { OptionNo: "", OptionSortOrder: "", OptionValue: "" },
              { OptionNo: "", OptionSortOrder: "", OptionValue: "" },
              { OptionNo: "", OptionSortOrder: "", OptionValue: "" },
              { OptionNo: "", OptionSortOrder: "", OptionValue: "" },
            ],
          },
        };
      }
      if (topic.subTopics && topic.subTopics.length > 0) {
        return {
          ...topic,
          subTopics: addQuizToTopicById(topic.subTopics, targetId),
        };
      }
      return topic;
    });
  };

  const onQuestionAddClick = (topicId) => {
    setTopics((prevTopics) => addQuizToTopicById(prevTopics, topicId));
  };

  function updateAnswerByTopicId(topicsArr, targetId, quizIndex, optionIndex) {
    return topicsArr.map((topic) => {
      if (topic.TopicID === targetId) {
        const updatedQuizDetails = topic.QuizDetails.map((quiz, idx) => {
          if (idx === quizIndex) {
            return {
              ...quiz,
              Answer: quiz.OptionDetails[optionIndex].OptionValue,
            };
          }
          return quiz;
        });
        return { ...topic, QuizDetails: updatedQuizDetails };
      }
      if (topic.subTopics && topic.subTopics.length > 0) {
        return {
          ...topic,
          subTopics: updateAnswerByTopicId(
            topic.subTopics,
            targetId,
            quizIndex,
            optionIndex
          ),
        };
      }
      return topic;
    });
  }
  const onCorrectAnswerChange = (e, topicId, quizIndex, optionIndex) => {
    setTopics((prevTopics) =>
      updateAnswerByTopicId(prevTopics, topicId, quizIndex, optionIndex)
    );
  };
  const handleFileChange = (file, topicId) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("topicId", topicId);

    setFileUploads((prev) => [...prev, { topicId, formData }]);

    const preview = URL.createObjectURL(file);

    setTopics((prevTopics) =>
      updateTopicFieldById(prevTopics, topicId, {
        VSThumbnailFile: file,
        VSThumbnailFilePreview: preview,
      })
    );
    // Optionally, upload immediately here
  };
  const onFinalSaveClick = async () => {
    console.log(token);
    removeKeysDeep(topics, ["queObj"]);
    console.log(topics);
    try {
      await axios
        .post("http://localhost:3000/api/topic/addTopics", {
          p_json: JSON.stringify(topics),
        })
        .then((response) => {
          saveAllFiles(); // update state with response data
        });
    } catch (err) {
      console.error(err);
    }
  };
  const saveAllFiles = async () => {
    debugger;
    try {
      fileUploads.forEach(async ({ topicId, file }) => {
        await axios.post(
          `http://localhost:3000/api/files/upload/${topicId}`,
          file
        );
      });
    } catch (err) {
      console.error(err);
    }
  };
  function removeKeysDeep(obj, keysToRemove) {
    if (Array.isArray(obj)) {
      return obj.map((item) => removeKeysDeep(item, keysToRemove));
    } else if (obj && typeof obj === "object") {
      return Object.fromEntries(
        Object.entries(obj)
          .filter(([key]) => !keysToRemove.includes(key))
          .map(([key, value]) => [key, removeKeysDeep(value, keysToRemove)])
      );
    }
    return obj;
  }
  return (
    <>
      <div className="flex flex-col items-center  gap-4">
        <div className="inline-flex flex-col items-center justify-center px-0 relative">
          <div className="flex flex-col w-[700px] items-center  relative flex-[0_0_auto]">
            <p className="font-montserrat mx-auto text-2xl font-bold text-center">
              Read<span className="text-orange-500">Nova</span>
            </p>
          </div>
        </div>
      </div>
      {topics.map((topic, index) => (
        <TopicForm
          key={topic.TopicID}
          topic={topic}
          onAddSubTopic={onAddSubTopic}
          handleFileChange={handleFileChange}
          topicIndex={index}
          onTextBoxChange={onTextBoxChangeEvent}
          onQuizChange={quizChangeEvent}
          addQuestion={onQuestionAddClick}
          onAnswerChange={onCorrectAnswerChange}
        />
      ))}
      <div className="flex flex-col items-center  gap-4">
        <div className="inline-flex flex-col items-center justify-center px-0 relative">
          <div className="flex flex-col w-[700px] items-center  relative flex-[0_0_auto]">
            <button
              className="bg-green-500 border-none text-white px-6 py-2 rounded-md hover:bg-green-600 transition mt-5"
              onClick={onFinalSaveClick}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

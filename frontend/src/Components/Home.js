import React, { useEffect, useState } from "react";
import axios from "axios";
import TopicItem from "./TopicItem";

const Roadmap = () => {
  let [roadmapData, setRoadmapData] = useState([]);

  function buildHierarchy(data) {
    const map = {};
    const roots = [];

    data.forEach((item) => {
      map[item.TopicID] = { ...item, SubTopics: item.SubTopics || [] };
    });

    data.forEach((item) => {
      if (item.ParentTopicID) {
        map[item.ParentTopicID].SubTopics.push(map[item.TopicID]);
      } else {
        roots.push(map[item.TopicID]);
      }
    });

    return roots;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/topic/getTopics"
        );
        const data = res.data[0][0].FlatTopicsJSON || [];
        roadmapData = buildHierarchy(data);
        setRoadmapData(roadmapData);
      } catch (err) {
        console.error("Error fetching topics:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <p className="font-montserrat mx-auto text-2xl font-bold text-center">
          Read<span className="text-orange-500">Nova</span>
        </p>
        <h1 className="text-3xl font-bold text-gray-900">
          Spoken English Roadmap
        </h1>
        <p className="text-gray-600 mt-1 text-base">
          Step-by-step guide from basics to everyday fluency in 2025
        </p>

        <div className="mt-10 space-y-8">
          {roadmapData.map((topic) => (
            <TopicItem key={topic.TopicID} topic={topic} isMainTopic={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;

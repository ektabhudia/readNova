import { insertTopic, getTopicsData } from "../models/topicModel.js";
import dotenv from "dotenv";
dotenv.config();

export const addTopics = async (req, res, next) => {
  try {
    const { p_json } = req.body;
    if (!p_json) {
      return res
        .status(400)
        .json({ message: "Something went wrong in topic." });
    }
    const id = await insertTopic(p_json);
    res.status(201).json({ message: "Topic created.", id });
  } catch (err) {
    next(err);
  }
};

export const getTopics = async (req, res, next) => {
  try {
    const data = await getTopicsData();
    res.json(data);
  } catch (err) {
    next(err);
  }
};
export default { addTopics, getTopics };

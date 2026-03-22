import express from "express";
const router = express.Router();
import { addTopics, getTopics } from "../controllers/topicController.js";

router.post("/addTopics", addTopics);
router.get("/getTopics", getTopics);

export default router;

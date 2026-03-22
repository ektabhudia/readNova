import express from "express";
import FileController from "../controllers/FileController.js";
import upload from "../middlewares/fileUploadMiddleware.js";

const router = express.Router();

// Upload file for topic
router.post(
  "/upload/:topicId",
  upload.single("file"),
  FileController.uploadFile
);

// Get all files for topic
router.get("/:topicId", FileController.getFiles);

export default router;

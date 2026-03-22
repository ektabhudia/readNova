import FileModel from "../models/FileModel.js";

class FileController {
  static async uploadFile(req, res) {
    try {
      const topicId = req.params.topicId;
      const file = req.file;

      if (!file) return res.status(400).json({ error: "No file uploaded" });

      const fileId = await FileModel.createFile(topicId, file);

      res.json({
        message: "File uploaded successfully",
        fileId,
        url: `http://localhost:3000/${file.path}`,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }

  static async getFiles(req, res) {
    try {
      const topicId = req.params.topicId;
      const files = await FileModel.getFilesByTopic(topicId);
      res.json(
        files.map((f) => ({
          ...f,
          url: `http://localhost:3000/${f.file_path}`,
        }))
      );
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
}

export default FileController;

import pool from "../db.js";

class FileModel {
  static async createFile(topicId, file) {
    const [result] = await pool.query(
      "CALL topic_files(topic_id, file_path,file_name) VALUES (?, ?, ?)",
      [topicId, file.path, file.originalname]
    );
    return result.insertId;
  }
}

export default FileModel;

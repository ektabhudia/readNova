import express from "express";
import userRoutes from "./config/routes/userRoutes.js";
import errorHandler from "./config/middlewares/authMiddleware.js";
import cors from "cors";
import authRoutes from "./config/routes/authRoutes.js";
import dotenv from "dotenv";
import fileRoutes from "./config/routes/fileRoutes.js";
import topicRoutes from "./config/routes/topicRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Routes
app.use("/api/topic", topicRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/users", userRoutes);
app.use("/auth", authRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

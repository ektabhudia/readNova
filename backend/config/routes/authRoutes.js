import express from "express";
import {
  signup,
  login,
  googleAuth,
  profile
} from "../controllers/authController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/google", googleAuth);
router.get("/profile", authenticateToken, profile);


export default router;

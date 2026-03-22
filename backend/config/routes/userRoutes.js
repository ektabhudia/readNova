import express from "express";
const router = express.Router();
import { getUsers, addUser,resetPassMailVerify } from "../controllers/userController.js";

router.get("/", getUsers);
router.post("/", addUser);
router.post("/resetPassMailVerify", resetPassMailVerify);


export default router;

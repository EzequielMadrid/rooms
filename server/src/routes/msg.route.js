import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getMsgs,
  getUsersForFriends,
  sendMsg,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForFriends);
router.get("/:id", protectRoute, getMsgs);
router.post("/send/:id", protectRoute, sendMsg);

export default router;

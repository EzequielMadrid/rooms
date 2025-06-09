import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getMessages,
  getFriends,
  sendMessage,
} from "../controllers/msg.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getFriends);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;

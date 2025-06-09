import express from "express";
import {
  checkAuth,
  signup,
  signin,
  updateAvatar,
  logout,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);
router.put("/update-avatar", protectRoute, updateAvatar);
router.get("/check", protectRoute, checkAuth);

export default router;

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import msgRoutes from "./routes/msg.route.js";

import { app, server } from "./lib/socket.js";

const PORT = process.env.PORT;

// incrementing body limit for Images
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", msgRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import msgRoutes from "./routes/msg.route.js";

import { app, server } from "./lib/socket.js";

const PORT = process.env.PORT;
const __dirname = path.resolve();

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

// For Production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  //! For any non-API route, serve index.html to support client-side routing
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});

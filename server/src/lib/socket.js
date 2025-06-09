import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId]?.socketId;
}

const userSocketMap = {}; // { userId: { socketId, username } }

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  const username = socket.handshake.query.username;
  if (userId) {
    userSocketMap[userId] = {
      socketId: socket.id,
      username,
    };
  }
  console.log(`${username} is Online`);

  io.emit("getActiveFriends", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log(`${username} is Offline`);
    // Remove the user from the userSocketMap when they
    delete userSocketMap[userId];
    io.emit("getActiveFriends", Object.keys(userSocketMap));
  });
});

export { io, app, server };

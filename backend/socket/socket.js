import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express(); // Define app once
const server = http.createServer(app); // Create the HTTP server using app
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {};
io.on("connection", (socket) => {
	console.log("user connected", socket.id);
	const userId = socket.handshake.query.userId;

	if (userId != "undefined") userSocketMap[userId] = socket.id;
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("connect_error", (err) => {
    console.error("Connection error:", err);
});
socket.on("disconnect", () => {
  console.log("user disconnected");
  delete userSocketMap[userId];
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
});
});

// Export app and server as needed
export { io, server, app };

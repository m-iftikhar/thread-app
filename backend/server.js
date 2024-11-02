import express from 'express';
import dotenv from "dotenv";
import connectDB from './db/Connectdb.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import { v2 as cloudinary } from "cloudinary";
import messageRoutes from './routes/messageRoutes.js';
import { server, app } from "./socket/socket.js"; // Import both server and app if needed

dotenv.config(); // Load environment variables from .env file
connectDB(); // Connect to the database

// Middleware setup
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Routes
app.use("/api/users", userRoutes); 
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));

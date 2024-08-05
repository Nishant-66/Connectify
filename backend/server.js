import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

// Load environment variables from .env file
dotenv.config();



// Port assignment with fallback to 5000 if PORT environment variable is not set
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(express.json()); // Parses incoming JSON payloads from requests
app.use(cookieParser()); // Parses cookies from incoming requests

// Route handlers
app.use("/api/auth", authRoutes); // Routes for authentication-related operations
app.use("/api/messages", messageRoutes); // Routes for message-related operations
app.use("/api/users", userRoutes); // Routes for user-related operations

// Start the server and connect to MongoDB
server.listen(PORT, () => {
	connectToMongoDB(); // Connect to MongoDB
	console.log(`Server Running on port ${PORT}`); // Log server start
});

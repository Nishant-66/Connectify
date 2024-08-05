import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// Route to retrieve messages for a specific conversation
// The protectRoute middleware ensures that only authenticated users can access this route
router.get("/:id", protectRoute, getMessages);

// Route to send a message in a specific conversation
// The protectRoute middleware ensures that only authenticated users can access this route
router.post("/send/:id", protectRoute, sendMessage);

export default router;

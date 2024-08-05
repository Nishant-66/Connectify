import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar } from "../controllers/user.controller.js";

const router = express.Router();

// Route to get users for the sidebar
// The protectRoute middleware ensures that only authenticated users can access this route
router.get("/", protectRoute, getUsersForSidebar);

export default router;

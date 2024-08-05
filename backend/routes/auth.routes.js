import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

// Route to handle user signup
// The signup controller function will handle creating a new user
router.post("/signup", signup);

// Route to handle user login
// The login controller function will handle user authentication and session management
router.post("/login", login);

// Route to handle user logout
// The logout controller function will handle terminating the user's session
router.post("/logout", logout);

export default router;

import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Middleware function to protect routes by verifying JWT tokens
const protectRoute = async (req, res, next) => {
	try {
		// Retrieve the JWT token from cookies
		const token = req.cookies.jwt;

		// Check if token is present
		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}

		// Verify the token using the secret key
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Check if token verification was successful
		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}

		// Find the user associated with the token's userId, excluding the password field
		const user = await User.findById(decoded.userId).select("-password");

		// Check if the user exists
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Attach the user object to the request object for use in subsequent middleware or route handlers
		req.user = user;

		// Proceed to the next middleware or route handler
		next();
	} catch (error) {
		// Log the error message and respond with a 500 Internal Server Error
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export default protectRoute;

import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

// Controller function for user signup
export const signup = async (req, res) => {
	try {
		// Destructure user details from request body
		const { fullName, username, password, confirmPassword, gender } = req.body;

		// Check if the password and confirm password match
		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		// Check if the username already exists in the database
		const user = await User.findOne({ username });

		if (user) {
			return res.status(400).json({ error: "Username already exists" });
		}

		// Hash the password before saving it to the database
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Generate a default profile picture URL based on gender
		const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

		// Create a new user with the provided details
		const newUser = new User({
			fullName,
			username,
			password: hashedPassword,
			gender,
			profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
		});

		if (newUser) {
			// Generate JWT token and set it as an HTTP-only cookie
			generateTokenAndSetCookie(newUser._id, res);
			// Save the new user to the database
			await newUser.save();

			// Respond with the newly created user's details
			res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				username: newUser.username,
				profilePic: newUser.profilePic,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		// Log error and respond with a 500 Internal Server Error status
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

// Controller function for user login
export const login = async (req, res) => {
	try {
		// Destructure username and password from request body
		const { username, password } = req.body;
		// Find the user by username
		const user = await User.findOne({ username });
		// Compare provided password with stored hashed password
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		// Generate JWT token and set it as an HTTP-only cookie
		generateTokenAndSetCookie(user._id, res);

		// Respond with the logged-in user's details
		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
		});
	} catch (error) {
		// Log error and respond with a 500 Internal Server Error status
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

// Controller function for user logout
export const logout = (req, res) => {
	try {
		// Clear the JWT cookie to log out the user
		res.cookie("jwt", "", { maxAge: 0 });
		// Respond with a success message
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		// Log error and respond with a 500 Internal Server Error status
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

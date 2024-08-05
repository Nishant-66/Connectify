import User from "../models/user.model.js";

// Controller function to get a list of users for the sidebar, excluding the logged-in user
export const getUsersForSidebar = async (req, res) => {
	try {
		// Get the ID of the currently logged-in user from req.user
		const loggedInUserId = req.user._id;

		// Find all users except the logged-in user, excluding the password field from the result
		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

		// Send the list of filtered users as a JSON response with a 200 status code
		res.status(200).json(filteredUsers);
	} catch (error) {
		// Log the error and send a 500 Internal Server Error response if something goes wrong
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

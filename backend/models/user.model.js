import mongoose from "mongoose";

// Define the schema for a User document
const userSchema = new mongoose.Schema(
	{
		// Full name of the user
		fullName: {
			type: String,
			required: true, // This field is mandatory
		},
		// Username of the user, must be unique
		username: {
			type: String,
			required: true, // This field is mandatory
			unique: true,   // Username must be unique across all users
		},
		// Password for user authentication
		password: {
			type: String,
			required: true, // This field is mandatory
			minlength: 6,   // Password must be at least 6 characters long
		},
		// Gender of the user, can only be 'male' or 'female'
		gender: {
			type: String,
			required: true, // This field is mandatory
			enum: ["male", "female"], // Enum validation for gender
		},
		// URL to the user's profile picture
		profilePic: {
			type: String,
			default: "", // Default is an empty string if no profile picture is provided
		},
		// Timestamps for when the document was created and last updated
		// createdAt and updatedAt fields are automatically managed by Mongoose
	},
	{ timestamps: true } // Enables automatic creation of createdAt and updatedAt fields
);

// Create a Mongoose model for the User schema
const User = mongoose.model("User", userSchema);

export default User;

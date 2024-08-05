import mongoose from "mongoose";

// Define the schema for a Message document
const messageSchema = new mongoose.Schema(
	{
		// ID of the user who sent the message, referencing the User model
		senderId: {
			type: mongoose.Schema.Types.ObjectId, // ObjectId type for MongoDB references
			ref: "User", // Reference to the User model
			required: true, // This field is mandatory
		},
		// ID of the user who received the message, referencing the User model
		receiverId: {
			type: mongoose.Schema.Types.ObjectId, // ObjectId type for MongoDB references
			ref: "User", // Reference to the User model
			required: true, // This field is mandatory
		},
		// Content of the message
		message: {
			type: String,
			required: true, // This field is mandatory
		},
		// Timestamps for when the document was created and last updated
		// createdAt and updatedAt fields are automatically managed by Mongoose
	},
	{ timestamps: true } // Enables automatic creation of createdAt and updatedAt fields
);

// Create a Mongoose model for the Message schema
const Message = mongoose.model("Message", messageSchema);

export default Message;

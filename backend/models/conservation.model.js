import mongoose from "mongoose";

// Define the schema for a Conversation document
const conversationSchema = new mongoose.Schema(
	{
		// List of participants in the conversation, referencing the User model
		participants: [
			{
				type: mongoose.Schema.Types.ObjectId, // ObjectId type for MongoDB references
				ref: "User", // Reference to the User model
			},
		],
		// List of messages in the conversation, referencing the Message model
		messages: [
			{
				type: mongoose.Schema.Types.ObjectId, // ObjectId type for MongoDB references
				ref: "Message", // Reference to the Message model
				default: [], // Default is an empty array if no messages are provided
			},
		],
	},
	{ timestamps: true } // Enables automatic creation of createdAt and updatedAt fields
);

// Create a Mongoose model for the Conversation schema
const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;

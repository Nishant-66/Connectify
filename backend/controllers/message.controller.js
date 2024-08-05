import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

// Controller function to handle sending a message
export const sendMessage = async (req, res) => {
	try {
		// Extract message and receiverId from request body and params
		const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;

		// Find an existing conversation between the sender and receiver
		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		// If no conversation exists, create a new one
		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		// Create a new message
		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			// Add the new message to the conversation's message list
			conversation.messages.push(newMessage._id);
		}

		// Save the conversation and message to the database in parallel
		await Promise.all([conversation.save(), newMessage.save()]);

		// Respond with the newly created message
		res.status(201).json(newMessage);
	} catch (error) {
		// Log error and respond with a 500 Internal Server Error status
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

// Controller function to retrieve messages for a specific conversation
export const getMessages = async (req, res) => {
	try {
		// Extract userToChatId from request params
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		// Find the conversation between the sender and the user to chat with
		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // Populate the messages field with the actual message documents

		// If no conversation is found, respond with an empty array
		if (!conversation) return res.status(200).json([]);

		// Respond with the list of messages in the conversation
		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		// Log error and respond with a 500 Internal Server Error status
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

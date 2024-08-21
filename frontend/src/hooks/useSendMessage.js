import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
	// State to manage the loading status during the message sending process
	const [loading, setLoading] = useState(false);

	// Zustand hook to manage conversation state
	const { messages, setMessages, selectedConversation } = useConversation();

	// Function to send a message
	const sendMessage = async (message) => {
		setLoading(true); // Set loading state to true while sending the message
		try {
			// Send a POST request to the API endpoint to send the message
			const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }), // Include the message in the request body
			});

			const data = await res.json(); // Parse the JSON response
			if (data.error) throw new Error(data.error); // Throw error if the response contains an error

			// Update the local messages state with the newly sent message
			setMessages([...messages, data]);
		} catch (error) {
			toast.error(error.message); // Show error message using react-hot-toast
		} finally {
			setLoading(false); // Reset loading state after the request is complete
		}
	};

	return { sendMessage, loading }; // Return the sendMessage function and loading state
};
export default useSendMessage;

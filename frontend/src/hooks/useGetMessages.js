import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
	// State to manage the loading status while fetching messages
	const [loading, setLoading] = useState(false);

	// Zustand hook to access and update conversation-related state
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		// Function to fetch messages for the selected conversation
		const getMessages = async () => {
			setLoading(true); // Set loading state to true while fetching messages
			try {
				// Fetch messages from the server for the selected conversation
				const res = await fetch(`/api/messages/${selectedConversation._id}`);
				const data = await res.json(); // Parse the JSON response
				if (data.error) throw new Error(data.error); // Throw error if the response contains an error

				// Update local state with the fetched messages
				setMessages(data);
			} catch (error) {
				toast.error(error.message); // Show error message using react-hot-toast
			} finally {
				setLoading(false); // Reset loading state after fetching is complete
			}
		};

		// Fetch messages only if a conversation is selected (i.e., selectedConversation._id exists)
		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]); // Dependencies: fetch messages when selectedConversation changes

	return { messages, loading }; // Return the messages and loading state
};
export default useGetMessages;

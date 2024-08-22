import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false); // State to track the loading status of the fetch operation
	const [conversations, setConversations] = useState([]); // State to store the fetched conversations

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true); // Set loading to true before starting the fetch operation
			try {
				const res = await fetch("/api/users"); // Fetch conversations from the API
				const data = await res.json(); // Parse the JSON response
				if (data.error) {
					// If there's an error in the response, throw an error
					throw new Error(data.error);
				}
				setConversations(data); // Update state with the fetched conversations
			} catch (error) {
				// Show an error toast if there's an issue with the fetch operation
				toast.error(error.message);
			} finally {
				setLoading(false); // Set loading to false after the fetch operation is complete
			}
		};

		getConversations(); // Call the function to fetch conversations
	}, []); // Empty dependency array ensures this effect runs only once on mount

	return { loading, conversations }; // Return the loading state and conversations data
};

export default useGetConversations;
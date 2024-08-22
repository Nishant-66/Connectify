import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
	const [loading, setLoading] = useState(false); // State to track the loading status of the logout operation
	const { setAuthUser } = useAuthContext(); // Function to update the authentication state

	const logout = async () => {
		setLoading(true); // Set loading to true before starting the logout process
		try {
			const res = await fetch("/api/auth/logout", {
				method: "POST", // Send a POST request to log out
				headers: { "Content-Type": "application/json" }, // Set content type to JSON
			});
			const data = await res.json(); // Parse the JSON response
			if (data.error) {
				// If there's an error in the response, throw an error
				throw new Error(data.error);
			}

			localStorage.removeItem("chat-user"); // Remove the user data from localStorage
			setAuthUser(null); // Clear the authentication state
		} catch (error) {
			// Show an error toast if there's an issue with the logout process
			toast.error(error.message);
		} finally {
			setLoading(false); // Set loading to false after the logout process is complete
		}
	};

	return { loading, logout }; // Return the loading state and the logout function
};

export default useLogout;
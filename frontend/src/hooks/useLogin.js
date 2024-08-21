import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
	// State to manage the loading status during the login process
	const [loading, setLoading] = useState(false);

	// Context function to set the authenticated user
	const { setAuthUser } = useAuthContext();

	// Function to handle the login process
	const login = async (username, password) => {
		// Validate input fields
		const success = handleInputErrors(username, password);
		if (!success) return; // Exit if there are validation errors

		setLoading(true); // Set loading state to true while the request is in progress
		try {
			// Send a POST request to the login endpoint
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});

			const data = await res.json(); // Parse the JSON response
			if (data.error) {
				throw new Error(data.error); // Throw error if the response contains an error
			}

			localStorage.setItem("chat-user", JSON.stringify(data)); // Store user data in localStorage
			setAuthUser(data); // Set the authenticated user in context
		} catch (error) {
			toast.error(error.message); // Show error message using react-hot-toast
		} finally {
			setLoading(false); // Reset loading state after the request is complete
		}
	};

	return { loading, login }; // Return loading state and login function
};
export default useLogin;

// Function to validate input fields
function handleInputErrors(username, password) {
	if (!username || !password) {
		toast.error("Please fill in all fields"); // Show error if any field is missing
		return false;
	}

	return true; // Return true if all validations pass
}

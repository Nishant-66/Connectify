import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
	// State to manage the loading status during the signup process
	const [loading, setLoading] = useState(false);

	// Context function to set the authenticated user
	const { setAuthUser } = useAuthContext();

	// Function to handle the signup process
	const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
		// Validate input fields
		const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
		if (!success) return; // Exit if there are validation errors

		setLoading(true); // Set loading state to true while the request is in progress
		try {
			// Send a POST request to the signup endpoint
			const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
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

	return { loading, signup }; // Return loading state and signup function
};
export default useSignup;

// Function to validate input fields
function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
	if (!fullName || !username || !password || !confirmPassword || !gender) {
		toast.error("Please fill in all fields"); // Show error if any field is missing
		return false;
	}

	if (password !== confirmPassword) {
		toast.error("Passwords do not match"); // Show error if passwords do not match
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters"); // Show error if password is too short
		return false;
	}

	return true; // Return true if all validations pass
}

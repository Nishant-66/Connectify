import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

// Create a context for managing socket connections
const SocketContext = createContext();

// Custom hook to use the SocketContext
export const useSocketContext = () => {
	return useContext(SocketContext);
};


// Provider component for SocketContext
export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null); // State to hold the socket instance
	const [onlineUsers, setOnlineUsers] = useState([]); // State to hold the list of online users
	const { authUser } = useAuthContext(); // Get authenticated user from AuthContext

	useEffect(() => {
		if (authUser) {
			// Initialize the socket connection when user is authenticated
			const socket = io("https://chat-app-yt.onrender.com", {
				query: {
					userId: authUser._id, // Send user ID as query parameter
				},
			});

			setSocket(socket);

			// Listen for online users update from the server
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users); // Update the onlineUsers state
			});

			// Cleanup function to close the socket connection when component unmounts or authUser changes
			return () => socket.close();
		} else {
			// Close the socket connection if there is no authenticated user
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser]); // Effect runs when authUser changes

	// Provide socket instance and onlineUsers state to child components
	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};

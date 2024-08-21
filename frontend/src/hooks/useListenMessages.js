import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
	// Retrieve the socket instance from context
	const { socket } = useSocketContext();
	
	// Access conversation state and setter from Zustand
	const { messages, setMessages } = useConversation();

	useEffect(() => {
		// Event listener for receiving new messages
		socket?.on("newMessage", (newMessage) => {
			newMessage.shouldShake = true; // Flag to trigger UI update
			const sound = new Audio(notificationSound); // Create a new Audio instance with the notification sound
			sound.play(); // Play the notification sound
			setMessages([...messages, newMessage]); // Update state with the new message
		});

		// Cleanup function to remove the event listener when the component unmounts or socket changes
		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]); // Dependencies: use effect when socket, setMessages, or messages change
};

export default useListenMessages;

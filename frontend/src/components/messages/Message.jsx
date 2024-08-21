import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
	// Access the authenticated user's information from context
	const { authUser } = useAuthContext();

	// Access the selected conversation from Zustand store
	const { selectedConversation } = useConversation();

	// Determine if the message was sent by the authenticated user
	const fromMe = message.senderId === authUser._id;

	// Format the time of the message
	const formattedTime = extractTime(message.createdAt);

	// Determine the alignment class for the message (left for others, right for the authenticated user)
	const chatClassName = fromMe ? "chat-end" : "chat-start";

	// Set the profile picture based on whether the message was sent by the authenticated user or the recipient
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;

	// Set the background color of the chat bubble based on the sender
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

	// Add a shake animation class if the message has a `shouldShake` property
	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClassName}`}>
			{/* Profile picture of the sender */}
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>

			{/* Chat bubble containing the message */}
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
				{message.message}
			</div>

			{/* Footer displaying the formatted message time */}
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
				{formattedTime}
			</div>
		</div>
	);
};

export default Message;

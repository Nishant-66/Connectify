import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
	// Access selected conversation and the setter from Zustand store
	const { selectedConversation, setSelectedConversation } = useConversation();

	// Effect to clear selected conversation when the component unmounts
	useEffect(() => {
		// Cleanup function (unmounts)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	return (
		<div className='md:min-w-[450px] flex flex-col'>
			{/* If no conversation is selected, show the NoChatSelected component */}
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					{/* Header displaying the recipient's full name */}
					<div className='bg-slate-500 px-4 py-2 mb-2'>
						<span className='label-text'>To:</span>{" "}
						<span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
					</div>
					{/* Render the Messages and MessageInput components */}
					<Messages />
					<MessageInput />
				</>
			)}
		</div>
	);
};
export default MessageContainer;

// Component to display when no chat is selected
const NoChatSelected = () => {
	// Access the authenticated user's information from context
	const { authUser } = useAuthContext();

	return (
		<div className='flex items-center justify-center w-full h-full'>
			{/* Centered message to guide the user */}
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {authUser.fullName} ❄</p>
				<p>Select a chat to start messaging</p>
				{/* Icon to emphasize the empty state */}
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};

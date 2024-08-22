import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx, emoji }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const { onlineUsers } = useSocketContext();

	// Check if this conversation is selected
	const isSelected = selectedConversation?._id === conversation._id;
	// Check if the user is online
	const isOnline = onlineUsers.includes(conversation._id);

	return (
		<>
			<div
				className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
				onClick={() => setSelectedConversation(conversation)} // Set this conversation as selected on click
			>
				{/* Avatar section with online status indication */}
				<div className={avatar ${isOnline ? "online" : ""}}>
					<div className='w-12 rounded-full'>
						<img src={conversation.profilePic} alt='user avatar' />
					</div>
				</div>

				{/* Conversation details */}
				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{conversation.fullName}</p>
						<span className='text-xl'>{emoji}</span> {/* Display emoji */}
					</div>
				</div>
			</div>

			{/* Divider between conversations, except for the last one */}
			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};

export default Conversation;
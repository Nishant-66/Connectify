import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
	const { loading, conversations } = useGetConversations(); // Custom hook to fetch conversations

	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{/* Render each conversation */}
			{conversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id} // Unique key for each conversation
					conversation={conversation} // Pass conversation data
					emoji={getRandomEmoji()} // Assign a random emoji
					lastIdx={idx === conversations.length - 1} // Check if this is the last conversation for possible styling
				/>
			))}

			{/* Show a loading spinner if data is still loading */}
			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};

export default Conversations;
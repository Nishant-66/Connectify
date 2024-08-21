import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
	// Custom hook to fetch messages and track loading state
	const { messages, loading } = useGetMessages();

	// Custom hook to listen for new incoming messages (real-time updates)
	useListenMessages();

	// Ref to keep track of the last message element for automatic scrolling
	const lastMessageRef = useRef();

	// Scroll to the last message whenever messages update
	useEffect(() => {
		// Delay the scroll to ensure the element is rendered before scrolling
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

	return (
		<div className='px-4 flex-1 overflow-auto'>
			{/* Render messages if not loading and messages exist */}
			{!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div key={message._id} ref={lastMessageRef}>
						<Message message={message} />
					</div>
				))}

			{/* Show loading skeletons if data is still loading */}
			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

			{/* Show a message prompt if no messages exist after loading */}
			{!loading && messages.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
			)}
		</div>
	);
};

export default Messages;

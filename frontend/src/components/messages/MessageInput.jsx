import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
	// State to track the message input value
	const [message, setMessage] = useState("");

	// Custom hook to send a message and track loading state
	const { loading, sendMessage } = useSendMessage();

	// Handle form submission to send a message
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent the default form submission behavior
		if (!message) return; // Do nothing if the message is empty

		// Send the message and clear the input field
		await sendMessage(message);
		setMessage("");
	};

	return (
		<form className='px-4 my-3' onSubmit={handleSubmit}>
			<div className='w-full relative'>
				{/* Input field for typing a message */}
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
					placeholder='Send a message'
					value={message}
					onChange={(e) => setMessage(e.target.value)} // Update state on input change
				/>
				{/* Submit button to send the message */}
				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
					{loading ? (
						<div className='loading loading-spinner'></div> // Show a loading spinner while sending the message
					) : (
						<BsSend /> // Show the send icon when not loading
					)}
				</button>
			</div>
		</form>
	);
};

export default MessageInput;

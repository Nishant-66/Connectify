import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
	const [search, setSearch] = useState(""); // State for the search input value
	const { setSelectedConversation } = useConversation(); // Function to set the selected conversation
	const { conversations } = useGetConversations(); // Get conversations from the hook

	const handleSubmit = (e) => {
		e.preventDefault(); // Prevent the default form submission behavior

		if (!search) return; // Do nothing if search input is empty
		if (search.length < 3) {
			// Show an error toast if search term is less than 3 characters
			return toast.error("Search term must be at least 3 characters long");
		}

		// Find a conversation that includes the search term in the full name (case-insensitive)
		const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

		if (conversation) {
			// If a conversation is found, set it as the selected conversation and clear the search input
			setSelectedConversation(conversation);
			setSearch("");
		} else {
			// Show an error toast if no conversation matches the search term
			toast.error("No such user found!");
		}
	};

	return (
		<form onSubmit={handleSubmit} className='flex items-center gap-2'>
			{/* Input field for searching conversations */}
			<input
				type='text'
				placeholder='Search…'
				className='input input-bordered rounded-full'
				value={search}
				onChange={(e) => setSearch(e.target.value)} // Update search state on input change
			/>
			{/* Button to submit the search form */}
			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
				<IoSearchSharp className='w-6 h-6 outline-none' />
			</button>
		</form>
	);
};

export default SearchInput;
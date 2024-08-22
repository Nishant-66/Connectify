import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
	return (
		<div className='border-r border-slate-500 p-4 flex flex-col'>
			{/* SearchInput component for searching conversations */}
			<SearchInput />
			
			{/* Divider to separate the search input from the conversations */}
			<div className='divider px-3'></div>
			
			{/* Conversations component to list all conversations */}
			<Conversations />
			
			{/* LogoutButton component to handle user logout */}
			<LogoutButton />
		</div>
	);
};

export default Sidebar;
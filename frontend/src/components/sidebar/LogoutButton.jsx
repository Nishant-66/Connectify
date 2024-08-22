import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
	const { loading, logout } = useLogout(); // Custom hook for handling logout and loading state

	return (
		<div className='mt-auto'>
			{/* Display logout icon or spinner based on loading state */}
			{!loading ? (
				<BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} /> // Logout icon with click handler
			) : (
				<span className='loading loading-spinner'></span> // Loading spinner when logging out
			)}
		</div>
	);
};

export default LogoutButton;
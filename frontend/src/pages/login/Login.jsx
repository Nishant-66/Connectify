import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
	// State to store username and password input values
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	// Hook to handle login functionality and loading state
	const { loading, login } = useLogin();

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent default form submission behavior
		await login(username, password); // Call login function with username and password
	};

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			{/* Container for the login form */}
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				{/* Title */}
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Login
					<span className='text-blue-500'> ChatApp</span>
				</h1>

				{/* Login form */}
				<form onSubmit={handleSubmit}>
					{/* Username input field */}
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Username</span>
						</label>
						<input
							type='text'
							placeholder='Enter username'
							className='w-full input input-bordered h-10'
							value={username}
							onChange={(e) => setUsername(e.target.value)} // Update username state on change
						/>
					</div>

					{/* Password input field */}
					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={password}
							onChange={(e) => setPassword(e.target.value)} // Update password state on change
						/>
					</div>

					{/* Link to Signup page */}
					<Link to='/signup' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
						{"Don't"} have an account?
					</Link>

					{/* Login button */}
					<div>
						<button className='btn btn-block btn-sm mt-2' disabled={loading}>
							{loading ? <span className='loading loading-spinner'></span> : "Login"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;

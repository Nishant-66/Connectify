import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
	// State to store the input values for the sign-up form
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		password: "",
		confirmPassword: "",
		gender: "",
	});

	// Hook to handle sign-up functionality and loading state
	const { loading, signup } = useSignup();

	// Handle gender checkbox change
	const handleCheckboxChange = (gender) => {
		setInputs({ ...inputs, gender }); // Update the gender field in the inputs state
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent default form submission behavior
		await signup(inputs); // Call signup function with the input values
	};

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			{/* Container for the sign-up form */}
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				{/* Title */}
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up <span className='text-blue-500'> Connectify</span>
				</h1>

				{/* Sign-up form */}
				<form onSubmit={handleSubmit}>
					{/* Full Name input field */}
					<div>
						<label className='label p-2'>
							<span className='text-base label-text  text-gray-300'>Full Name</span>
						</label>
						<input
							type='text'
							placeholder=' John Doe'
							className='w-full input input-bordered h-10'
							value={inputs.fullName}
							onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })} // Update fullName in state
						/>
					</div>

					{/* Username input field */}
					<div>
						<label className='label p-2'>
							<span className='text-base label-text  text-gray-300'>Username</span>
						</label>
						<input
							type='text'
							placeholder=' johndoe'
							className='w-full input input-bordered h-10'
							value={inputs.username}
							onChange={(e) => setInputs({ ...inputs, username: e.target.value })} // Update username in state
						/>
					</div>

					{/* Password input field */}
					<div>
						<label className='label'>
							<span className='text-base label-text  text-gray-300'>Password</span>
						</label>
						<input
							type='password'
							placeholder=' Enter Password'
							className='w-full input input-bordered h-10'
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })} // Update password in state
						/>
					</div>

					{/* Confirm Password input field */}
					<div>
						<label className='label'>
							<span className='text-base label-text  text-gray-300'>Confirm Password</span>
						</label>
						<input
							type='password'
							placeholder=' Confirm Password'
							className='w-full input input-bordered h-10'
							value={inputs.confirmPassword}
							onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })} // Update confirmPassword in state
						/>
					</div>

					{/* Gender selection checkboxes */}
					<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

					{/* Link to login page */}
					<Link to='/login' className='text-sm hover:underline  text-gray-300 hover:text-black mt-2 inline-block'>
						Already have an account?
					</Link>

					{/* Sign Up button */}
					<div>
						<button className='btn btn-block btn-sm mt-2 p-1  hover:text-black  text-gray-300 border border-slate-700' disabled={loading}>
							{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUp;

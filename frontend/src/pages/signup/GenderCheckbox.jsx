const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
	return (
		<div className='flex'>
			{/* Male checkbox */}
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "selected" : ""}`}>
					{/* Label for the Male checkbox */}
					<span className='label-text'>Male</span>
					{/* Checkbox for selecting Male */}
					<input
						type='checkbox'
						className='checkbox border-slate-900'
						checked={selectedGender === "male"} // Checked if the selectedGender is "male"
						onChange={() => onCheckboxChange("male")} // Call onCheckboxChange with "male" when the checkbox is clicked
					/>
				</label>
			</div>

			{/* Female checkbox */}
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer ${selectedGender === "female" ? "selected" : ""}`}>
					{/* Label for the Female checkbox */}
					<span className='label-text'>Female</span>
					{/* Checkbox for selecting Female */}
					<input
						type='checkbox'
						className='checkbox border-slate-900'
						checked={selectedGender === "female"} // Checked if the selectedGender is "female"
						onChange={() => onCheckboxChange("female")} // Call onCheckboxChange with "female" when the checkbox is clicked
					/>
				</label>
			</div>
		</div>
	);
};

export default GenderCheckbox;

/** @format */

import { useState } from 'react';

// ✅ Reusable Toggle Component
const ToggleSwitch = ({ label, checked = true, onChange }) => (
	<label className='flex items-center text-form-field text-text-body gap-3'>
		<input
			type='checkbox'
			checked={checked}
			onChange={onChange}
			className="w-4 h-4 border border-gray-600 rounded-sm appearance-none checked:bg-white checked:after:content-['✔'] checked:after:block checked:after:text-black checked:after:text-sm checked:after:leading-none flex items-center justify-center"
		/>
		{label}
	</label>
);

const MissingCategorySearch = () => {
	const [showEPOS, setShowEPOS] = useState(true);
	const [showSIM, setShowSIM] = useState(true);
	return (
		<div className='flex items-center justify-between gap-4'>
			{/* Left: Search + Filters */}
			<div className='flex flex-col gap-1'>
				<p className='text-lg text-black font-bold'>Fix Categories</p>

				<div className='flex items-center gap-4'>
					{/* Search Input */}
					<input
						type='text'
						placeholder='Enter MPN / Model / Title'
						className='w-[460px] px-3 py-1 rounded-md border border-border-input text-form-field placeholder:text-md text-text-body outline-none focus:ring-1 focus:ring-black'
					/>

					{/* Refresh Icon */}
					{/* <button
						type='button'
						title='Refresh'
						className='p-2 rounded-md text-text-body hover:text-text-title hover:bg-background-light transition-colors duration-200 flex items-center justify-center'
					>
						<RepeatIcon className='w-5 h-5' />
					</button> */}

					{/* Toggle Switches */}
					<ToggleSwitch
						label='EPOS'
						checked={showEPOS}
						onChange={(e) => setShowEPOS(e.target.checked)}
					/>
					<ToggleSwitch
						label='SIM'
						checked={showSIM}
						onChange={(e) => setShowSIM(e.target.checked)}
					/>
				</div>
			</div>
		</div>
	);
};

export default MissingCategorySearch;

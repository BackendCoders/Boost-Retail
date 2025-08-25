/** @format */

import { useState } from 'react';
import RepeatIcon from '../../../assets/icons/thin/RepeatThinIcon.jsx';
// ✅ Reusable Toggle Component
const ToggleSwitch = ({ label, checked = true, onChange }) => (
	<label className='flex items-center text-form-field text-text-body gap-3'>
		<input
			type='checkbox'
			checked={checked}
			onChange={onChange}
			className='peer w-4 h-4 accent-white border border-gray-950 checked:border-gray-950 rounded'
		/>
		{label}
	</label>
);

const SimProductSearch = () => {
	const [showEPOS, setShowEPOS] = useState(true);
	const [showSIM, setShowSIM] = useState(true);
	const [showSingleResult, setShowSingleResult] = useState(true);
	return (
		<div className='flex items-center justify-between bg-light gap-4'>
			{/* Left: Search + Filters */}
			<div className='flex flex-col gap-1'>
				<p className='text-lg text-black font-bold'>Search</p>

				<div className='flex items-center gap-4'>
					{/* Search Input */}
					<input
						type='text'
						placeholder='Enter MPN / Barcode / Title / Model'
						className='w-[460px] px-3 py-2 rounded-md border border-border-input text-form-field placeholder:text-md text-text-body bg-light outline-none focus:ring-1 focus:ring-black'
					/>

					{/* Refresh Icon */}
					<button
						type='button'
						title='Refresh'
						className='p-2 rounded-md text-text-body hover:text-text-title hover:bg-background-light transition-colors duration-200 flex items-center justify-center'
					>
						<RepeatIcon className='w-5 h-5' />
					</button>

					{/* Toggle Switches */}
					<ToggleSwitch
						label='Categorized'
						checked={showEPOS}
						onChange={(e) => setShowEPOS(e.target.checked)}
					/>
					<ToggleSwitch
						label='Uncategorized'
						checked={showSIM}
						onChange={(e) => setShowSIM(e.target.checked)}
					/>
					<ToggleSwitch
						label='Single result per Model ID'
						checked={showSingleResult}
						onChange={(e) => setShowSingleResult(e.target.checked)}
					/>
				</div>
			</div>
		</div>
	);
};

export default SimProductSearch;

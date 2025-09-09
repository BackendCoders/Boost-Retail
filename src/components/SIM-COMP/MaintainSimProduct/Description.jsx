/** @format */

import { useState } from 'react';

const Description = () => {
	const [description, setDescription] = useState('');

	return (
		<div className='p-4 bg-gray-100 rounded-lg border border-gray-60 w-full h-full'>
			{/* Heading */}
			<h2 className='font-semibold text-base mb-4'>Description</h2>

			{/* Top bar: dropdown, password, button */}
			<div className='flex items-center gap-2 mb-5'>
				<textarea
					type='text'
					placeholder='Enter description'
					rows={10}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className='border px-3 py-1 rounded text-xs flex-1 bg-light'
				/>
			</div>
		</div>
	);
};

export default Description;

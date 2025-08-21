/** @format */

import { useState } from 'react';

const BatchEdit = () => {
	const [selected, setSelected] = useState('Price');
	const [password, setPassword] = useState('');
	const [fields, setFields] = useState({
		Cost: false,
		RRP: true,
		Price: false,
		Web: false,
		Sale: false,
	});
	const [values, setValues] = useState({
		Cost: '£10,000',
		RRP: '£10,000',
		Price: '£10,000',
		Web: '£10,000',
		Sale: '£10,000',
	});
	const [applyEnding, setApplyEnding] = useState(false);
	const [saleReason, setSaleReason] = useState('');

	const handleCheckboxChange = (field) =>
		setFields((prev) => ({ ...prev, [field]: !prev[field] }));

	const handleApply = () => {
		console.log({
			selected,
			password,
			fields,
			values,
			applyEnding,
			saleReason,
		});
	};

	const priceTypes = Object.keys(fields);

	return (
		<div className='p-4 bg-gray-100 rounded-lg border border-gray-320 w-full'>
			{/* Heading */}
			<h2 className='font-semibold text-base mb-4'>Batch Edit</h2>

			{/* Top bar: dropdown, password, button */}
			<div className='flex items-center gap-2 mb-6'>
				<select
					value={selected}
					onChange={(e) => setSelected(e.target.value)}
					className='border border-text-body px-3 py-1 rounded text-xs bg-light'
				>
					{priceTypes.map((type) => (
						<option
							key={type}
							value={type}
						>
							{type}
						</option>
					))}
				</select>

				<input
					type='password'
					placeholder='Enter Password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className='border border-text-body px-3 py-1 rounded text-xs flex-1 bg-light'
				/>

				<button
					onClick={handleApply}
					className='bg-primary hover:bg-blue-600 text-light text-xs font-medium px-4 py-1 rounded-2xl'
				>
					APPLY
				</button>
			</div>

			{/* Single‐column list of all price types */}
			<div className='space-y-3'>
				{priceTypes.map((key) => (
					<div
						key={key}
						className='flex items-center gap-2'
					>
						{/* checkbox + label */}
						<input
							type='checkbox'
							checked={fields[key]}
							onChange={() => handleCheckboxChange(key)}
							className='w-4 h-4 accent-blue-500'
						/>
						<span className='text-xs w-16'>{key}</span>

						{/* main value input */}
						<input
							type='text'
							value={values[key]}
							onChange={(e) =>
								setValues((prev) => ({ ...prev, [key]: e.target.value }))
							}
							disabled={!fields[key]}
							className={`border border-text-body px-2 py-1 rounded text-xs w-[90px] bg-light ${
								!fields[key] ? 'opacity-50 cursor-not-allowed' : ''
							}`}
						/>

						{/* Web: .99 ending */}
						{key === 'Web' && (
							<label className='ml-4 flex items-center gap-1 text-xs'>
								<input
									type='checkbox'
									checked={applyEnding}
									onChange={() => setApplyEnding((v) => !v)}
									className='accent-blue-500'
								/>
								Apply £0.99 Ending
							</label>
						)}

						{/* Sale: show reason input */}
						{key === 'Sale' && (
							<input
								type='text'
								placeholder='Enter Sale Reason'
								value={saleReason}
								onChange={(e) => setSaleReason(e.target.value)}
								disabled={!fields.Sale}
								className={`border border-text-body px-2 py-1 rounded text-xs flex-1 bg-light ${
									!fields.Sale ? 'opacity-50 cursor-not-allowed' : ''
								}`}
							/>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default BatchEdit;

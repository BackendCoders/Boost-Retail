/** @format */

export default function DetailForm() {
	return (
		<div className='p-4 bg-light rounded-lg border border-gray-60 w-full h-full'>
			{/* Heading */}
			<h2 className='font-semibold text-base mb-4'>Details</h2>
			<form>
				<div className='flex items-center gap-2 mb-2'>
					<label className='w-28 text-end'>Title</label>
					<input
						type='text'
						className='flex-1 px-3 py-1 rounded-md border border-border-input text-form-field placeholder:text-md text-text-body bg-light outline-none focus:ring-1 focus:ring-black'
					/>
				</div>
				<div className='flex items-center gap-2 mb-2'>
					<label className='w-28 text-end'>Model</label>
					<input
						type='text'
						className='flex-1 px-3 py-1 rounded-md border border-border-input text-form-field placeholder:text-md text-text-body bg-light outline-none focus:ring-1 focus:ring-black'
					/>
				</div>
				<div className='flex items-center gap-2 mb-2'>
					<label className='w-28 text-end'>Year</label>
					<input
						type='text'
						className='flex-1 px-3 py-1 rounded-md border border-border-input text-form-field placeholder:text-md text-text-body bg-light outline-none focus:ring-1 focus:ring-black'
					/>
				</div>
				<div className='flex items-center gap-2 mb-2'>
					<label className='w-28 text-end'>Brand</label>
					<input
						type='text'
						className='flex-1 px-3 py-1 rounded-md border border-border-input text-form-field placeholder:text-md text-text-body bg-light outline-none focus:ring-1 focus:ring-black'
					/>
				</div>
			</form>
		</div>
	);
}

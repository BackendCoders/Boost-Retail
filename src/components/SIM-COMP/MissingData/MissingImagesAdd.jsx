/** @format */

const MissingImagesAdd = ({ selectedCategory }) => {
	return (
		<div className='flex items-center justify-between gap-4'>
			{/* Left: Search + Filters */}
			<div className='flex flex-col gap-4 flex-1'>
				<p className='text-lg text-black font-bold'>Add Images</p>

				<div className='flex items-center gap-4'>
					<div className='flex flex-col flex-1 item-center gap-1'>
						<label>Title</label>
						<input
							type='text'
							value={selectedCategory?.title}
							readOnly
							className='border border-border-input rounded-md text-form-field placeholder:text-md text-text-body outline-none focus:ring-1 focus:ring-black px-3 py-1'
							placeholder='Title'
						/>
					</div>
					<div className='flex flex-col flex-1 item-center gap-1'>
						<label>Model</label>
						<input
							type='text'
							value={selectedCategory?.model}
							readOnly
							className='border border-border-input rounded-md text-form-field placeholder:text-md text-text-body outline-none focus:ring-1 focus:ring-black px-3 py-1'
							placeholder='Model'
						/>
					</div>
					<div className='flex flex-col flex-1 item-center gap-1'>
						<label>Brand</label>
						<input
							type='text'
							value={selectedCategory?.brand} // Replace with dynamic if needed
							className='border border-border-input rounded-md text-form-field placeholder:text-md text-text-body outline-none focus:ring-1 focus:ring-black px-3 py-1'
							placeholder='Brand'
						/>
					</div>
					<div className='flex flex-col flex-1 item-center gap-1'>
						<label>Supplier</label>
						<input
							type='text'
							value='Giant' // Replace with dynamic if needed
							readOnly
							className='border border-border-input rounded-md text-form-field placeholder:text-md text-text-body outline-none focus:ring-1 focus:ring-black px-3 py-1'
							placeholder='Supplier'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MissingImagesAdd;

/** @format */

const MissingImagesSearch = ({ advancedMode }) => {
	return (
		<div className='flex items-center justify-between bg-light gap-4'>
			{/* Left: Search + Filters */}
			<div className='flex flex-col gap-1'>
				<p className='text-lg text-black font-bold'>Search</p>

				{!advancedMode && (
					<div className='flex items-center gap-4'>
						{/* Search Input */}
						<input
							type='text'
							placeholder='Enter MPN / Model / Title'
							className='w-[460px] px-3 py-1 rounded-md border border-border-input text-form-field placeholder:text-md text-text-body bg-light outline-none focus:ring-1 focus:ring-black'
						/>

						{/* Refresh Icon */}
						{/* <button
                        type='button'
                        title='Refresh'
                        className='p-2 rounded-md text-text-body hover:text-text-title hover:bg-background-light transition-colors duration-200 flex items-center justify-center'
                    >
                        <RepeatIcon className='w-5 h-5' />
                    </button> */}
					</div>
				)}
			</div>
		</div>
	);
};

export default MissingImagesSearch;

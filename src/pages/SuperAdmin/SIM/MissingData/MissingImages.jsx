/** @format */

import { useEffect, useState } from 'react';
import MissingImagesSearch from '../../../../components/SIM-COMP/MissingData/MissingImagesSearch';
import MissingImagesTable from '../../../../components/SIM-COMP/MissingData/MissingImagesTable';
import ImageReorder from '../../../../components/SIM-COMP/MissingData/ImageReorder';
import MissingImagesDetailsTable from '../../../../components/SIM-COMP/MissingData/MissingImagesDetailsTable';
import MissingImagesAdd from '../../../../components/SIM-COMP/MissingData/MissingImagesAdd';

const fakeCategories = [
	{
		id: 1,
		image:
			'https://m.media-amazon.com/images/I/713xBaYiURL._UF894,1000_QL80_.jpg',
		images: [
			{
				id: 'img1',
				url: 'https://plus.unsplash.com/premium_photo-1678718712069-4cd5ddc8819c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmljeWNsZXxlbnwwfHwwfHx8MA%3D%3D',
			},
			{ id: 'img2', url: 'https://i.imgur.com/4ZQZ4dZ.png' },
			{ id: 'img3', url: 'https://i.imgur.com/4ZQZ4dZ.png' },
			{ id: 'img4', url: 'https://i.imgur.com/4ZQZ4dZ.png' },
			{ id: 'img5', url: 'https://i.imgur.com/4ZQZ4dZ.png' },
			{ id: 'img6', url: 'https://i.imgur.com/4ZQZ4dZ.png' },
			// Add more images as needed
		],
		simPn: '123456789',
		eposPn: '0123456',
		mpn: 'TC56787',
		barcode: '123456789',
		title: 'Giant TCR Advanced',
		model: 'TCR',
		color: 'Grey',
		size: 'S',
		seasonYear: '2025',
		rrp: 3000,
		supplierUrl: 'https://supplier.com/product/123456789',
	},
	{
		id: 2,
		image: '',
		images: [],
		simPn: '123456788',
		eposPn: '0123455',
		mpn: 'TC56788',
		barcode: '123456789',
		title: 'Liv Envie 0',
		model: 'Enve',
		color: 'Black',
		size: 'L',
		seasonYear: '2025',
		rrp: 3000,
		supplierUrl: 'https://supplier.com/product/123456788',
	},
	{
		id: 3,
		image: '',
		images: [],
		simPn: '123456787',
		eposPn: '0123454',
		mpn: 'TC56789',
		barcode: '123456789',
		title: 'Trek Rail+ 0',
		model: 'Rail+',
		color: 'Blue',
		size: 'L',
		seasonYear: '2025',
		rrp: 3000,
		supplierUrl: 'https://supplier.com/product/123456787',
	},
];
const fakeInitialCategories = [
	{
		id: 1,
		mpn: '123456789',
		title: 'Giant TCR Advanced',
		model: 'TCR',
		brand: 'TCR',
		seasonYear: '2025',
		category1: 'Bikes',
		category2: 'Road',
		category3: 'Performance',
		price: 6000,
	},
	{
		id: 2,
		mpn: '123456788',
		title: 'Liv Envie 0',
		model: 'Enve',
		brand: 'Enve',
		seasonYear: '2025',
		category1: 'Bikes',
		category2: 'Road',
		category3: 'Endurance',
		price: 4500,
	},
	{
		id: 3,
		mpn: '123456787',
		title: 'Trek Rail+ 0',
		model: 'Rail+',
		brand: 'Rail+',
		seasonYear: '2025',
		category1: 'Bikes',
		category2: 'Mountain',
		category3: 'Full Suspension',
		price: 2300,
	},
];

const MissingImages = () => {
	const [initialCategories, setInitialCategories] = useState(
		fakeInitialCategories
	);
	const [categories, setCategories] = useState(fakeCategories);
	const [advancedMode, setAdvancedMode] = useState(false);
	const [selectedInitialCategoryId, setSelectedInitialCategoryId] =
		useState(null);
	const [selectedCategoryId, setSelectedCategoryId] = useState(null);

	const selectedInitialCategory = initialCategories.find(
		(item) => item.id === selectedInitialCategoryId
	);

	const selectedCategory = categories.find(
		(item) => item.id === selectedCategoryId
	);

	const updateImageOrder = (categoryId, newImages) => {
		setCategories((prevCategories) =>
			prevCategories.map((category) =>
				category.id === categoryId
					? { ...category, images: newImages }
					: category
			)
		);
	};

	const handleFiles = (files) => {
		// Filter for only image files
		const imageFiles = files.filter((file) => file.type.match('image.*'));

		if (imageFiles.length === 0) {
			alert('Please upload only image files');
			return;
		}

		// Process the files (example: create previews and add to state)
		const newImages = imageFiles.map((file) => ({
			id: URL.createObjectURL(file), // Using object URL as temporary ID
			url: URL.createObjectURL(file), // For preview
			file, // Store the actual file object
		}));

		// Update your state (example using the first category)
		setCategories((prevCategories) =>
			prevCategories.map((category) =>
				category.id === 1
					? { ...category, images: [...category.images, ...newImages] }
					: category
			)
		);
	};

	useEffect(() => {
		return () => {
			// Clean up object URLs when component unmounts
			categories.forEach((category) => {
				category.images?.forEach((image) => {
					if (image.url.startsWith('blob:')) {
						URL.revokeObjectURL(image.url);
					}
				});
			});
		};
	}, [categories]);

	console.log({ selectedCategoryId, selectedCategory });

	return (
		<div className='space-y-4'>
			{/* Header Section */}
			<div className=''>
				<div className='flex justify-between items-center py-3 border-b border-b-border-grid'>
					<h1 className='text-xl font-bold'>INCORRECT DATA</h1>
					{selectedInitialCategoryId && (
						<div className='flex items-center gap-2'>
							<span>Advanced Mode</span>
							<label className='relative inline-flex items-center cursor-pointer'>
								<input
									type='checkbox'
									className='sr-only'
									checked={advancedMode}
									onChange={() => setAdvancedMode((p) => !p)}
								/>
								<div
									className={`w-11 h-6 rounded-full transition ${
										advancedMode ? 'bg-primary' : 'bg-gray-400'
									}`}
								>
									<div
										className={`absolute top-0.5 w-5 h-5 bg-light rounded-full transition ${
											advancedMode ? 'left-5' : 'left-0.5'
										}`}
									/>
								</div>
							</label>
						</div>
					)}
				</div>
				<div className='flex justify-between items-center py-3 border-b border-b-border-grid'>
					<p className='text-sm mt-1'>Missing Images</p>
					<span className='text-sm font-semibold'>
						Missing Categories: {categories.length}
					</span>
				</div>
			</div>

			{/* Search */}

			{!selectedInitialCategoryId ? (
				<MissingImagesSearch advancedMode={advancedMode} />
			) : (
				<MissingImagesAdd selectedCategory={selectedInitialCategory} />
			)}

			{advancedMode && selectedCategory && (
				<div className='grid grid-cols-5 gap-4 rounded-lg'>
					{/* Upload Section */}
					<div className='col-span-1 bg-gray-300 border shadow-sm p-4 rounded-lg'>
						<h2 className='font-semibold mb-2'>Upload Images</h2>
						<div
							className='flex flex-col items-center justify-center bg-white border-dashed border-2 border-gray-400 rounded-lg p-4 min-h-36 max-h-36 relative'
							onDragOver={(e) => {
								e.preventDefault();
								e.currentTarget.classList.add('border-blue-500', 'bg-blue-50');
							}}
							onDragLeave={(e) => {
								e.preventDefault();
								e.currentTarget.classList.remove(
									'border-blue-500',
									'bg-blue-50'
								);
							}}
							onDrop={(e) => {
								e.preventDefault();
								e.currentTarget.classList.remove(
									'border-blue-500',
									'bg-blue-50'
								);
								const files = Array.from(e.dataTransfer.files);
								handleFiles(files);
							}}
						>
							<input
								type='file'
								id='file-upload'
								className='hidden'
								multiple
								accept='image/*'
								onChange={(e) => {
									const files = Array.from(e.target.files);
									handleFiles(files);
								}}
							/>
							<div className='w-10 h-10'>
								<img
									src='https://www.pngplay.com/wp-content/uploads/8/Upload-Icon-Logo-Transparent-Image.png'
									className='object-cover'
									alt='Upload icon'
								/>
							</div>
							<div className='text-center text-sm text-gray-500 mb-2'>
								Drag & Drop to Upload Images OR
							</div>
							<label
								htmlFor='file-upload'
								className='bg-blue-500 text-white text-sm px-4 py-1 rounded hover:bg-blue-600 cursor-pointer'
							>
								BROWSE FILES
							</label>
						</div>
					</div>
					<div className='col-span-3 bg-gray-300 border  shadow-sm p-4 rounded-lg'>
						<div className='flex gap-4'>
							{/* Main Image */}
							<div className='flex-1 flex flex-col'>
								<h2 className='font-semibold mb-2'>Main Images</h2>
								<img
									src={selectedCategory.image}
									alt='Main'
									className='object-contain max-h-32 w-full'
								/>
							</div>
							{/* Reorder Images */}
							<div className='flex-2'>
								<h2 className='font-semibold mb-2'>Reorder Images</h2>
								{/* <div className='grid grid-cols-5 gap-2'>
									{[...Array(10)].map((_, i) => (
										<div
											key={i}
											className='border rounded overflow-hidden flex items-center justify-center bg-white p-1'
										>
											<img
												src='https://i.imgur.com/4ZQZ4dZ.png'
												alt={`thumb-${i}`}
												className='h-14 object-contain'
											/>
										</div>
									))}
								</div> */}
								{selectedCategory.images?.length ? (
									<ImageReorder
										images={selectedCategory.images}
										setImages={(newOrder) =>
											updateImageOrder(selectedCategory.id, newOrder)
										}
									/>
								) : (
									<p className='text-sm text-gray-500'>No images to reorder</p>
								)}
							</div>
						</div>
					</div>

					{/* Apply Images */}
					<div className='col-span-1 border bg-gray-300 p-4 rounded'>
						<h2 className='font-semibold mb-2'>Apply Images</h2>
						<div className='flex flex-col gap-2 text-sm'>
							<label className='flex items-center gap-2'>
								<input
									type='checkbox'
									className='accent-blue-500'
								/>
								Apply to same colourway
							</label>
							<label className='flex items-center gap-2'>
								<input
									type='checkbox'
									className='accent-blue-500'
								/>
								Apply to single MPN
							</label>
							<label className='flex items-center gap-2'>
								<input
									type='checkbox'
									className='accent-blue-500'
								/>
								Apply to all selected MPNs
							</label>
							<button className='mt-4 bg-blue-500 text-white text-sm px-4 py-1 rounded-lg hover:bg-blue-600 w-24'>
								APPLY
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Grid */}
			{!selectedInitialCategory && (
				<MissingImagesTable
					selectedCategoryId={selectedInitialCategoryId}
					setSelectedCategoryId={setSelectedInitialCategoryId}
					categories={initialCategories}
				/>
			)}

			{/* Grid */}
			{selectedInitialCategoryId && (
				<MissingImagesDetailsTable
					selectedCategoryId={selectedCategoryId}
					setSelectedCategoryId={setSelectedCategoryId}
					categories={categories}
					setAdvancedMode={setAdvancedMode}
				/>
			)}
		</div>
	);
};

export default MissingImages;

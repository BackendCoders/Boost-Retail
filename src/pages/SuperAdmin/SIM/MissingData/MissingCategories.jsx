/** @format */

import { useState } from 'react';
import MissingCategorySearch from '../../../../components/SIM-COMP/MissingData/MissingCategorySearch';
import MissingCategoryTable from '../../../../components/SIM-COMP/MissingData/MissingCategoryTable';

const fakeCategories = [
	{
		id: 1,
		image: 'https://i.imgur.com/4ZQZ4dZ.png',
		mpn: '123456789',
		title: 'Giant TCR Advanced',
		model: 'TCR',
		supplierCategories: 'Bicycle, Road, Race',
		category1: 'Bike',
		category2: '',
		category3: '',
		shortDescription: `From hors catégorie climbs to rollers and flats, this WorldTour-level race bike is the pro choice for all-rounder performance.`,
		longDescription: `**SYSTEM OPTIMISATION**\nThe frameset, wheels, cockpit and other parts are engineered, developed and tested together to perform best as a system. The all-new OverDrive Aero steerer tube technology is combined with a Contact SLR AeroLight stem and Contact SLR handlebar to incorporate internal cable routing that also integrates the top cap, cables and spacers in a more aerodynamic, user-friendly setup. Tube technology is combined with a Contact SLR AeroLight stem and Contact SLR handlebar to incorporate internal cable routing that also integrates the top cap, cables and spacers in a more aerodynamic, user-friendly setup`,
		specifications: `Sizes: S, M, M/L, L, XL\nColours: Gloss Black, Lava/Isis\nFrame: Advanced SL-Grade Composite, 12x142mm thru-axle, integrated seatpost, disc\nHandlebar: Giant Contact SLR\nFork: OverDrive Aero, full-composite`,
	},
	{
		id: 2,
		image: 'https://i.imgur.com/4ZQZ4dZ.png',
		mpn: '123456788',
		title: 'Liv Envie 0',
		model: 'Enve',
		supplierCategories: 'Bicycle, Wmns Road, TT',
		category1: 'Bike',
		category2: '',
		category3: '',
		shortDescription: `Women's time-trial and race performance bike for ultimate speed.`,
		longDescription: `**AERO FRAME DESIGN**\nLightweight and wind-cheating frame designed specifically for female athletes.`,
		specifications: `Sizes: XS, S, M\nColours: Purple Rush\nFrame: ALUXX SL-Grade Aluminum, Aero tubes\nFork: Composite OverDrive`,
	},
	{
		id: 3,
		image: 'https://i.imgur.com/4ZQZ4dZ.png',
		mpn: '123456787',
		title: 'Trek Rail+ 0',
		model: 'Rail+',
		supplierCategories: 'Bike, Electric, Mountain',
		category1: 'Bike',
		category2: 'Electric Mountain',
		category3: '',
		shortDescription: `An electric mountain bike that’s built for serious trail riding.`,
		longDescription: `**FULL POWER TRAIL MACHINE**\nThe Rail+ combines rugged design with a powerful motor to handle any terrain with ease.`,
		specifications: `Sizes: M, L, XL\nMotor: Bosch Performance Line CX\nBattery: 625Wh\nFork: RockShox Yari RC, 160mm`,
	},
];

const MissingCategories = () => {
	const [advancedMode, setAdvancedMode] = useState(false);
	const [selectedCategoryId, setSelectedCategoryId] = useState(null);

	const selectedCategory = fakeCategories.find(
		(item) => item.id === selectedCategoryId
	);

	console.log({ selectedCategoryId, selectedCategory });

	return (
		<div className='space-y-4'>
			{/* Header Section */}
			<div className=''>
				<div className='flex justify-between items-center py-3 border-b border-b-border-grid'>
					<h1 className='text-xl font-bold'>INCORRECT DATA</h1>
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
				</div>
				<div className='flex justify-between items-center py-3 border-b border-b-border-grid'>
					<p className='text-sm mt-1'>Missing Categories</p>
					<span className='text-sm font-semibold'>
						Missing Categories: {fakeCategories.length}
					</span>
				</div>
			</div>

			{/* Search */}
			<div className=''>
				<MissingCategorySearch />
			</div>

			{advancedMode && selectedCategory && (
				<div className='grid grid-cols-3 gap-4'>
					{/* Short Description Card */}
					<div className='bg-gray-300 border  shadow-sm p-4 rounded-lg'>
						<h2 className='font-semibold mb-2'>Short Description</h2>
						<div className='bg-white rounded-md min-h-48 max-h-48 overflow-y-auto p-2'>
							<p className='text-sm text-gray-700 whitespace-pre-line'>
								{selectedCategory.shortDescription}
							</p>
						</div>
					</div>

					{/* Long Description Card */}
					<div className='bg-gray-300 border  shadow-sm p-4 rounded-lg'>
						<h2 className='font-semibold mb-2'>Long Description</h2>
						<div className='bg-white rounded-md min-h-48 max-h-48 overflow-y-auto p-2'>
							<p className='text-sm text-gray-700 whitespace-pre-line'>
								{selectedCategory.longDescription}
							</p>
						</div>
					</div>

					{/* Specification Card */}
					<div className='bg-gray-300 border  shadow-sm p-4 rounded-lg'>
						<h2 className='font-semibold mb-2'>Specification</h2>
						<div className='bg-white rounded-md min-h-48 max-h-48 overflow-y-auto p-2'>
							<p className='text-sm text-gray-700 whitespace-pre-line'>
								{selectedCategory.specifications}
							</p>
						</div>
					</div>
				</div>
			)}

			{/* Grid */}
			<MissingCategoryTable
				selectedCategoryId={selectedCategoryId}
				setSelectedCategoryId={setSelectedCategoryId}
				categories={fakeCategories}
			/>
		</div>
	);
};

export default MissingCategories;

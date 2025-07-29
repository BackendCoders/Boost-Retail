/** @format */

import { useState } from 'react';
import SupplierFeedsTable from '../../../components/SIM-COMP/MaintainSupplierFeeds/SupplierFeedsTable';
import SelectedFeedOverview from '../../../components/SIM-COMP/MaintainSupplierFeeds/SelectedFeedOverview';

const initialFeeds = [
	{
		id: 1,
		supplier: 'Giant',
		feedName: 'Giant Main Feed',
		feedAddress: 'Address to API / URL / CSV etc here',
		apiKey: '4671265316754',
		username: 'BoostRetail',
		password: 'BR1234',
		lastUpdated: '24/07/2025 22:30',
		newProducts: 60,
		unCategorizedProduct: 10,
		categoryConflict: 0,
		missingData: 5,
		active: true,
	},
	{
		id: 2,
		supplier: 'Trek',
		feedName: 'Trek',
		feedAddress: 'Address to API / URL / CSV etc here',
		apiKey: '4671265316754',
		username: 'BoostRetail',
		password: 'BR1234',
		lastUpdated: '24/07/2025 22:30',
		newProducts: 50,
		unCategorizedProduct: 0,
		categoryConflict: 1,
		missingData: 5,
		active: true,
	},
	{
		id: 3,
		supplier: 'Madison',
		feedName: 'Madison',
		feedAddress: 'Address to API / URL / CSV etc here',
		apiKey: '4671265316754',
		username: 'BoostRetail',
		password: 'BR1234',
		lastUpdated: '24/07/2025 22:30',
		newProducts: 20,
		unCategorizedProduct: 10,
		categoryConflict: 4,
		missingData: 2,
		active: true,
	},
	{
		id: 4,
		supplier: 'Zyro Fisher',
		feedName: 'Zyro Fisher',
		feedAddress: 'Address to API / URL / CSV etc here',
		apiKey: '4671265316754',
		username: 'BoostRetail',
		password: 'BR1234',
		lastUpdated: '24/07/2025 22:30',
		newProducts: 24,
		unCategorizedProduct: 1,
		categoryConflict: 5,
		missingData: 4,
		active: true,
	},
];

const MaintainSupplierFeeds = () => {
	const [feeds, setFeeds] = useState(initialFeeds);
	const [selectedFeedId, setSelectedFeedId] = useState(null);

	const handleChange = (id, key, value) => {
		setFeeds((prev) =>
			prev.map((feed) => (feed.id === id ? { ...feed, [key]: value } : feed))
		);
	};

	const handleDelete = (id) => {
		setFeeds(feeds.filter((feed) => feed.id !== id));
		if (selectedFeedId === id) {
			setSelectedFeedId(null);
		}
	};

	const handleAdd = () => {
		const newFeed = {
			id: feeds.length + 1,
			supplier: '',
			feedName: '',
			feedAddress: '',
			apiKey: '',
			username: '',
			password: '',
			active: true,
		};
		setFeeds([...feeds, newFeed]);
		setSelectedFeedId(newFeed.id);
	};

	const selectedFeed = feeds.find((feed) => feed.id === selectedFeedId);

	return (
		<div className='space-y-4'>
			{/* Header Section */}
			<div className=''>
				<div className='flex justify-between items-center py-3 border-b border-b-border-grid'>
					<h1 className='text-xl font-bold'>SUPPLIER FEEDS</h1>
				</div>
				<div className='flex justify-between items-center py-3 border-b border-b-border-grid'>
					<p className='text-sm mt-1'>Maintain Supplier Feeds</p>
					<span className='text-sm font-semibold'>
						Lookup Tables: {feeds.length}
					</span>
				</div>
			</div>

			{/* Grid */}
			<SupplierFeedsTable
				supplierFeeds={feeds}
				onChange={handleChange}
				onDelete={handleDelete}
				onAdd={handleAdd}
				selectedFeedId={selectedFeedId}
				setSelectedFeedId={setSelectedFeedId}
			/>

			<SelectedFeedOverview selectedFeed={selectedFeed} />
		</div>
	);
};

export default MaintainSupplierFeeds;

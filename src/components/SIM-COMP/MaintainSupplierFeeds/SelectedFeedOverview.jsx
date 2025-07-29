/** @format */

export default function SelectedFeedOverview({ selectedFeed }) {
	if (!selectedFeed) return null;

	const {
		feedName,
		lastUpdated,
		newProducts,
		unCategorizedProduct,
		categoryConflict,
		missingData,
	} = selectedFeed;

	return (
		<div className='text-sm text-black px-4 py-2'>
			<h2 className='text-lg font-bold mb-2'>{feedName} Information</h2>
			<p>
				<strong>Last Updated:</strong> {lastUpdated}
			</p>
			<p>
				<strong>New Products:</strong> {newProducts}
			</p>
			<p>
				<strong>Uncategorized products:</strong> {unCategorizedProduct}
			</p>
			<p>
				<strong>Category conflicts:</strong> {categoryConflict}
			</p>
			<p>
				<strong>Missing Key Data:</strong> {missingData}
			</p>
		</div>
	);
}

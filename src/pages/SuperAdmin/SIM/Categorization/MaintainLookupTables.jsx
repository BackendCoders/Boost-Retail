/** @format */

import { useEffect, useState } from 'react';
import LookupTable from '../../../../components/SIM-COMP/MaintainLookupTable/LookupTable';
import RowEditorTable from '../../../../components/SIM-COMP/MaintainLookupTable/RowEditorTable';
import { useDispatch, useSelector } from 'react-redux';
import { refreshAllLookupTablesData } from '../../../../slice/categorySlice';

const initialRows = [
	{
		id: 1,
		brand: 'Giant',
		model: 'TCR',
		category1: 'Bike',
		category2: 'Road',
		category3: 'Performance',
		active: true,
	},
	{
		id: 2,
		brand: 'Giant',
		model: 'Roam',
		category1: 'Bike',
		category2: 'Hybrid',
		category3: 'Suspension',
		active: true,
	},
	{
		id: 3,
		brand: 'Giant',
		model: 'TCR SL',
		category1: 'Bike',
		category2: 'Road',
		category3: 'Endurance',
		active: true,
	},
];

const MaintainLookupTables = () => {
	const dispatch = useDispatch();
	const { lookupTablesData } = useSelector((state) => state.category);
	const [selectedTableId, setSelectedTableId] = useState(null);
	const [rows, setRows] = useState(initialRows);

	const handleAddRow = () => {
		const newRow = {
			id: rows.length + 1,
			active: true,
		};

		(selectedTable?.columns || []).forEach((col) => {
			newRow[col.toLowerCase().replace(/\s+/g, '')] = '';
		});

		setRows([...rows, newRow]);
	};

	const handleChange = (id, key, value) => {
		setRows(
			rows.map((row) => (row.id === id ? { ...row, [key]: value } : row))
		);
	};

	const handleDeleteRow = (id) => {
		setRows(rows.filter((row) => row.id !== id));
	};

	const selectedTable = lookupTablesData.find((t) => t.id === selectedTableId);

	useEffect(() => {
		dispatch(refreshAllLookupTablesData());
	}, [dispatch]);

	return (
		<div className='space-y-4'>
			{/* Header Section */}
			<div className=''>
				<div className='flex justify-between items-center py-3 border-b border-b-border-grid'>
					<h1 className='text-xl font-bold'>CATEGORIZATION</h1>
				</div>
				<div className='flex justify-between items-center py-3 border-b border-b-border-grid'>
					<p className='text-sm mt-1'>Maintain Lookup Tables</p>
					<span className='text-sm font-semibold'>
						Lookup Tables: {lookupTablesData.length}
					</span>
				</div>
			</div>
			{/* Top Grid */}
			<LookupTable
				lookupTables={lookupTablesData}
				selectedTableId={selectedTableId}
				setSelectedTableId={setSelectedTableId}
			/>

			{/* Bottom Grid */}
			{selectedTable && (
				<RowEditorTable
					title={selectedTable?.tableName?.split(' ')[0] || 'Rows'}
					rows={rows}
					onChange={handleChange}
					onDelete={handleDeleteRow}
					onAdd={handleAddRow}
					dynamicColumns={selectedTable?.columns || []}
				/>
			)}
		</div>
	);
};

export default MaintainLookupTables;

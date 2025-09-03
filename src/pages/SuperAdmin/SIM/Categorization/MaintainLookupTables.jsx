/** @format */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LookupTable from '../../../../components/SIM-COMP/MaintainLookupTable/LookupTable';
import RowEditorTable from '../../../../components/SIM-COMP/MaintainLookupTable/RowEditorTable';
import {
	refreshAllLookupTablesData,
	refreshAllRowEditorTableData,
	setRowEditorTableData,
} from '../../../../slice/categorySlice';

const MaintainLookupTables = () => {
	const dispatch = useDispatch();
	const { lookupTablesData, rowEditorTableData } = useSelector(
		(state) => state.category
	);
	const [selectedTableId, setSelectedTableId] = useState(null);

	const handleAddRow = () => {
		const newRow = {
			id: rowEditorTableData.length + 1,
			active: true,
		};

		(selectedTable?.columns || []).forEach((col) => {
			newRow[col.toLowerCase().replace(/\s+/g, '')] = '';
		});

		setRowEditorTableData([...rowEditorTableData, newRow]);
	};

	const handleChange = (id, key, value) => {
		setRowEditorTableData(
			rowEditorTableData.map((row) =>
				row.id === id ? { ...row, [key]: value } : row
			)
		);
	};

	const handleDeleteRow = (id) => {
		setRowEditorTableData(rowEditorTableData.filter((row) => row.id !== id));
	};

	const selectedTable = lookupTablesData.find((t) => t.id === selectedTableId);

	useEffect(() => {
		dispatch(refreshAllLookupTablesData());
	}, [dispatch]);

	useEffect(() => {
		if (selectedTableId) {
			dispatch(refreshAllRowEditorTableData(selectedTableId));
		}
	}, [dispatch, selectedTableId]);

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
					onChange={handleChange}
					onDelete={handleDeleteRow}
					onAdd={handleAddRow}
					selectedTableId={selectedTableId}
				/>
			)}
		</div>
	);
};

export default MaintainLookupTables;

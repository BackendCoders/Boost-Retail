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

	const handleChange = (rowKey, key, newValue) => {
		dispatch(
			setRowEditorTableData(
				rowEditorTableData.map((row) => {
					const identifier = row.id ?? row.localId;

					if (identifier !== rowKey) return row;

					// Update the correct property inside dynamicProperties
					const updatedProps = row.dynamicProperties.map(
						(prop) =>
							prop.columnName.trim().toLowerCase() === key.trim().toLowerCase()
								? {
										...prop,
										value: newValue.value ?? newValue,
										filter: newValue.filter ?? prop.filter,
								  }
								: { ...prop } // Spread to ensure new reference
					);

					return { ...row, dynamicProperties: updatedProps };
				})
			)
		);
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
				<div className='flex justify-between items-center py-3 border-b border-b-gray-60'>
					<h1 className='text-xl font-bold'>CATEGORIZATION</h1>
				</div>
				<div className='flex justify-between items-center py-3 border-b border-b-gray-60'>
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
					selectedTableId={selectedTableId}
				/>
			)}
		</div>
	);
};

export default MaintainLookupTables;

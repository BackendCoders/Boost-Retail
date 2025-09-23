/** @format */

import { useSelector } from 'react-redux';
import SelectInput from '../../Ui/Input/SelectInput';
import { useEffect, useMemo, useState } from 'react';

export default function CategoryCell({
	row,
	rawKey,
	normalizedKey,
	prop,
	onChange,
}) {
	const { categoriesOptions } = useSelector((state) => state.category);
	const [localValue, setLocalValue] = useState(prop?.value ?? null);

	// 🔹 SYNC local value when prop changes
	useEffect(() => {
		setLocalValue(prop?.value ?? null);
	}, [prop?.value]);

	console.log('----', localValue);

	// 🔹 Get CURRENT values from row (not stale values) - USE useMemo
	const categoryValues = useMemo(() => {
		return {
			category1: row.dynamicProperties.find(
				(p) => p.columnName === 'Category 1'
			)?.value,
			category2: row.dynamicProperties.find(
				(p) => p.columnName === 'Category 2'
			)?.value,
			category3: row.dynamicProperties.find(
				(p) => p.columnName === 'Category 3'
			)?.value,
		};
	}, [row.dynamicProperties]); // 🔹 Re-calculate when dynamicProperties change

	console.log('categoryValue', categoryValues);

	// 🔹 Dynamically calculate options based on the parent selection - USE useMemo
	const options = useMemo(() => {
		if (normalizedKey === 'category1') {
			return categoriesOptions
				.filter((c) => c.parentId === null)
				.map((c) => ({ value: c.id, label: c.name }));
		} else if (normalizedKey === 'category2') {
			if (!categoryValues.category1) return []; // No options if parent not selected
			return categoriesOptions
				.filter((c) => c.parentId === categoryValues.category1)
				.map((c) => ({ value: c.id, label: c.name }));
		} else if (normalizedKey === 'category3') {
			if (!categoryValues.category2) return []; // No options if parent not selected
			return categoriesOptions
				.filter((c) => c.parentId === categoryValues.category2)
				.map((c) => ({ value: c.id, label: c.name }));
		}
		return [];
	}, [
		normalizedKey,
		categoryValues.category1,
		categoryValues.category2,
		categoriesOptions,
	]); // 🔹 ADD DEPENDENCIES

	const handleChange = (selected) => {
		console.log('selected----', selected);
		const newValue = selected ? selected.value : null;

		// 🔹 Update local state immediately
		setLocalValue(newValue);

		console.log('handleChange new Value', newValue);

		// 🔹 Update this column's value
		onChange(row.id ?? row.localId, rawKey, {
			...prop,
			value: newValue,
		});

		// 🔹 Reset child categories if parent changes
		const resetCategory = (categoryName) => {
			// 🔹 Find the prop with exact match (case insensitive, trimmed)
			const categoryProp = row.dynamicProperties.find(
				(p) => p.columnName.trim().toLowerCase() === categoryName.toLowerCase()
			);

			console.log('categoryProp', { categoryProp, categoryName });

			if (categoryProp) {
				onChange(row.id ?? row.localId, categoryName, {
					...categoryProp,
					value: null,
				});
				console.log(`✅ onChange called for ${categoryName}`);
			} else {
				// 🔹 Create new prop if not found
				onChange(row.id ?? row.localId, categoryName, {
					columnName: categoryName,
					value: null,
					columnType: 0, // Adjust as per your needs
				});
			}
		};

		if (normalizedKey === 'category1') {
			console.log('Resetting Category 2 and Category 3');
			resetCategory('Category 2');
			resetCategory('Category 3');
		} else if (normalizedKey === 'category2') {
			console.log('Resetting Category 3');
			resetCategory('Category 3');
		}
	};

	return (
		<div className='min-w-[10rem] max-w-[12rem]'>
			<SelectInput
				options={options}
				value={options.find((o) => o.value === localValue) || null}
				placeholder='Select'
				inTable
				onChange={handleChange}
				key={localValue}
			/>
		</div>
	);
}

/** @format */
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import SelectInput from '../../Ui/Input/SelectInput';

export default function CategoryCell({
	row,
	normalizedKey,
	prop,
	onChange,
	onBlur,
}) {
	const { categoriesOptions } = useSelector((state) => state.category);

	const [categoryOptions, setCategoryOptions] = useState({
		category1: [],
		category2: [],
		category3: [],
	});

	const [selectedOption, setSelectedOption] = useState(null);

	const getValueFromRow = (columnName) =>
		row.dynamicProperties?.find(
			(d) => d.columnName.toLowerCase() === columnName.toLowerCase()
		)?.value ?? null;

	const mapValueToOption = (val, opts) =>
		val ? opts.find((o) => o.value === val) || null : null;

	const buildOptions = (parentId) =>
		categoriesOptions
			.filter((opt) => opt.parentId === parentId)
			.map((opt) => ({ value: opt.id, label: opt.name }));

	// --- INITIAL LOAD ---
	useEffect(() => {
		const cat1Val = getValueFromRow('Category 1');
		const cat2Val = getValueFromRow('Category 2');
		const cat3Val = getValueFromRow('Category 3');

		const newOptions = {
			category1: buildOptions(null),
			category2: cat1Val ? buildOptions(cat1Val) : [],
			category3: cat2Val ? buildOptions(cat2Val) : [],
		};

		setCategoryOptions(newOptions);

		// Set selected option based on current prop value
		const initialOption = mapValueToOption(
			prop?.value,
			newOptions[normalizedKey]
		);
		setSelectedOption(initialOption);
	}, [categoriesOptions, row, prop?.value, normalizedKey]);

	const handleSelection = (option) => {
		setSelectedOption(option);

		if (normalizedKey === 'category1') {
			const children2 = buildOptions(option.value);
			setCategoryOptions((prev) => ({
				...prev,
				category2: children2,
				category3: [],
			}));

			onChange?.(row.id ?? row.localId, 'Category 1', option);
			onChange?.(row.id ?? row.localId, 'Category 2', null);
			onChange?.(row.id ?? row.localId, 'Category 3', null);
		} else if (normalizedKey === 'category2') {
			const children3 = buildOptions(option.value);
			setCategoryOptions((prev) => ({
				...prev,
				category3: children3,
			}));

			onChange?.(row.id ?? row.localId, 'Category 2', option);
			onChange?.(row.id ?? row.localId, 'Category 3', null);
		} else if (normalizedKey === 'category3') {
			onChange?.(row.id ?? row.localId, 'Category 3', option);
		}
		onBlur?.();
	};

	return (
		<div className='min-w-[10rem] max-w-[12rem]'>
			<SelectInput
				options={categoryOptions[normalizedKey] ?? []}
				value={selectedOption}
				placeholder='Select'
				inTable
				onChange={handleSelection}
				key={`${normalizedKey}-${row.id ?? row.localId}`}
			/>
		</div>
	);
}

/** @format */

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const RuleIcon = () => (
	<svg
		className='w-4 h-4 mr-2'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		viewBox='0 0 24 24'
	>
		<path
			d='M5 12h14M12 5l7 7-7 7'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);
const GroupIcon = () => (
	<svg
		className='w-4 h-4 mr-2'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		viewBox='0 0 24 24'
	>
		<path
			d='M8 7a4 4 0 1 1 8 0M12 14v7M5 21h14'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

const ConditionRow = ({
	rule,
	onChangeField,
	onChangeOp,
	onChangeValue,
	onRemove,
}) => (
	<div className='flex gap-2 mb-2 items-center'>
		<select
			className='border rounded px-2 py-1 text-sm w-40'
			value={rule.field}
			onChange={(e) => onChangeField(rule.id, e.target.value)}
		>
			<option value='Category'>Category</option>
			<option value='Price'>Price</option>
		</select>
		<select
			className='border rounded px-2 py-1 text-sm w-36'
			value={rule.operator}
			onChange={(e) => onChangeOp(rule.id, e.target.value)}
		>
			<option value='Equals'>Equals</option>
			<option value='Contains'>Contains</option>
			<option value='>='>&gt;=</option>
		</select>
		<input
			className='border rounded px-2 py-1 text-sm w-40'
			value={rule.value}
			onChange={(e) => onChangeValue(rule.id, e.target.value)}
		/>
		<button
			onClick={() => onRemove(rule.id)}
			className='text-gray-500 hover:text-red-600 text-sm font-bold'
		>
			✕
		</button>
	</div>
);

// Recursive Group component
const ConditionGroup = ({ group, onChange, nested = false, onRemoveGroup }) => {
	const updateGroup = (patch) => onChange({ ...group, ...patch });

	const changeLogic = (val) => updateGroup({ logic: val });
	const toggleMenu = () => updateGroup({ menuOpen: !group.menuOpen });

	const addRule = () => {
		const newRule = {
			id: uuidv4(),
			field: 'Category',
			operator: 'Equals',
			value: '',
		};
		updateGroup({ rules: [...group.rules, newRule], menuOpen: false });
	};

	const addGroup = () => {
		const newGroup = { id: uuidv4(), logic: 'AND', rules: [], menuOpen: false };
		updateGroup({ rules: [...group.rules, newGroup], menuOpen: false });
	};

	const removeRule = (id) => {
		updateGroup({ rules: group.rules.filter((r) => r.id !== id) });
	};

	const removeNested = (id) => {
		updateGroup({ rules: group.rules.filter((r) => r.id !== id) });
	};

	const updateRuleField = (id, field) => {
		updateGroup({
			rules: group.rules.map((r) => (r.id === id ? { ...r, field } : r)),
		});
	};
	const updateRuleOp = (id, operator) => {
		updateGroup({
			rules: group.rules.map((r) => (r.id === id ? { ...r, operator } : r)),
		});
	};
	const updateRuleValue = (id, value) => {
		updateGroup({
			rules: group.rules.map((r) => (r.id === id ? { ...r, value } : r)),
		});
	};

	return (
		<div
			className={`rounded-lg p-3 mt-3 ${
				nested ? 'bg-light border border-gray-300' : 'bg-gray-50 border'
			}`}
		>
			<div className='flex items-center gap-2 mb-3 relative'>
				{/* AND/OR Toggle */}
				<div className='flex border rounded-full overflow-hidden w-[76px] h-[26px]'>
					{['AND', 'OR'].map((val) => (
						<button
							key={val}
							className={`w-1/2 text-xs font-bold ${
								group.logic === val
									? 'bg-primary text-light'
									: 'text-black hover:bg-gray-100'
							}`}
							onClick={() => changeLogic(val)}
						>
							{val}
						</button>
					))}
				</div>

				{/* + Menu */}
				<button
					onClick={toggleMenu}
					className='ml-1 text-xl font-bold text-gray-500 hover:text-black'
				>
					+
				</button>
				{group.menuOpen && (
					<div className='absolute top-full left-16 mt-1 bg-light border border-gray-200 shadow-md rounded-sm z-10'>
						<button
							onClick={addRule}
							className='flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100'
						>
							<RuleIcon /> Rule
						</button>
						<button
							onClick={addGroup}
							className='flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100'
						>
							<GroupIcon /> Group
						</button>
					</div>
				)}

				{/* Remove this group if nested */}
				{nested && (
					<button
						onClick={() => onRemoveGroup(group.id)}
						className='ml-auto text-xl font-bold text-gray-500 hover:text-red-600'
					>
						✕
					</button>
				)}
			</div>

			{/* Render rules or nested groups */}
			{group.rules.map((item) =>
				item.rules ? (
					<div
						key={item.id}
						className='ml-6 border-l border-dashed border-gray-400 pl-4'
					>
						<ConditionGroup
							group={item}
							onChange={(updated) =>
								updateGroup({
									rules: group.rules.map((r) =>
										r.id === item.id ? updated : r
									),
								})
							}
							nested
							onRemoveGroup={removeNested}
						/>
					</div>
				) : (
					<ConditionRow
						key={item.id}
						rule={item}
						onChangeField={updateRuleField}
						onChangeOp={updateRuleOp}
						onChangeValue={updateRuleValue}
						onRemove={removeRule}
					/>
				)
			)}
		</div>
	);
};

const buildJSON = (group) => ({
	condition: group.logic.toLowerCase(),
	rules: group.rules.map((item) => {
		if (item.rules) {
			// nested group
			return buildJSON(item);
		} else {
			return {
				label: item.field,
				field: item.field,
				operator: item.operator.toLowerCase(),
				type: isNaN(item.value) ? 'string' : 'number',
				value: isNaN(item.value) ? item.value : Number(item.value),
			};
		}
	}),
});

const AdvancedSearch = () => {
	const [rootGroup, setRootGroup] = useState({
		id: uuidv4(),
		logic: 'OR',
		rules: [
			{ id: uuidv4(), field: 'EmployeeID', operator: 'Equals', value: '1' },
			{
				id: uuidv4(),
				field: 'Title',
				operator: 'Equals',
				value: 'Sales Manager',
			},
		],
		menuOpen: false,
	});

	const handleSearch = () => {
		const payload = buildJSON(rootGroup);
		console.log('Sending payload to backend:', payload);

		fetch('/your-backend-endpoint', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
		})
			.then((res) => {
				if (!res.ok) throw new Error(res.statusText);
				return res.json();
			})
			.then((data) => console.log('Backend response:', data))
			.catch((err) => console.error('Error:', err));
	};

	return (
		<div className='p-4 bg-gray-100 rounded-lg w-full border border-gray-300 max-h-[320px] overflow-y-auto h-full'>
			<h2 className='font-semibold text-base mb-4'>Advanced Search</h2>
			<ConditionGroup
				group={rootGroup}
				onChange={setRootGroup}
			/>
			<button
				onClick={handleSearch}
				className='mt-4 px-2 py-1 bg-primary text-light rounded hover:bg-primary'
			>
				Search
			</button>
		</div>
	);
};

export default AdvancedSearch;

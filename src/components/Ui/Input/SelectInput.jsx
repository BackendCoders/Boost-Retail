/** @format */

import Select from 'react-select';

const CustomIndicatorSeparator = (props) => {
	return (
		<span
			{...props.innerProps}
			className='mx-2 h-5 w-px bg-gray-300'
		/>
	);
};

const SelectInput = ({
	options,
	placeholder = 'Select...',
	value,
	onChange,
	isMulti = false,
}) => {
	return (
		<Select
			options={options}
			isClearable
			isMulti={isMulti}
			placeholder={placeholder}
			unstyled
			components={{ IndicatorSeparator: CustomIndicatorSeparator }}
			classNames={{
				control: () =>
					'border rounded-md shadow-sm focus:border-blue-500 bg-white focus:ring-1 focus:ring-blue-500 px-4',
				option: ({ isFocused, isSelected }) =>
					`px-3 py-2 cursor-pointer 
                    ${isSelected ? 'bg-primary text-white' : ''}
                    ${isFocused ? 'bg-primary text-white' : ''}`,
				menu: () => 'bg-white border rounded-md shadow-lg mt-1',
				singleValue: () => 'text-gray-800',
				placeholder: () => 'text-gray-400',
			}}
			value={value}
			onChange={onChange}
		/>
	);
};

export default SelectInput;

/** @format */

// File: Ui/Button/PrimaryButton.jsx

const PrimaryButton = ({
	children,
	onClick,
	className = '',
	disabled = false,
}) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`px-4 py-2 rounded text-light bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all ${className}`}
		>
			{children}
		</button>
	);
};

export default PrimaryButton;

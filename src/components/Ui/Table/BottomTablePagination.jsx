/** @format */

import { useState, useRef, useEffect } from 'react';
import LeftArrow from '../../../assets/icons/line/ArrowLeftIcon';
import RightArrow from '../../../assets/icons/line/ArrowRightIcon';

const BottomTablePagination = ({ currentPage, totalPages, onPageChange }) => {
	const [showFilters, setShowFilters] = useState(false);
	const btnWrapperRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (btnWrapperRef.current && !btnWrapperRef.current.contains(e.target)) {
				setShowFilters(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div className='flex items-center justify-between bg-light px-4 py-2'>
			{/* Pagination Controls */}
			<div className='flex items-center gap-2'>
				<button
					className='bg-primary-base text-light px-3 py-1 rounded-full disabled:opacity-50 flex items-center'
					onClick={() => onPageChange('prev')}
					disabled={currentPage === 1}
				>
					<LeftArrow className='w-5 h-6' />
					<span>PREV</span>
				</button>

				<div className='border border-border-grid px-3 py-1 rounded-md text-text-body'>
					Page {currentPage}
				</div>

				<span className='text-text-placeholder'>of {totalPages}</span>

				<button
					className='bg-primary-base text-light px-3 py-1 rounded-full disabled:opacity-50 flex items-center'
					onClick={() => onPageChange('next')}
					disabled={currentPage === totalPages}
				>
					<span>NEXT</span>
					<RightArrow className='w-5 h-6' />
				</button>
			</div>
		</div>
	);
};

export default BottomTablePagination;

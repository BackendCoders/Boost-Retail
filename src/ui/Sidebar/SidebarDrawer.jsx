/** @format */

import { useEffect, useRef, useState } from 'react';

import ArrowLeftIcon from '../../assets/svgIcons/Arrow-Large-Left-Thin.svg';
import UpIcon from '../../assets/svgIcons/Up-Thin.svg';
import DownIcon from '../../assets/svgIcons/Down-Thin.svg';
import { menuData } from './menData.config';
import { Link } from 'react-router-dom';

// components/SidebarDrawer.jsx

export default function SidebarDrawer({
	activeItem,
	activeLabel,
	onClose,
	sidebarOpen,
}) {
	const drawerRef = useRef();
	const [expandedSections, setExpandedSections] = useState({});

	useEffect(() => {
		function handleClickOutside(e) {
			if (
				drawerRef.current &&
				!drawerRef.current.contains(e.target) &&
				!e.target.closest('.sidebar-icon')
			) {
				onClose();
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [onClose]);

	const toggleSection = (section) => {
		setExpandedSections((prev) => ({
			...prev,
			[section]: !prev[section],
		}));
	};

	const menuItems = activeItem ? menuData[activeItem] || [] : [];
	console.log(activeItem);

	return (
		<div
			ref={drawerRef}
			className={`fixed left-14 top-14 bottom-0 ${
				activeItem && sidebarOpen ? 'w-[16rem]' : 'w-0 overflow-hidden'
			}  bg-white shadow-lg z-40 transition-all duration-300`}
		>
			{activeItem && (
				<>
					<div className='flex items-center justify-between gap-2 p-4 border-b font-bold text-md'>
						<span>{activeLabel.toUpperCase()}</span>

						<button
							className='hover:bg-gray-100 p-2 rounded-lg'
							onClick={onClose}
						>
							<img
								src={ArrowLeftIcon}
								alt='close drawer'
							/>
						</button>
					</div>

					<ul className='p-4 space-y-2'>
						{menuItems?.map((section, index) => (
							<li
								key={index}
								className='text-gray-800 rounded cursor-pointer'
							>
								<div
									className='flex justify-between items-center px-3 py-3 font-semibold hover:bg-gray-100 rounded cursor-pointer'
									onClick={() => toggleSection(section.label)}
								>
									<span>{section.label}</span>
									{section?.children?.length > 0 && (
										<img
											src={expandedSections[section.label] ? UpIcon : DownIcon}
											alt='toggle'
											className='w-4 h-4'
										/>
									)}
								</div>
								{expandedSections[section?.label] && (
									<ul className='pt-1 space-y-1 text-sm'>
										{section?.children?.map((child, childIndex) => (
											<Link to={child?.path}>
												<li
													key={childIndex}
													className='hover:bg-gray-100 px-3 py-3 rounded cursor-pointer'
												>
													{child?.label}
												</li>
											</Link>
										))}
									</ul>
								)}
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
}

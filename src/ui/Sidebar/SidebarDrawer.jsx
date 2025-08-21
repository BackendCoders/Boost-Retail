/** @format */

import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import ArrowLeftIcon from '../../assets/icons/thin/ArrowLargeLeftThinIcon';
import UpIcon from '../../assets/icons/thin/UpThinIcon';
import DownIcon from '../../assets/icons/thin/DownThinIcon';
import { menuData } from './menData.config';

// components/SidebarDrawer.jsx

export default function SidebarDrawer({
	activeItem,
	activeLabel,
	onClose,
	sidebarOpen,
}) {
	const location = useLocation();
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

	useEffect(() => {
		if (!activeItem || !menuData[activeItem]) return;

		const currentPath = location.pathname;
		const sections = menuData[activeItem];

		for (const section of sections) {
			if (section.children) {
				for (const child of section.children) {
					if (currentPath.startsWith(child.path)) {
						setExpandedSections({ [section.label]: true });
						return; // stop once matched
					}
				}
			} else if (section.link && currentPath.startsWith(section.link)) {
				setExpandedSections({ [section.label]: true });
				return;
			}
		}
	}, [activeItem, location.pathname]);

	const toggleSection = (section) => {
		setExpandedSections((prev) => {
			const isCurrentlyExpanded = !!prev[section];

			if (isCurrentlyExpanded) {
				return { [section]: false };
			}

			return { [section]: true };
		});
	};

	const menuItems = activeItem ? menuData[activeItem] || [] : [];

	return (
		<div
			ref={drawerRef}
			className={`fixed left-[3.75rem] top-[3.75rem] bottom-0 ${
				activeItem && sidebarOpen ? 'w-[15.79rem]' : 'w-0 overflow-hidden'
			}  bg-white shadow-lg z-40 transition-all duration-300`}
		>
			{activeItem && (
				<>
					<div className='flex items-center justify-between gap-2 p-4 border-b font-bold text-md'>
						<span className='text-lg'>{activeLabel?.toUpperCase()}</span>

						<button
							className='hover:bg-gray-100 p-2 rounded-lg'
							onClick={onClose}
						>
							<ArrowLeftIcon />
						</button>
					</div>

					<ul className='p-4'>
						{menuItems?.map((section, index) => (
							<li
								key={index}
								className='text-gray-800 rounded cursor-pointer border-b border-gray-200'
							>
								<div
									className={`flex justify-between items-center px-3 py-3 ${
										location.pathname === section.link
											? 'bg-gray-200'
											: 'hover:bg-gray-100'
									} rounded cursor-pointer`}
									onClick={() => toggleSection(section.label)}
								>
									<Link to={section?.link || '#'}>
										<span className='text-md font-semibold'>
											{section.label}
										</span>
									</Link>
									{section?.children?.length > 0 &&
										(expandedSections[section.label] ? (
											<UpIcon />
										) : (
											<DownIcon />
										))}
								</div>
								{expandedSections[section?.label] && (
									<ul className='space-y-1 text-md font-normal'>
										{section?.children?.map((child, childIndex) => (
											<Link to={child?.path}>
												<li
													key={childIndex}
													className={`px-3 py-1.5 rounded cursor-pointer ${
														location.pathname === child.path
															? 'bg-gray-200'
															: 'hover:bg-gray-100'
													}`}
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

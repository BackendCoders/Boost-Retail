/** @format */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { adminMenuData } from './adminmenuData';
import { useSelector } from 'react-redux';
import UpIcon from '../../../assets/icons/thin/UpThinIcon';
import DownIcon from '../../../assets/icons/thin/DownThinIcon';

export default function SuperAdminSidebar() {
	const { sidebarOpen } = useSelector((state) => state.sidebar);
	const menuItems = adminMenuData?.AdminLogin || [];

	const [expandedSections, setExpandedSections] = useState({});
	const [expandedSubSections, setExpandedSubSections] = useState({});

	const toggleSection = (label) => {
		setExpandedSections((prev) => ({
			...prev,
			[label]: !prev[label],
		}));
	};

	const toggleSubSection = (label) => {
		setExpandedSubSections((prev) => ({
			...prev,
			[label]: !prev[label],
		}));
	};

	return (
		<div
			className={`${
				sidebarOpen ? 'w-[15.7rem] visible' : 'w-0'
			} bg-[#f9f9f9] shadow-xl h-screen overflow-y-auto transition-all duration-300 ease-in-out`}
		>
			{/* Sidebar Header */}
			{/* <div className='flex items-center justify-between p-4 border-b'>
				{sidebarOpen && (
					<h2 className='text-[17px] font-extrabold text-gray-800 uppercase tracking-wide'>
						Super Admin
					</h2>
				)}
			</div> */}

			{/* Menu Items */}
			<ul className='p-3 space-y-2'>
				{menuItems.map((section, index) => {
					const Icon = section.icon;
					const hasChildren = section.children?.length > 0;
					const isExpanded = expandedSections[section.label];

					return (
						<li key={index}>
							{/* Parent Section */}
							<div
								className='flex justify-between items-center px-3 py-2 border-b cursor-pointer'
								onClick={() => hasChildren && toggleSection(section.label)}
							>
								<span className='flex items-center gap-2 text-[18px] font-semibold text-gray-800'>
									{Icon && <Icon className='w-5 h-5 text-gray-500' />}
									{sidebarOpen && section.label}
								</span>
								{sidebarOpen && hasChildren && (
									<span>{isExpanded ? <UpIcon /> : <DownIcon />}</span>
								)}
							</div>

							{/* Sub Sections */}
							{sidebarOpen && isExpanded && (
								<ul className='ml-5 mt-2 pl-2 border-l-2 border-gray-200 space-y-2'>
									{section.children.map((sub, subIdx) => {
										const hasNested = sub.children?.length > 0;
										const subExpanded = expandedSubSections[sub.label];

										return (
											<li key={subIdx}>
												{/* Dropdown Subsection */}
												<div
													className={`flex justify-between items-center px-2 py-1 rounded cursor-pointer hover:bg-gray-100 ${
														hasNested
															? 'font-bold text-gray-900'
															: 'text-[12px] text-gray-900'
													}`}
													onClick={() =>
														hasNested ? toggleSubSection(sub.label) : null
													}
												>
													{hasNested ? (
														<>
															<span>{sub.label}</span>
															<span>
																{subExpanded ? <UpIcon /> : <DownIcon />}
															</span>
														</>
													) : (
														<Link to={sub.path}>{sub.label}</Link>
													)}
												</div>

												{/* Third-Level Children */}
												{hasNested && subExpanded && (
													<ul className='ml-3 pl-2 border-l-2 border-gray-100 space-y-1 mt-1'>
														{sub.children.map((child, childIdx) => (
															<li key={childIdx}>
																<Link
																	to={child.path}
																	className='block text-[14px] text-gray-600 hover:text-blue-600 px-2 py-1 rounded hover:bg-gray-50'
																>
																	{child.label}
																</Link>
															</li>
														))}
													</ul>
												)}
											</li>
										);
									})}
								</ul>
							)}
						</li>
					);
				})}
			</ul>
		</div>
	);
}

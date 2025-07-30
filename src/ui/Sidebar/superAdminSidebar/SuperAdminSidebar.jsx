/** @format */

import { Link } from 'react-router-dom';
import { adminMenuData } from './adminmenuData';
import { useSelector } from 'react-redux';

export default function SuperAdminSidebar() {
	const { sidebarOpen } = useSelector((state) => state.sidebar);
	const menuItems = adminMenuData?.AdminLogin || [];

	return (
		<div
			className={`${
				sidebarOpen ? 'w-[19.7rem] visible' : 'w-0 hidden'
			} bg-white shadow-xl border-r h-screen p-4 overflow-y-auto transition-all duration-300 ease-in-out`}
		>
			{/* Header */}
			<div className='flex items-center justify-between mb-6'>
				{sidebarOpen && (
					<h2 className='text-xl font-bold text-gray-800'>Super Admin</h2>
				)}
				{/* <button
					className='p-2 hover:bg-gray-100 rounded'
					onClick={toggleSidebar}
				>
					{sidebarOpen ? (
						<ArrowLeftIcon className='w-5 h-5 text-gray-600' />
					) : (
						<ArrowRightIcon className='w-5 h-5 text-gray-600' />
					)}
				</button> */}
			</div>

			{/* Menu Items */}
			<ul className='space-y-4'>
				{menuItems.map((section, index) => {
					const Icon = section.icon;

					return (
						<li key={index}>
							<Link
								to={section.link || '#'}
								className='flex items-center gap-2 text-[15px] font-semibold text-gray-900 hover:text-blue-600 hover:bg-gray-100 px-3 py-2 rounded-lg transition'
							>
								{Icon && <Icon className='w-5 h-5 text-gray-500' />}
								{sidebarOpen && section.label}
							</Link>

							{/* Subsections (only if sidebar is open) */}
							{sidebarOpen && section.children?.length > 0 && (
								<ul className='ml-3 mt-2 space-y-3 border-l border-gray-200 pl-3'>
									{section.children.map((subSection, subIndex) => (
										<li key={subIndex}>
											<div className='text-sm font-medium text-gray-700 mb-1 flex items-center gap-2'>
												{subSection.label}
											</div>

											{subSection.children?.length > 0 && (
												<ul className='space-y-1 pl-2'>
													{subSection.children.map((child, childIndex) => (
														<li key={childIndex}>
															<Link
																to={child.path}
																className='block text-[14px] text-gray-600 hover:text-blue-500 hover:bg-gray-50 px-2 py-1 rounded transition'
															>
																{child.label}
															</Link>
														</li>
													))}
												</ul>
											)}
										</li>
									))}
								</ul>
							)}
						</li>
					);
				})}
			</ul>
		</div>
	);
}

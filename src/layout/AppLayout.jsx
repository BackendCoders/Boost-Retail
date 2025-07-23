/** @format */
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu'; // Optional: Material-UI Icon

export default function AppLayout() {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className='min-h-screen flex flex-col'>
			{/* Header */}
			<header className='bg-black text-white p-4 flex items-center'>
				<button
					onClick={() => setSidebarOpen(!sidebarOpen)}
					className='mr-4 text-white'
				>
					<MenuIcon />
				</button>
				<h1 className='text-lg font-bold'>Back Office</h1>
			</header>

			{/* Main Layout */}
			<div className='flex flex-1'>
				{/* Sidebar */}
				<div
					className={`${
						sidebarOpen ? 'w-16' : 'w-0'
					} bg-blue-600 transition-all duration-300 overflow-hidden`}
				>
					<div className='flex flex-col items-center py-4 text-white space-y-6'>
						<div className='rotate-90'>📁</div>
						<div className='rotate-90'>📊</div>
						<div className='rotate-90'>⚙️</div>
					</div>
				</div>

				{/* Main Content */}
				<main className='flex-1 bg-white p-6'>
					<h2 className='text-xl font-semibold'>Home</h2>
					<p>Your content goes here.</p>
				</main>
			</div>
		</div>
	);
}

/** @format */
import { useState } from 'react';
import Header from '../ui/Header/Header';
import Sidebar from '../ui/Sidebar/Sidebar';

export default function AppLayout() {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className='min-h-screen flex flex-col'>
			{/* Header */}
			<Header
				sidebarOpen={sidebarOpen}
				setSidebarOpen={setSidebarOpen}
			/>

			{/* Main Layout */}
			<div className='flex flex-1'>
				{/* Sidebar */}
				<Sidebar sidebarOpen={sidebarOpen} />

				{/* Main Content */}
				<main className='flex-1 bg-white p-6'>
					<h2 className='text-xl font-semibold'>Home</h2>
					<p>Your content goes here.</p>
				</main>
			</div>
		</div>
	);
}

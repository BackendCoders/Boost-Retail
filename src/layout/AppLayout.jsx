/** @format */
import Header from '../ui/Header/Header';
import Sidebar from '../ui/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

export default function AppLayout() {
	return (
		<div className='min-h-screen flex flex-col font-inter'>
			{/* Header */}
			<Header />

			{/* Main Layout */}
			<div className='flex flex-1'>
				{/* Sidebar */}
				<Sidebar />

				{/* Main Content */}
				<main className='flex-1 bg-white p-4 overflow-y-auto'>
					<Outlet />
				</main>
			</div>
		</div>
	);
}

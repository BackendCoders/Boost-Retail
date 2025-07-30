/** @format */
import { useSelector } from 'react-redux';
import Header from '../ui/Header/Header';
import Sidebar from '../ui/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import SuperAdminSidebar from '../ui/Sidebar/superAdminSidebar/SuperAdminSidebar';

export default function AppLayout() {
	const { loginUser } = useSelector((state) => state.auth);

	return (
		<div className='min-h-screen flex flex-col font-inter overflow-hidden'>
			{/* Header */}
			<Header />

			{/* Main Layout */}
			<div className='flex flex-1'>
				{/* Sidebar */}
				{loginUser === 1 ? <SuperAdminSidebar /> : <Sidebar />}

				{/* Main Content */}
				<main className='flex-1 bg-white p-4 overflow-y-auto overflow-x-hidden max-w-full scrollbar-thin scrollbar-thumb-primary-base'>
					<Outlet />
				</main>
			</div>
		</div>
	);
}

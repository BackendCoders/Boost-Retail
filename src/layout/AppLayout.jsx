/** @format */
// import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Header from '../ui/Header/Header';
import Sidebar from '../ui/Sidebar/Sidebar';
// import SuperAdminSidebar from '../ui/Sidebar/superAdminSidebar/SuperAdminSidebar';

export default function AppLayout() {
	// const { loginUser } = useSelector((state) => state.auth);

	return (
		<div className='h-screen flex flex-col font-inter overflow-hidden'>
			{/* Header */}

			<div className='fixed top-0 left-0 right-0 z-10'>
				<Header />
			</div>

			{/* Main Layout */}
			<div className='flex flex-1 pt-[3.75rem] h-full'>
				{/* Sidebar */}
				{/* {loginUser === 1 ? <SuperAdminSidebar /> : <Sidebar />} */}

				<Sidebar />

				{/* Main Content */}
				<main className='flex-1 bg-white p-4 overflow-y-auto overflow-x-hidden max-w-full scrollbar-thin'>
					<Outlet /> {/* This will now be the only scrollable area */}
				</main>
			</div>
		</div>
	);
}

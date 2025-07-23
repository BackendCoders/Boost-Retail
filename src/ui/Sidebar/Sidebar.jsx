/** @format */

export default function Sidebar({ sidebarOpen }) {
	return (
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
	);
}

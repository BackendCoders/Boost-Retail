/** @format */
import MenuWhiteIcon from '../../assets/whitesvgicons/MenuWhite-Thin.svg'; // Optional: Material-UI Icon

export default function Header({ sidebarOpen, setSidebarOpen }) {
	return (
		<header className='bg-black text-white flex items-center'>
			<button
				onClick={() => setSidebarOpen(!sidebarOpen)}
				className='mr-4 text-white p-4 bg-primary-base'
			>
				<img src={MenuWhiteIcon} />
			</button>
			<h1 className='text-lg font-bold bg-'>Back Office</h1>
		</header>
	);
}

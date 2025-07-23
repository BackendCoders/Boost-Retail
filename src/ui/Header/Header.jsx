/** @format */
import MenuIcon from '../../assets/whitesvgicons/Menu-Thin.svg';
import AccountIcon from '../../assets/whitesvgicons/Account-Thin.svg';
import HomeIcon from '../../assets/whitesvgicons/Homeicon.svg';
import PosIcon from '../../assets/whitesvgicons/pos.svg';
import EcommerceIcon from '../../assets/whitesvgicons/Ecommerce-Thin.svg';
import ReportIcon from '../../assets/whitesvgicons/report.svg';
import SettingIcon from '../../assets/whitesvgicons/setting.svg';
import WarrantyIcon from '../../assets/whitesvgicons/warranty.svg';
import WorkshopIcon from '../../assets/whitesvgicons/workshop.svg';
import BackOfficeIcon from '../../assets/whitesvgicons/Back-Office-Thin.svg';
import { Link } from 'react-router-dom';
import Tooltip from '../../components/Ui/Tooltip/Tooltip';

export default function Header({ sidebarOpen, setSidebarOpen }) {
	const iconItems = [
		{ icon: HomeIcon, alt: 'Home', to: '/home' },
		{ icon: PosIcon, alt: 'POS', to: '/pos' },
		{ icon: EcommerceIcon, alt: 'E-commerce', to: '/ecommerce' },
		{ icon: WorkshopIcon, alt: 'Workshop', to: '/workshop' },
		{ icon: WarrantyIcon, alt: 'Warranty', to: '/warranty' },
		{ icon: BackOfficeIcon, alt: 'Back Office', to: '/back-office' },
		{ icon: ReportIcon, alt: 'Reports', to: '/reports' },
		{ icon: SettingIcon, alt: 'Settings', to: '/settings' },
	];
	return (
		<header className='bg-black text-white flex items-center justify-between'>
			<div className='flex items-center gap-4'>
				<button
					onClick={() => setSidebarOpen(!sidebarOpen)}
					className=' text-white p-4 bg-primary-base'
				>
					<img src={MenuIcon} />
				</button>
				<Link
					className='font-bold py-4 pr-2'
					to='/back-office/product'
				>
					<h1 className='text-md tracking-wide'>Back Office</h1>
				</Link>
				<div className='ml-4 flex items-center gap-4'>
					<img src={AccountIcon} />
					<div className='text-xs text-gray-200'>
						<p>User - India</p>
						<p>test@gamil.com</p>
					</div>
				</div>
			</div>

			<ul className='flex items-center gap-2'>
				{iconItems.map((item, index) => (
					<SidebarIconItem
						key={index}
						icon={item.icon}
						alt={item.alt}
						to={item.to}
					/>
				))}
			</ul>
		</header>
	);
}

function SidebarIconItem({ to = '#', icon, alt }) {
	return (
		<li className='hover:bg-primary-select py-4 px-4 transition-all duration-300'>
			<Tooltip content={alt}>
				<Link to={to}>
					<img
						src={icon}
						alt={alt}
					/>
				</Link>
			</Tooltip>
		</li>
	);
}

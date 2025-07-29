/** @format */
import MenuIcon from '../../assets/whitesvgicons/Menu-Thin.svg';
import AccountIcon from '../../assets/whitesvgicons/Account-Thin.svg';
import HomeIcon from '../../assets/whitesvgicons/Homeicon.svg';
import PosIcon from '../../assets/whitesvgicons/pos.svg';
import EcommerceIcon from '../../assets/whitesvgicons/Ecommerce-Thin.svg';
import CustomersIcon from '../../assets/whitesvgicons/Customers.svg';
import SIMIcon from '../../assets/whitesvgicons/SIM-Thin.svg';
import ReportIcon from '../../assets/whitesvgicons/report.svg';
import SettingIcon from '../../assets/whitesvgicons/setting.svg';
import WarrantyIcon from '../../assets/svgStanderedWhiteIcon/WarrantyStd.svg';
import WorkshopIcon from '../../assets/whitesvgicons/workshop.svg';
import BackOfficeIcon from '../../assets/svgStanderedWhiteIcon/BackOfficeStd.svg';
import ArrowLeftIcon from '../../assets/whitesvgicons/Arrow-Large-Left.svg';
import Tooltip from '../../components/Ui/Tooltip/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { closeSidebar, setActiveTopNavigation } from '../../slice/sidebarSlice';

export default function Header() {
	const dispatch = useDispatch();
	const { activeTopNavigation, sidebarOpen } = useSelector(
		(state) => state.sidebar
	);
	const iconItems = [
		{ icon: HomeIcon, alt: 'Home', label: 'Home' },
		{ icon: PosIcon, alt: 'POS', label: 'POS' },
		{ icon: EcommerceIcon, alt: 'Ecommerce', label: 'E-Commerce' },
		{ icon: WorkshopIcon, alt: 'Workshop', label: 'Workshop' },
		{ icon: WarrantyIcon, alt: 'Warranty', label: 'Warranty' },
		{ icon: BackOfficeIcon, alt: 'BackOffice', label: 'Back Office' },
		{ icon: AccountIcon, alt: 'retailAdmin', label: 'Retail Admin' },
		{ icon: CustomersIcon, alt: 'Users', label: 'Users' },
		{ icon: ReportIcon, alt: 'Reports', label: 'Reports' },
		{ icon: SettingIcon, alt: 'Settings', label: 'Settings' },
	];

	const activeLabel =
		iconItems.find((item) => item.alt === activeTopNavigation)?.label || '';

	return (
		<header className='bg-black text-white flex items-center justify-between h-[3.75rem]'>
			<div className='flex items-center gap-4 h-full'>
				<button
					onClick={() => dispatch(closeSidebar(!sidebarOpen))}
					className={`text-white flex justify-center items-center h-full w-[60px] ${
						sidebarOpen
							? 'bg-transparent border border-border-input'
							: 'bg-primary-base'
					} '`}
				>
					{!sidebarOpen ? <img src={MenuIcon} /> : <img src={ArrowLeftIcon} />}
				</button>
				<div className='font-bold min-w-[13.37rem]'>
					<h1 className='text-xl tracking-wide'>{activeLabel}</h1>
				</div>
				<div className='ml-2 flex items-center gap-4 border-l border-l-border-input h-full'>
					<img
						src={AccountIcon}
						className='ml-2'
					/>
					<div className='text-md text-text-body font-normal'>
						<p>User - India</p>
						<p>test@gmail.com</p>
					</div>
				</div>
			</div>

			<ul className='flex items-center h-full'>
				{iconItems.map((item, index) => (
					<SidebarIconItem
						key={index}
						icon={item.icon}
						alt={item.alt}
						onclick={() => dispatch(setActiveTopNavigation(item.alt))}
						active={activeTopNavigation === item.alt}
					/>
				))}
			</ul>
		</header>
	);
}

function SidebarIconItem({ icon, alt, onclick, active }) {
	return (
		<li
			className={`${
				active ? 'bg-primary-base' : 'hover:bg-primary-base'
			} flex justify-center items-center py-4 px-4 transition-all duration-300 h-full w-[3.75rem] cursor-pointer`}
			onClick={onclick}
		>
			<Tooltip
				content={alt}
				placement='bottom'
				offset={[15, 20]}
			>
				<button>
					<img
						src={icon}
						alt={alt}
					/>
				</button>
			</Tooltip>
		</li>
	);
}

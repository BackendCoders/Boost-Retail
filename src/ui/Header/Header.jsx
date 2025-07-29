/** @format */
// import { ReactComponent as MenuIcon } from '../../assets/IconThin/Menu-Thin.svg';
// import { ReactComponent as AccountIcon } from '../../assets/IconThin/Account-Thin.svg';
// import { ReactComponent as HomeIcon } from '../../assets/IconThin/Home-Thin.svg';
// import { ReactComponent as PosIcon } from '../../assets/IconThin/POS-Thin.svg';
// import { ReactComponent as EcommerceIcon } from '../../assets/IconThin/Ecommerce-Thin.svg';
// import { ReactComponent as CustomersIcon } from '../../assets/IconThin/Customers-Thin.svg';
// import { ReactComponent as ReportIcon } from '../../assets/IconThin/Reports-Thin.svg';
// import { ReactComponent as SettingIcon } from '../../assets/IconThin/Settings-Thin.svg';
// import { ReactComponent as WarrantyIcon } from '../../assets/IconStandard/Warranty-Standard.svg';
// import { ReactComponent as WorkshopIcon } from '../../assets/IconThin/Workshop-Thin.svg';
// import { ReactComponent as BackOfficeIcon } from '../../assets/IconStandard/Back-Office-Standard.svg';
// import { ReactComponent as ArrowLeftIcon } from '../../assets/IconThin/Arrow-Large-Left-Thin.svg';
import TestIcon from '../../assets/TestIcon.jsx';
import Tooltip from '../../components/Ui/Tooltip/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { closeSidebar, setActiveTopNavigation } from '../../slice/sidebarSlice';

export default function Header() {
	const dispatch = useDispatch();
	const { activeTopNavigation, sidebarOpen } = useSelector(
		(state) => state.sidebar
	);
	// const iconItems = [
	// 	{ icon: HomeIcon, alt: 'Home', label: 'Home' },
	// 	{ icon: PosIcon, alt: 'POS', label: 'POS' },
	// 	{ icon: EcommerceIcon, alt: 'Ecommerce', label: 'E-Commerce' },
	// 	{ icon: WorkshopIcon, alt: 'Workshop', label: 'Workshop' },
	// 	{ icon: WarrantyIcon, alt: 'Warranty', label: 'Warranty' },
	// 	{ icon: BackOfficeIcon, alt: 'BackOffice', label: 'Back Office' },
	// 	{ icon: AccountIcon, alt: 'retailAdmin', label: 'Retail Admin' },
	// 	{ icon: CustomersIcon, alt: 'Users', label: 'Users' },
	// 	{ icon: ReportIcon, alt: 'Reports', label: 'Reports' },
	// 	{ icon: SettingIcon, alt: 'Settings', label: 'Settings' },
	// ];

	// const activeLabel =
	// 	iconItems.find((item) => item.alt === activeTopNavigation)?.label || '';

	return (
		<header className='bg-black text-white flex items-center justify-between h-[3.75rem]'>
			<TestIcon className='text-red-500 w-8 h-8' />
			{/* <div className='flex items-center gap-4 h-full'>
				<button
					onClick={() => dispatch(closeSidebar(!sidebarOpen))}
					className={`text-white flex justify-center items-center h-full w-[60px] ${
						sidebarOpen
							? 'bg-transparent border border-border-input'
							: 'bg-primary-base'
					} '`}
				>
					{!sidebarOpen ? (
						<MenuIcon className='text-white' />
					) : (
						<ArrowLeftIcon className='text-white' />
					)}
				</button>
				<div className='font-bold min-w-[13.37rem]'>
					<h1 className='text-xl tracking-wide'>{activeLabel}</h1>
				</div>
				<div className='ml-2 flex items-center gap-4 border-l border-l-border-input h-full'>
					<AccountIcon className='ml-2 text-text-body' />
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
			</ul> */}
		</header>
	);
}

function SidebarIconItem({ icon: IconComponent, alt, onclick, active }) {
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
					<IconComponent className='text-white' />
				</button>
			</Tooltip>
		</li>
	);
}

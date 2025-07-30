/** @format */
import MenuIcon from '../../assets/icons/thin/MenuThinIcon';
import AccountIcon from '../../assets/icons/thin/AccountIcon';
import HomeIcon from '../../assets/icons/thin/HomeThinIcon';
import PosIcon from '../../assets/icons/thin/PosThinIcon';
import EcommerceIcon from '../../assets/icons/thin/EcommerceThinIcon';
import CustomersIcon from '../../assets/icons/thin/CustomersThinIcon';
import ReportIcon from '../../assets/icons/thin/ReportsThinIcon';
import SettingIcon from '../../assets/icons/thin/SettingsThinIcon';
import WarrantyIcon from '../../assets/icons/standard/WarrantyStandardIcon';
import WorkshopIcon from '../../assets/icons/thin/WorkshopThinIcon';
import BackOfficeIcon from '../../assets/icons/standard/BackOfficeStandardIcon';
import ArrowLeftIcon from '../../assets/icons/thin/ArrowLargeLeftThinIcon';
import Tooltip from '../../components/Ui/Tooltip/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { closeSidebar, setActiveTopNavigation } from '../../slice/sidebarSlice';

export default function Header() {
	const dispatch = useDispatch();
	const { activeTopNavigation, sidebarOpen } = useSelector(
		(state) => state.sidebar
	);
	const { loginUser } = useSelector((state) => state.auth);
	const iconItems = [
		{ icon: HomeIcon, key: 'Home', label: 'Home' },
		{ icon: PosIcon, key: 'POS', label: 'POS' },
		{ icon: EcommerceIcon, key: 'Ecommerce', label: 'E-Commerce' },
		{ icon: WorkshopIcon, key: 'Workshop', label: 'Workshop' },
		{ icon: WarrantyIcon, key: 'Warranty', label: 'Warranty' },
		{ icon: BackOfficeIcon, key: 'BackOffice', label: 'Back Office' },
		// { icon: AccountIcon, key: 'superAdmin', label: 'Super Admin' },
		{ icon: CustomersIcon, key: 'Users', label: 'Users' },
		{ icon: ReportIcon, key: 'Reports', label: 'Reports' },
		{ icon: SettingIcon, key: 'Settings', label: 'Settings' },
	];

	const activeLabel =
		iconItems.find((item) => item.key === activeTopNavigation)?.label || '';

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
					{!sidebarOpen ? (
						<MenuIcon className='text-white' />
					) : (
						<ArrowLeftIcon className='text-white' />
					)}
				</button>
				<div className={`font-bold ${loginUser === 1 ? "min-w-[9.37rem]" : "min-w-[13.37rem]"} `}>
					<h1 className='text-xl tracking-wide'>
						{loginUser === 1 ? 'Super Admin' : activeLabel}
					</h1>
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
				{loginUser !== 1 &&
					iconItems.map((item) => (
						<SidebarIconItem
							icon={item.icon}
							key={item.key}
							label={item.label}
							onclick={() => dispatch(setActiveTopNavigation(item.key))}
							active={activeTopNavigation === item.key}
						/>
					))}
			</ul>
		</header>
	);
}

function SidebarIconItem({ icon: Icon, label, onclick, active }) {
	return (
		<li
			className={`${
				active ? 'bg-primary-base' : 'hover:bg-primary-base'
			} flex justify-center items-center py-4 px-4 transition-all duration-300 h-full w-[3.75rem] cursor-pointer`}
			onClick={onclick}
		>
			<Tooltip
				content={label}
				placement='bottom'
				offset={[15, 20]}
			>
				<button>
					<Icon className='text-white' />
				</button>
			</Tooltip>
		</li>
	);
}

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
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useMemo } from 'react';

export default function Header() {
	const dispatch = useDispatch();
	const location = useLocation();
	const { activeTopNavigation, sidebarOpen } = useSelector(
		(state) => state.sidebar
	);
	const { loginUser } = useSelector((state) => state.auth);
	const iconItems = useMemo(
		() => [
			{ icon: HomeIcon, key: 'Home', label: 'Home', link: '/dashboard' },
			{ icon: PosIcon, key: 'POS', label: 'POS', link: '/pos/payments' },
			{
				icon: EcommerceIcon,
				key: 'Ecommerce',
				label: 'E-Commerce',
				link: '/e-commerce/processing/orders/cycle-to-work',
			},
			{
				icon: WorkshopIcon,
				key: 'Workshop',
				label: 'Workshop',
				link: '/workshop',
			},
			{
				icon: WarrantyIcon,
				key: 'Warranty',
				label: 'Warranty',
				link: '/warranty',
			},
			{
				icon: BackOfficeIcon,
				key: 'BackOffice',
				label: 'Back Office',
				link: '/back-office/customer/customer-maintenance',
			},
			// { icon: AccountIcon, key: 'superAdmin', label: 'Super Admin' },
			{
				icon: CustomersIcon,
				key: 'Users',
				label: 'Users',
				link: '/users/users',
			},
			{ icon: ReportIcon, key: 'Reports', label: 'Reports', link: '/reports' },
			{
				icon: SettingIcon,
				key: 'Settings',
				label: 'Setup',
				link: 'settings/setup/business-profile',
			},
		],
		[]
	);

	useEffect(() => {
		const path = location.pathname.split('/')[1]; // Get first segment from URL
		if (loginUser === 1) {
			dispatch(setActiveTopNavigation('superAdmin'));
		} else {
			// Try to find the item whose link starts with the same first path segment
			const matchedItem = iconItems.find((item) =>
				item.link?.startsWith(`/${path}`)
			);

			if (matchedItem) {
				dispatch(setActiveTopNavigation(matchedItem.key));
			} else {
				dispatch(setActiveTopNavigation('Home')); // fallback
			}
		}
	}, [dispatch, loginUser, location.pathname, iconItems]);

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
				<div
					className={`font-bold ${
						loginUser === 1 ? 'min-w-[9.37rem]' : 'min-w-[13.37rem]'
					} `}
				>
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
						<TopIconItem
							icon={item.icon}
							link={item.link}
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

function TopIconItem({ icon: Icon, link, label, onclick, active }) {
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
				<Link to={link}>
					<Icon className='text-white' />
				</Link>
			</Tooltip>
		</li>
	);
}

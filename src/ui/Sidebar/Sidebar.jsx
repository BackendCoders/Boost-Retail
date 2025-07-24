/** @format */

import { useDispatch, useSelector } from 'react-redux';
import CustomersIcon from '../../assets/whitesvgicons/Customers.svg';
import HomeIcon from '../../assets/whitesvgicons/Homeicon.svg';
import ProductsIcon from '../../assets/whitesvgicons/Products.svg';
import CustomiseIcon from '../../assets/whitesvgicons/Customise.svg';
import WorkshopIcon from '../../assets/whitesvgicons/workshop.svg';
import PosIcon from '../../assets/whitesvgicons/pos.svg';
import SettingIcon from '../../assets/whitesvgicons/setting.svg';
import WarrantyIcon from '../../assets/whitesvgicons/warranty.svg';
import ReportIcon from '../../assets/whitesvgicons/report.svg';
import Tooltip from '../../components/Ui/Tooltip/Tooltip';
import SidebarDrawer from './SidebarDrawer';
import { setActiveMiniMenu } from '../../slice/sidebarSlice';

export default function Sidebar() {
	const dispatch = useDispatch();
	const { activeTopNavigation, sidebarOpen, activeMiniMenu } = useSelector(
		(state) => state.sidebar
	);

	console.log(activeTopNavigation);

	const sideMenus = {
		Home: [{ icon: HomeIcon, alt: 'Home', label: 'Dashboard' }],
		POS: [{ icon: PosIcon, alt: 'Pos', label: 'POS' }],
		Ecommerce: [
			{ icon: ProductsIcon, alt: 'Processing', label: 'Processing' },
			{ icon: SettingIcon, alt: 'Marketing', label: 'Marketing' },
			{ icon: SettingIcon, alt: 'Customize', label: 'Customize' },
			{ icon: SettingIcon, alt: 'Setups', label: 'Setups' },
		],
		Workshop: [{ icon: WorkshopIcon, alt: 'Workshop', label: 'Workshop' }],
		Warranty: [{ icon: WarrantyIcon, alt: 'Warranty', label: 'Warranty' }],
		BackOffice: [
			{ icon: CustomersIcon, alt: 'Customers', label: 'Customers' },
			{ icon: ProductsIcon, alt: 'Products', label: 'Products' },
			{ icon: CustomiseIcon, alt: 'PartOrderings', label: 'Part Orderings' },
			{ icon: SettingIcon, alt: 'Settings', label: 'Settings' },
		],
		Reports: [{ icon: ReportIcon, alt: 'Reports', label: 'Reports' }],
		Settings: [{ icon: SettingIcon, alt: 'Setup', label: 'Setup' }],

		// Add more top nav sections as needed
	};

	const miniSideMenu = sideMenus[activeTopNavigation] || [];
	const activeLabel = Object.values(sideMenus)
		.flat()
		.find((menuItem) => menuItem.alt === activeMiniMenu)?.label;

	return (
		<>
			<div
				className={`${
					sidebarOpen ? 'w-[3.27rem]' : 'w-0'
				} bg-primary-base transition-all duration-300 overflow-hidden`}
			>
				<div className='flex flex-col items-center py-4 text-white space-y-2'>
					{miniSideMenu.map((item, index) => (
						<SidebarIconItem
							key={index}
							icon={item.icon}
							alt={item.alt}
							activeItem={activeMiniMenu}
							onClick={(e) => {
								e.stopPropagation();
								dispatch(
									setActiveMiniMenu(
										item.alt === activeMiniMenu ? null : item.alt
									)
								);
							}}
						/>
					))}
				</div>
			</div>
			<SidebarDrawer
				activeItem={activeMiniMenu}
				activeLabel={activeLabel}
				onClose={() => dispatch(setActiveMiniMenu(null))}
				sidebarOpen={sidebarOpen}
			/>
		</>
	);
}

function SidebarIconItem({ icon, alt, onClick, activeItem }) {
	return (
		<div
			className={`sidebar-icon ${
				activeItem === alt ? 'bg-primary-select' : 'bg-transparent'
			} hover:bg-primary-select transition-all duration-300 px-4 py-4`}
			onClick={onClick}
		>
			<Tooltip
				content={alt}
				placement='right'
				offset={[8, 10]}
			>
				<img
					src={icon}
					alt={alt}
				/>
			</Tooltip>
		</div>
	);
}

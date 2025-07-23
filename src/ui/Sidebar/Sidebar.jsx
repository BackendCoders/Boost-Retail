/** @format */

import Tooltip from '../../components/Ui/Tooltip/Tooltip';
import CustomersIcon from '../../assets/whitesvgicons/Customers.svg';
import ProductsIcon from '../../assets/whitesvgicons/Products.svg';
import CustomiseIcon from '../../assets/whitesvgicons/Customise.svg';
import SettingIcon from '../../assets/whitesvgicons/setting.svg';
import { useState } from 'react';
import SidebarDrawer from './SidebarDrawer';

export default function Sidebar({ sidebarOpen }) {
	const [activeItem, setActiveItem] = useState(null);
	const miniSideMenu = [
		{ icon: CustomersIcon, alt: 'Customers' },
		{ icon: ProductsIcon, alt: 'Products' },
		{ icon: CustomiseIcon, alt: 'Customize' },
		{ icon: SettingIcon, alt: 'Settings' },
	];
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
							activeItem={activeItem}
							onClick={(e) => {
								e.stopPropagation();
								setActiveItem(activeItem === item.alt ? null : item.alt);
							}}
							item={item}
						/>
					))}
				</div>
			</div>
			<SidebarDrawer
				activeItem={activeItem}
				onClose={() => setActiveItem(null)}
				sidebarOpen={sidebarOpen}
			/>
		</>
	);
}

function SidebarIconItem({ icon, alt, onClick, activeItem, item }) {
	return (
		<div
			className={`sidebar-icon ${
				activeItem === item.alt ? 'bg-primary-select' : 'bg-transparent'
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

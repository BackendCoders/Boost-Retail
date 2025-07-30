/** @format */

import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '../../components/Ui/Tooltip/Tooltip';
import SidebarDrawer from './SidebarDrawer';
import { setActiveItem, setActiveMiniMenu } from '../../slice/sidebarSlice';
import { sideMenus } from './sideMenu.config';

export default function Sidebar() {
	const dispatch = useDispatch();
	const { activeTopNavigation, sidebarOpen, activeMiniMenu, activeItem } =
		useSelector((state) => state.sidebar);

	const miniSideMenu = sideMenus[activeTopNavigation] || [];

	const activeLabel = Object.values(sideMenus)
		.flat()
		.find((menuItem) => menuItem.alt === activeMiniMenu)?.label;

	return (
		<>
			<div
				className={`${
					sidebarOpen ? 'w-[3.75rem]' : 'w-0'
				} bg-primary-base transition-all duration-300 overflow-hidden`}
			>
				<div className='flex flex-col items-center w-full'>
					{miniSideMenu.map((item, index) => (
						<SidebarIconItem
							key={index}
							icon={item.icon}
							alt={item.alt}
							label={item.label}
							activeItem={activeItem}
							onClick={(e) => {
								e.stopPropagation();
								dispatch(
									setActiveMiniMenu(
										item.alt === activeMiniMenu ? null : item.alt
									)
								);
								dispatch(setActiveItem(item.alt));
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

function SidebarIconItem({
	icon: IconComponent,
	alt,
	label,
	onClick,
	activeItem,
}) {
	return (
		<div
			className={`sidebar-icon ${
				activeItem === alt ? 'bg-primary-select' : 'bg-transparent'
			} hover:bg-primary-select transition-all duration-300 px-4 py-4 w-full flex justify-center items-center cursor-pointer h-[3.75rem]`}
			onClick={onClick}
		>
			<Tooltip
				content={label}
				placement='right'
				offset={[8, 10]}
			>
				<IconComponent
					alt={alt}
					className='text-white'
				/>
			</Tooltip>
		</div>
	);
}

/** @format */

import CustomersIcon from '../../assets/icons/thin/CustomersThinIcon';
import HomeIcon from '../../assets/icons/thin/HomeThinIcon';
import ProductsIcon from '../../assets/icons/thin/ProductsThinIcon';
import SIMIcon from '../../assets/icons/thin/SimThinIcon';
import CustomiseIcon from '../../assets/icons/thin/CustomiseThinIcon';
import WorkshopIcon from '../../assets/icons/thin/WorkshopThinIcon';
import PosIcon from '../../assets/icons/thin/PosThinIcon';
import MarketingIcon from '../../assets/icons/thin/MarketingThinIcon';
import SettingIcon from '../../assets/icons/thin/SettingsThinIcon';
import WarrantyIcon from '../../assets/icons/thin/WarrantyThinIcon';
import ReportIcon from '../../assets/icons/thin/ReportsThinIcon';

export const sideMenus = {
	Home: [{ icon: HomeIcon, alt: 'Home', label: 'Dashboard', path: '/' }],
	POS: [{ icon: PosIcon, alt: 'Pos', label: 'POS', path: '/pos' }],
	Ecommerce: [
		{
			icon: ProductsIcon,
			alt: 'Processing',
			label: 'Processing',
			path: '/e-commerce/processing',
		},
		{
			icon: MarketingIcon,
			alt: 'Marketing',
			label: 'Marketing',
			path: '/e-commerce/marketing',
		},
		{
			icon: CustomiseIcon,
			alt: 'Customize',
			label: 'Customize',
			path: '/e-commerce/customize',
		},
		{
			icon: SettingIcon,
			alt: 'Setups',
			label: 'Setup',
			path: '/e-commerce/setups',
		},
	],
	Workshop: [
		{
			icon: WorkshopIcon,
			alt: 'Workshop',
			label: 'Workshop',
			path: '/workshop',
		},
	],
	Warranty: [
		{
			icon: WarrantyIcon,
			alt: 'Warranty',
			label: 'Warranty',
			path: '/warranty',
		},
	],
	BackOffice: [
		{
			icon: CustomersIcon,
			alt: 'Customers',
			label: 'Customers',
			path: '/back-office/customer',
		},
		{
			icon: ProductsIcon,
			alt: 'Products',
			label: 'Products',
			path: '/back-office/products',
		},
		{
			icon: CustomiseIcon,
			alt: 'PartOrderings',
			label: 'Part Orderings',
			path: '/back-office/part-orderings',
		},
		{
			icon: SettingIcon,
			alt: 'Settings',
			label: 'Setup',
			path: '/back-office/settings',
		},
	],
	superAdmin: [
		{
			icon: HomeIcon,
			alt: 'adminHome',
			label: 'Dashboard',
			path: '/admin/dashboard',
		},
		{ icon: SIMIcon, alt: 'Sim', label: 'SIM', path: '/sim' },
		{ icon: CustomersIcon, alt: 'Users', label: 'Users', path: '/users' },
		{
			icon: SettingIcon,
			alt: 'RetailSetups',
			label: 'Setup',
			path: '/settings',
		},
	],
	Users: [
		{ icon: CustomersIcon, alt: 'Users', label: 'Users', path: '/users' },
	],
	Reports: [
		{ icon: ReportIcon, alt: 'Reports', label: 'Reports', path: '/reports' },
	],
	Settings: [
		{ icon: SettingIcon, alt: 'Setup', label: 'Setup', path: '/setup' },
	],

	// Add more top nav sections as needed
};

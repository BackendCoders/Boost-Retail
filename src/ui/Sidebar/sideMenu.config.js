/** @format */

import CustomersIcon from '../../assets/whitesvgicons/Customers.svg';
import HomeIcon from '../../assets/whitesvgicons/Homeicon.svg';
import ProductsIcon from '../../assets/whitesvgicons/Products.svg';
import SIMIcon from '../../assets/whitesvgicons/SIM-Thin.svg';
import CategorizationIcon from '../../assets/whitesvgicons/Catigorisation-Thin.svg';
import CustomiseIcon from '../../assets/whitesvgicons/Customise.svg';
import WorkshopIcon from '../../assets/whitesvgicons/workshop.svg';
import PosIcon from '../../assets/whitesvgicons/pos.svg';
import MarketingIcon from '../../assets/whitesvgicons/Marketing.svg';
import SettingIcon from '../../assets/whitesvgicons/setting.svg';
import WarrantyIcon from '../../assets/whitesvgicons/warranty.svg';
import ReportIcon from '../../assets/whitesvgicons/report.svg';

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
			label: 'Setups',
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
			label: 'Settings',
			path: '/back-office/settings',
		},
	],
	retailAdmin: [
		{ icon: HomeIcon, alt: 'Home', label: 'Dashboard', path: '/' },
		{ icon: SIMIcon, alt: 'Sim', label: 'SIM', path: '/sim' },
		{ icon: CustomersIcon, alt: 'Users', label: 'Users', path: '/users' },
		{
			icon: SettingIcon,
			alt: 'RetailSetups',
			label: 'Settings',
			path: '/settings',
		},
		// {
		// 	icon: CustomersIcon,
		// 	alt: 'SupplierFeeds',
		// 	label: 'Supplier Feeds',
		// 	path: '/sim/supplier-feeds',
		// },
		// {
		// 	icon: CategorizationIcon,
		// 	alt: 'Categorization',
		// 	label: 'Categorization',
		// 	path: '/sim/categorization',
		// },
		// {
		// 	icon: ProductsIcon,
		// 	alt: 'SimProducts',
		// 	label: 'Sim Products',
		// 	path: '/sim/sim-products',
		// },
		// {
		// 	icon: SettingIcon,
		// 	alt: 'MissingData',
		// 	label: 'Missing Data',
		// 	path: '/sim/missing-data',
		// },
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

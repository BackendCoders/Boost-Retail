/** @format */

export const menuData = {
	Products: [
		{
			label: 'Catalog Setup',
			children: [
				{
					label: 'Manage Products',
					path: '/back-office/catalog/manage-product',
				},
				{ label: 'Uncategorized' },
				{ label: 'Data Issues' },
			],
		},
		{
			label: 'Data Imports',
			children: [
				{ label: 'Product Feeds' },
				{ label: 'Stock Feeds' },
				{ label: 'EPOS Upload' },
			],
		},
		{
			label: 'Tools',
			children: [{ label: 'Print Labels' }, { label: 'Price Match' }],
		},
	],
	Customers: [
		{
			label: 'Customer Maintenance',
		},
	],
	PartOrderings: [
		{
			label: 'Ordering / Receiving',
			children: [
				{ label: 'Stock re-ordering' },
				{ label: 'Customer Ordering' },
				{ label: 'View orders' },
				{ label: 'Raise purchase order' },
				{ label: 'View purchase order' },
				{ label: 'Receive goods' },
				{ label: 'Print price labels' },
			],
		},
		{
			label: 'Customer Order Manager',
		},
	],
	Settings: [
		{
			label: 'Cycles To Work Schemes',
		},
		{
			label: 'Suppliers',
		},
		{
			label: 'Supplier Reps',
		},
		{
			label: 'Brands',
		},
		{
			label: 'Colors',
		},
		{
			label: 'Sizes',
		},
		{
			label: 'Size Guides',
		},
		{
			label: 'Voucher Codes',
		},
	],
	Pos: [
		{
			label: 'Payments',
		},
		{
			label: 'Deposit',
		},
		{
			label: 'Layaways',
		},
		{
			label: 'Returns',
		},
		{
			label: 'Sale Tags',
		},
		{
			label: 'Goods Arrived',
		},
	],
	Processing: [
		{
			label: 'Orders',
			children: [
				{ label: 'Cycle to work' },
				{ label: 'Preorders' },
				{ label: 'Paid & Ready to process' },
				{ label: 'Waiting for parts' },
				{ label: 'Processing' },
				{ label: 'Ready for collection' },
				{ label: 'Dispatched / Collected' },
				{ label: 'Completed' },
				{ label: 'Returns' },
				{ label: 'Cancelled' },
			],
		},
		{
			label: 'Failed Orders',
			children: [
				{ label: 'Awaiting payments' },
				{ label: 'Failed / Pending Finance' },
				{ label: 'Abandoned carts' },
			],
		},
		{
			label: 'Stock Requests',
			children: [
				{ label: 'Notify when in stock' },
				{ label: 'When is this coming into stock' },
			],
		},
		{
			label: 'Questions',
			children: [
				{ label: 'Awaiting reply' },
				{ label: 'Answered' },
				{ label: 'Added to FAQ' },
				{ label: 'Deleted' },
			],
		},
		{
			label: 'Reviews',
			children: [
				{ label: 'Awaiting approval' },
				{ label: 'Approved' },
				{ label: 'Deleted' },
			],
		},
	],
	Marketing: [
		{
			label: 'Adverts',
			children: [
				{ label: 'Pop ups' },
				{ label: 'Banners' },
				{ label: 'Adverts' },
			],
		},
		{ label: 'Upsell' },
		{
			label: 'Content',
			children: [{ label: 'Pages (view / add page / add landing page )' }],
		},
		{ label: 'Blog' },
		{
			label: 'Email',
			children: [
				{ label: 'Abandoned cart' },
				{ label: 'Order confirmation' },
				{ label: 'Order ready to collect' },
				{ label: 'Order Dispatched' },
			],
		},
		{
			label: 'Reports',
			children: [
				{ label: 'Sales overview' },
				{ label: 'Most viewed' },
				{ label: 'Sale products' },
				{ label: 'Orders report' },
			],
		},
	],
	Customize: [
		{ label: 'Pages' },
		{
			label: 'Website Products',
			children: [{ label: 'Allow / Disallow' }, { label: 'Product groups' }],
		},
		{ label: 'Contact Details' },
		{ label: 'Automated Responses' },
		{ label: 'On-Site Messages' },
		{ label: 'Landing Pages / forms' },
		{ label: 'Finance setup' },
		{ label: 'Postage' },
	],
	Setups: [
		{ label: 'Navigation' },
		{ label: 'Categories' },
		{
			label: 'Design Setup',
			children: [
				{ label: 'Logo' },
				{ label: 'Favicon' },
				{ label: 'Headers' },
				{ label: 'Home page template' },
				{ label: 'List page options' },
				{ label: 'Product page options' },
				{ label: 'Footer' },
				{ label: 'Custom CSS' },
			],
		},
		{
			label: 'Checkout Setup',
			children: [
				{ label: 'Promo Codes' },
				{ label: 'Cycle tp work quotes' },
				{ label: 'Insurance offer' },
				{ label: 'Upsell' },
			],
		},
		{
			label: 'Integrations',
			children: [
				{ label: 'Payment gateway' },
				{ label: 'Finance' },
				{ label: 'Security / Cloud flare' },
				{ label: 'Insurance' },
			],
		},
		{ label: '301 Redirects - Link old urls to new equivalents' },
	],
	Reports: [
		{ label: 'Product Sales Analysis' },
		{ label: 'Sales Team Analysis' },
		{
			label: 'Set Sales Targets',
			children: [
				{ label: 'Vs last year' },
				{ label: 'Last Year plus / minus XX%' },
				{ label: 'Fixed Values / month / store' },
			],
		},
		{
			label: 'Website',
			children: [{ label: 'Overview' }, { label: 'Products' }],
		},
		{ label: 'Seasonality YOY Performance' },
	],
	Setup: [
		{
			label: 'Business profile',
		},
		{
			label: 'Locations',
		},
		{
			label: 'Staff',
		},
		{
			label: 'Financial Year',
		},
		{
			label: 'Social Media Accounts',
		},
		{
			label: 'Users',
		},
	],
};

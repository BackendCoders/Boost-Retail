/** @format */

export const menuData = {
	Products: [
		{
			label: 'Catalog Setup',
			children: ['Manage Products', 'Uncategorized', 'Data Issues'],
		},
		{
			label: 'Data Imports',
			children: ['Product Feeds', 'Stock Feeds', 'EPOS Upload'],
		},
		{
			label: 'Tools',
			children: ['Print Labels', 'Price Match'],
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
				'Stock re-ordering',
				'Customer Ordering',
				'View orders',
				'Raise purchase order',
				'View purchase order',
				'Receive goods',
				'Print price labels',
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
				'Cycle to work',
				'Preorders',
				'Paid & Ready to process',
				'Waiting for parts',
				'Processing',
				'Ready for collection',
				'Dispatched / Collected',
				'Completed',
				'Returns',
				'Cancelled',
			],
		},
		{
			label: 'Failed Orders',
			children: [
				'Awaiting payments',
				'Failed / Pending Finance',
				'Abandoned carts',
			],
		},
		{
			label: 'Stock Requests',
			children: ['Notify when in stock', 'When is this coming into stock'],
		},
		{
			label: 'Questions',
			children: ['Awaiting reply', 'Answered', 'Added to FAQ', 'Deleted'],
		},
		{
			label: 'Reviews',
			children: ['Awaiting approval', 'Approved', 'Deleted'],
		},
	],
	Marketing: [
		{ label: 'Adverts', children: ['Pop ups', 'Banners', 'Adverts'] },
		{ label: 'Upsell' },
		{
			label: 'Content',
			children: ['Pages (view / add page / add landing page )'],
		},
		{ label: 'Blog' },
		{
			label: 'Email',
			children: [
				'Abandoned cart',
				'Order confirmation',
				'Order ready to collect',
				'Order Dispatched',
			],
		},
		{
			label: 'Reports',
			children: [
				'Sales overview',
				'Most viewed',
				'Sale products',
				'Orders report',
			],
		},
	],
	Customize: [
		{ label: 'Pages' },
		{
			label: 'Website Products',
			children: ['Allow / Disallow', 'Product groups'],
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
				'Logo',
				'Favicon',
				'Headers',
				'Home page template',
				'List page options',
				'Product page options',
				'Footer',
				'Custom CSS',
			],
		},
		{
			label: 'Checkout Setup',
			children: [
				'Promo Codes',
				'Cycle tp work quotes',
				'Insurance offer',
				'Upsell',
			],
		},
		{
			label: 'Integrations',
			children: [
				'Payment gateway',
				'Finance',
				'Security / Cloud flare',
				'Insurance',
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
				'Vs last year',
				'Last Year plus / minus XX%',
				'Fixed Values / month / store',
			],
		},
		{ label: 'Website', children: ['Overview', 'Products'] },
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

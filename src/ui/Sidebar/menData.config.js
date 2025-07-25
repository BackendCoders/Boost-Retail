/** @format */

export const menuData = {
	// Home
	Home: [
		{
			label: 'Dashboard',
			link: '/',
		},
	],
	// Pos
	Pos: [
		{
			label: 'Payments',
			link: '#',
		},
		{
			label: 'Deposit',
			link: '#',
		},
		{
			label: 'Layaways',
			link: '#',
		},
		{
			label: 'Returns',
			link: '#',
		},
		{
			label: 'Sale Tags',
			link: '#',
		},
		{
			label: 'Goods Arrived',
			link: '#',
		},
	],
	// Ecommerce
	Processing: [
		{
			label: 'Orders',
			link: '#',
			children: [
				{
					label: 'Cycle to work',
					path: '/e-commerce/processing/orders/cycle-to-work',
				},
				{ label: 'Preorders', path: '/e-commerce/processing/orders/preorders' },
				{
					label: 'Paid & Ready to process',
					path: '/e-commerce/processing/orders/paid-ready-process',
				},
				{
					label: 'Waiting for parts',
					path: '/e-commerce/processing/orders/waiting-for-parts',
				},
				{
					label: 'Processing',
					path: '/e-commerce/processing/orders/processing',
				},
				{
					label: 'Ready for collection',
					path: '/e-commerce/processing/orders/ready-for-collection',
				},
				{
					label: 'Dispatched / Collected',
					path: '/e-commerce/processing/orders/dispatched',
				},
				{ label: 'Completed', path: '/e-commerce/processing/orders/completed' },
				{ label: 'Returns', path: '/e-commerce/processing/orders/returns' },
				{ label: 'Cancelled', path: '/e-commerce/processing/orders/cancelled' },
			],
		},
		{
			label: 'Failed Orders',
			link: '#',
			children: [
				{
					label: 'Awaiting payments',
					path: '/e-commerce/processing/failed-orders/awaiting-payments',
				},
				{
					label: 'Failed / Pending Finance',
					path: '/e-commerce/processing/failed-orders/failed-pending-finance',
				},
				{
					label: 'Abandoned carts',
					path: '/e-commerce/processing/failed-orders/abandoned-carts',
				},
			],
		},
		{
			label: 'Stock Requests',
			link: '#',
			children: [
				{
					label: 'Notify when in stock',
					path: '/e-commerce/processing/stock-requests/notify-when-in-stock',
				},
				{
					label: 'When is this coming into stock',
					path: '/e-commerce/processing/stock-requests/coming-stock',
				},
			],
		},
		{
			label: 'Questions',
			link: '#',
			children: [
				{
					label: 'Awaiting reply',
					path: '/e-commerce/processing/questions/awaiting-reply',
				},
				{
					label: 'Answered',
					path: '/e-commerce/processing/questions/answered',
				},
				{
					label: 'Added to FAQ',
					path: '/e-commerce/processing/questions/added-to-faq',
				},
				{
					label: 'Deleted',
					path: '/e-commerce/processing/questions/deleted',
				},
			],
		},
		{
			label: 'Reviews',
			link: '#',
			children: [
				{
					label: 'Awaiting approval',
					path: '/e-commerce/processing/reviews/awaiting-approval',
				},
				{ label: 'Approved', path: '/e-commerce/processing/reviews/approved' },
				{ label: 'Deleted', path: '/e-commerce/processing/reviews/Deleted' },
			],
		},
	],
	Marketing: [
		{
			label: 'Adverts',
			link: '#',
			children: [
				{ label: 'Pop ups', path: '/e-commerce/marketing/adverts/pop-ups' },
				{ label: 'Banners', path: '/e-commerce/marketing/adverts/banners' },
				{ label: 'Adverts', path: '/e-commerce/marketing/adverts/advert' },
			],
		},
		{ label: 'Upsell', link: '/e-commerce/marketing/upsell' },
		{
			label: 'Content',
			link: '#',
			children: [
				{
					label: 'Pages (view / add page / add landing page )',
					path: '/e-commerce/marketing/content/pages-view-add-landing',
				},
			],
		},
		{ label: 'Blog', link: '/e-commerce/marketing/blog' },
		{
			label: 'Email',
			link: '#',
			children: [
				{
					label: 'Abandoned cart',
					path: '/e-commerce/marketing/email/abandoned-cart',
				},
				{
					label: 'Order confirmation',
					path: '/e-commerce/marketing/email/order-confirmation',
				},
				{
					label: 'Order ready to collect',
					path: '/e-commerce/marketing/email/order-ready-to-collect',
				},
				{
					label: 'Order Dispatched',
					path: '/e-commerce/marketing/email/order-dispatched',
				},
			],
		},
		{
			label: 'Reports',
			link: '#',
			children: [
				{
					label: 'Sales overview',
					path: '/e-commerce/marketing/reports/sales-overview',
				},
				{
					label: 'Most viewed',
					path: '/e-commerce/marketing/reports/most-viewed',
				},
				{
					label: 'Sale products',
					path: '/e-commerce/marketing/reports/sale-products',
				},
				{
					label: 'Orders report',
					path: '/e-commerce/marketing/reports/Orders-report',
				},
			],
		},
	],
	Customize: [
		{ label: 'Pages', link: '/e-commerce/customize/pages' },
		{
			label: 'Website Products',
			link: '#',
			children: [
				{
					label: 'Allow / Disallow',
					path: '/e-commerce/customize/website-products/allow-disallow',
				},
				{
					label: 'Product groups',
					path: '/e-commerce/customize/website-products/product-groups',
				},
			],
		},
		{ label: 'Contact Details', link: '/e-commerce/customize/contact-details' },
		{
			label: 'Automated Responses',
			link: '/e-commerce/customize/automated-responses',
		},
		{
			label: 'On-Site Messages',
			link: '/e-commerce/customize/on-site-messages',
		},
		{
			label: 'Landing Pages / forms',
			link: '/e-commerce/customize/landing-pages-forms',
		},
		{ label: 'Finance setup', link: '/e-commerce/customize/finance-setup' },
		{ label: 'Postage', link: '/e-commerce/customize/postage' },
	],
	Setups: [
		{ label: 'Navigation', link: '/e-commerce/setups/navigation' },
		{ label: 'Categories', link: '/e-commerce/setups/categories' },
		{
			label: 'Design Setup',
			link: '#',
			children: [
				{ label: 'Logo', path: '/e-commerce/setups/design-setup/logo' },
				{ label: 'Favicon', path: '/e-commerce/setups/design-setup/favicon' },
				{ label: 'Headers', path: '/e-commerce/setups/design-setup/headers' },
				{
					label: 'Home page template',
					path: '/e-commerce/setups/design-setup/home-page-options',
				},
				{
					label: 'List page options',
					path: '/e-commerce/setups/design-setup/list-page-options',
				},
				{
					label: 'Product page options',
					path: '/e-commerce/setups/design-setup/product-page-options',
				},
				{ label: 'Footer', path: '/e-commerce/setups/design-setup/footer' },
				{
					label: 'Custom CSS',
					path: '/e-commerce/setups/design-setup/custom-css',
				},
			],
		},
		{
			label: 'Checkout Setup',
			link: '#',
			children: [
				{
					label: 'Promo Codes',
					path: '/e-commerce/setups/checkout-setup/promo-codes',
				},
				{
					label: 'Cycle to work quotes',
					path: '/e-commerce/setups/checkout-setup/cycle-to-work-quotes',
				},
				{
					label: 'Insurance offer',
					path: '/e-commerce/setups/checkout-setup/insurance-offer',
				},
				{ label: 'Upsell', path: '/e-commerce/setups/checkout-setup/upsell' },
			],
		},
		{
			label: 'Integrations',
			link: '#',
			children: [
				{
					label: 'Payment gateway',
					path: '/e-commerce/setups/integrations/payment-gateways',
				},
				{ label: 'Finance', path: '/e-commerce/setups/integrations/finance' },
				{
					label: 'Security / Cloud flare',
					path: '/e-commerce/setups/integrations/security-cloud-flare',
				},
				{
					label: 'Insurance',
					path: '/e-commerce/setups/integrations/insurance',
				},
			],
		},
		{
			label: '301 Redirects - Link old urls to new equivalents',
			link: '/e-commerce/setups/301-redirects',
		},
	],
	// Workshop
	Workshop: [
		{
			label: 'Workshop',
			link: '#',
		},
	],
	// Warranty
	Warranty: [
		{
			label: 'Warranty',
			link: '#',
		},
	],
	// Back office
	Customers: [
		{
			label: 'Customer Maintenance',
			link: '/back-office/customer/customer-maintenance',
		},
	],
	Products: [
		{
			label: 'Catalog Setup',
			link: '#',
			children: [
				{
					label: 'Manage Products',
					path: '/back-office/products/catalog/manage-product',
				},
				{
					label: 'Uncategorized',
					path: '/back-office/products/catalog/uncategorized',
				},
				{
					label: 'Data Issues',
					path: '/back-office/products/catalog/data-issues',
				},
			],
		},
		{
			label: 'Data Imports',
			link: '#',
			children: [
				{
					label: 'Product Feeds',
					path: '/back-office/products/data-import/product-feeds',
				},
				{
					label: 'Stock Feeds',
					path: '/back-office/products/data-import/stock-feeds',
				},
				{
					label: 'EPOS Upload',
					path: '/back-office/products/data-import/epos-upload',
				},
			],
		},
		{
			label: 'Tools',
			link: '#',
			children: [
				{
					label: 'Print Labels',
					path: '/back-office/products/tools/print-labels',
				},
				{
					label: 'Price Match',
					path: '/back-office/products/tools/price-match',
				},
			],
		},
	],
	PartOrderings: [
		{
			label: 'Ordering / Receiving',
			link: '#',
			children: [
				{
					label: 'Stock re-ordering',
					path: '/back-office/part-orderings/ordering-receiving/ordering-receiving',
				},
				{
					label: 'Customer Ordering',
					path: '/back-office/part-orderings/ordering-receiving/customer-ordering',
				},
				{
					label: 'View orders',
					path: '/back-office/part-orderings/ordering-receiving/view-orders',
				},
				{
					label: 'Raise purchase order',
					path: '/back-office/part-orderings/ordering-receiving/raise-purchase-order',
				},
				{
					label: 'View purchase order',
					path: '/back-office/part-orderings/ordering-receiving/view-purchase-order',
				},
				{
					label: 'Receive goods',
					path: '/back-office/part-orderings/ordering-receiving/receive-goods',
				},
				{
					label: 'Print price labels',
					path: '/back-office/part-orderings/ordering-receiving/print-price-labels',
				},
			],
		},
		{
			label: 'Customer Order Manager',
			link: '#',
		},
	],
	Settings: [
		{
			label: 'Cycles To Work Schemes',
			link: '#',
		},
		{
			label: 'Suppliers',
			link: '#',
		},
		{
			label: 'Supplier Reps',
			link: '#',
		},
		{
			label: 'Brands',
			link: '#',
		},
		{
			label: 'Colors',
			link: '#',
		},
		{
			label: 'Sizes',
			link: '#',
		},
		{
			label: 'Size Guides',
			link: '#',
		},
		{
			label: 'Voucher Codes',
			link: '#',
		},
	],
	// Reports
	Reports: [
		{ label: 'Product Sales Analysis', link: '#' },
		{ label: 'Sales Team Analysis', link: '#' },
		{
			label: 'Set Sales Targets',
			link: '#',
			children: [
				{ label: 'Vs last year' },
				{ label: 'Last Year plus / minus XX%' },
				{ label: 'Fixed Values / month / store' },
			],
		},
		{
			label: 'Website',
			link: '#',
			children: [{ label: 'Overview' }, { label: 'Products' }],
		},
		{ label: 'Seasonality YOY Performance', link: '#' },
	],
	// Settings
	Setup: [
		{
			label: 'Business profile',
			link: '/settings/setup/business-profile',
		},
		{
			label: 'Locations',
			link: '/settings/setup/locations',
		},
		{
			label: 'Staff',
			link: '/settings/setup/staff',
		},
		{
			label: 'Financial Year',
			link: '/settings/setup/financial-year',
		},
		{
			label: 'Social Media Accounts',
			link: '/settings/setup/social-media-accounts',
		},
		{
			label: 'Users',
			link: '/settings/setup/users',
		},
	],
};

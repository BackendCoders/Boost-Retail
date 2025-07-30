/** @format */

import { Route, Routes } from 'react-router-dom';
import Product from '../pages/BackOffice/CatalogSetup/Product';
import SimProduct from '../pages/BackOffice/DataImports/SimProduct';
import AppLayout from '../layout/AppLayout';
import Dashboard from '../pages/dashboard/dashboard';
import { Dashboard as SuperAdminDashboard } from '../pages/SuperAdmin/Dashboard/Dashboard';
import MaintainCategory from '../pages/SuperAdmin/SIM/Categorization/MaintainCategory';
import MaintainLookupTables from '../pages/SuperAdmin/SIM/Categorization/MaintainLookupTables';
import MaintainSimProducts from '../pages/SuperAdmin/SIM/SimProducts/MaintainSimProducts';
import MaintainSupplierFeeds from '../pages/SuperAdmin/SIM/SupplierFeeds/Maintainsupplierfeeds';

/** Auth page */
import LoginPage from '../pages/Auth/Login';

export default function AppRoutes() {
	return (
		<Routes>
			<Route
				path='/'
				index
				element={<LoginPage />}
			/>
			<Route element={<AppLayout />}>
				{/** Dashboard */}
				<Route
					path='/dashboard'
					element={<Dashboard />}
				/>

				<Route
					path='/admin/dashboard'
					element={<SuperAdminDashboard />}
				/>

				{/* Pos */}

				{/* E-commerce Starts */}
				{/* Processing - Orders */}
				<Route
					path='/e-commerce/processing/orders/cycle-to-work'
					element={<div>Cycle To work</div>}
				/>
				<Route
					path='/e-commerce/processing/orders/preorders'
					element={<div>Preorders</div>}
				/>
				<Route
					path='/e-commerce/processing/orders/paid-ready-process'
					element={<div>Paid Ready Process</div>}
				/>
				<Route
					path='/e-commerce/processing/orders/waiting-for-parts'
					element={<div>Waiting For Parts</div>}
				/>
				<Route
					path='/e-commerce/processing/orders/processing'
					element={<div>Processing</div>}
				/>
				<Route
					path='/e-commerce/processing/orders/ready-for-collection'
					element={<div>Ready For Collection</div>}
				/>
				<Route
					path='/e-commerce/processing/orders/dispatched'
					element={<div>Dispatched / Collected</div>}
				/>
				<Route
					path='/e-commerce/processing/orders/completed'
					element={<div>Completed</div>}
				/>
				<Route
					path='/e-commerce/processing/orders/returns'
					element={<div>Returns</div>}
				/>
				<Route
					path='/e-commerce/processing/orders/cancelled'
					element={<div>Cancelled</div>}
				/>

				{/* Processing - Failed Orders */}
				<Route
					path='/e-commerce/processing/failed-orders/awaiting-payments'
					element={<div>Awaiting Payments</div>}
				/>
				<Route
					path='/e-commerce/processing/failed-orders/failed-pending-finance'
					element={<div>Failed / Pending Finance</div>}
				/>
				<Route
					path='/e-commerce/processing/failed-orders/abandoned-carts'
					element={<div>Abandoned Carts</div>}
				/>
				{/* Processing - Stock Requests */}
				<Route
					path='/e-commerce/processing/stock-requests/notify-when-in-stock'
					element={<div>Notify when In Stock</div>}
				/>
				<Route
					path='/e-commerce/processing/stock-requests/coming-stock'
					element={<div>When Is This Coming Into Stock</div>}
				/>
				{/* Processing - Questions */}
				<Route
					path='/e-commerce/processing/questions/awaiting-reply'
					element={<div>Awaiting Reply</div>}
				/>
				<Route
					path='/e-commerce/processing/questions/answered'
					element={<div>Answered</div>}
				/>
				<Route
					path='/e-commerce/processing/questions/added-to-faq'
					element={<div>Added To Faq</div>}
				/>
				<Route
					path='/e-commerce/processing/questions/deleted'
					element={<div>Deleted</div>}
				/>
				{/* Processing - Reviews */}
				<Route
					path='/e-commerce/processing/reviews/awaiting-approval'
					element={<div>Awaiting Approval</div>}
				/>
				<Route
					path='/e-commerce/processing/reviews/approved'
					element={<div>Approved</div>}
				/>
				<Route
					path='/e-commerce/processing/reviews/Deleted'
					element={<div>Deleted</div>}
				/>

				{/* Marketing - Adverts */}
				<Route
					path='/e-commerce/marketing/adverts/pop-ups'
					element={<div>Pop ups</div>}
				/>
				<Route
					path='/e-commerce/marketing/adverts/banners'
					element={<div>Banners</div>}
				/>
				<Route
					path='/e-commerce/marketing/adverts/advert'
					element={<div>Advert</div>}
				/>
				{/* Marketing - Upsell */}
				<Route
					path='/e-commerce/marketing/upsell'
					element={<div>Upsell</div>}
				/>
				{/* Marketing - Content */}
				<Route
					path='/e-commerce/marketing/content/pages-view-add-landing'
					element={<div>Pages ( view / add page / add landing page )</div>}
				/>
				{/* Marketing - Blog */}
				<Route
					path='/e-commerce/marketing/blog'
					element={<div>Blog</div>}
				/>
				{/* Marketing - Email */}
				<Route
					path='/e-commerce/marketing/email/abandoned-cart'
					element={<div>Abandoned Cart</div>}
				/>
				<Route
					path='/e-commerce/marketing/email/order-confirmation'
					element={<div>Order Confirmation</div>}
				/>
				<Route
					path='/e-commerce/marketing/email/order-ready-to-collect'
					element={<div>Order Ready To Collect</div>}
				/>
				<Route
					path='/e-commerce/marketing/email/order-dispatched'
					element={<div>Order Dispatched</div>}
				/>
				{/* Marketing - Reports */}
				<Route
					path='/e-commerce/marketing/reports/sales-overview'
					element={<div>Sales Overview</div>}
				/>
				<Route
					path='/e-commerce/marketing/reports/most-viewed'
					element={<div>Most Viewed</div>}
				/>
				<Route
					path='/e-commerce/marketing/reports/sale-products'
					element={<div>Sale Products</div>}
				/>
				<Route
					path='/e-commerce/marketing/reports/Orders-report'
					element={<div>Orders Report</div>}
				/>

				{/* Customize - Pages */}
				<Route
					path='/e-commerce/customize/pages'
					element={<div>Pages</div>}
				/>
				{/* Customize - Website Products */}
				<Route
					path='/e-commerce/customize/website-products/allow-disallow'
					element={<div>Allow / Disallow</div>}
				/>
				<Route
					path='/e-commerce/customize/website-products/product-groups'
					element={<div>Product Groups</div>}
				/>
				{/* Customize - Contact Details */}
				<Route
					path='/e-commerce/customize/contact-details'
					element={<div>Contact Details</div>}
				/>
				{/* Customize - Automated Responses */}
				<Route
					path='/e-commerce/customize/automated-responses'
					element={<div>Automated Responses</div>}
				/>
				{/* Customize - On-site Messages */}
				<Route
					path='/e-commerce/customize/on-site-messages'
					element={<div>On-site Messages</div>}
				/>
				{/* Customize - Landing Pages */}
				<Route
					path='/e-commerce/customize/landing-pages-forms'
					element={<div>Landing Pages / Forms</div>}
				/>
				{/* Customize - Finance setup */}
				<Route
					path='/e-commerce/customize/finance-setup'
					element={<div>Finance Setup</div>}
				/>
				{/* Customize - Postage */}
				<Route
					path='/e-commerce/customize/postage'
					element={<div>Postage</div>}
				/>
				{/* Setups - Navigation */}
				<Route
					path='/e-commerce/setups/navigation'
					element={<div>Navigation</div>}
				/>
				{/* Setups - Categories */}
				<Route
					path='/e-commerce/setups/categories'
					element={<div>Categories</div>}
				/>
				{/* Setups - Design Setup */}
				<Route
					path='/e-commerce/setups/design-setup/logo'
					element={<div>Logo</div>}
				/>
				<Route
					path='/e-commerce/setups/design-setup/favicon'
					element={<div>Favicon</div>}
				/>
				<Route
					path='/e-commerce/setups/design-setup/headers'
					element={<div>Headers</div>}
				/>
				<Route
					path='/e-commerce/setups/design-setup/home-page-options'
					element={<div>Home Page Options</div>}
				/>
				<Route
					path='/e-commerce/setups/design-setup/list-page-options'
					element={<div>List Page Options</div>}
				/>
				<Route
					path='/e-commerce/setups/design-setup/product-page-options'
					element={<div>Product Page Options</div>}
				/>
				<Route
					path='/e-commerce/setups/design-setup/footer'
					element={<div>Footer</div>}
				/>
				<Route
					path='/e-commerce/setups/design-setup/custom-css'
					element={<div>Custom CSS</div>}
				/>
				{/* Setups - Checkout Setup */}
				<Route
					path='/e-commerce/setups/checkout-setup/promo-codes'
					element={<div>Promo Codes</div>}
				/>
				<Route
					path='/e-commerce/setups/checkout-setup/cycle-to-work-quotes'
					element={<div>Cycle To Work Quotes</div>}
				/>
				<Route
					path='/e-commerce/setups/checkout-setup/insurance-offer'
					element={<div>Insurance Offer</div>}
				/>
				<Route
					path='/e-commerce/setups/checkout-setup/upsell'
					element={<div>Upsell</div>}
				/>
				{/* Setups - Integrations */}
				<Route
					path='/e-commerce/setups/integrations/payment-gateways'
					element={<div>Payment Gateways</div>}
				/>
				<Route
					path='/e-commerce/setups/integrations/finance'
					element={<div>Finance</div>}
				/>
				<Route
					path='/e-commerce/setups/integrations/security-cloud-flare'
					element={<div>Security / Cloud Flare</div>}
				/>
				<Route
					path='/e-commerce/setups/integrations/insurance'
					element={<div>Insurance</div>}
				/>
				{/* Setups - 301 Redirects */}
				<Route
					path='/e-commerce/setups/301-redirects'
					element={<div>301 Redirects</div>}
				/>

				{/* Ecommerce Ends */}

				{/* Workshop Starts */}
				{/* Workshop Ends */}

				{/* Warranty Starts */}
				{/* Warranty Ends */}

				{/* BackOffice Starts */}

				{/* Customers */}
				<Route
					path='/back-office/customer/customer-maintenance'
					element={<div>Customer Maintenance Page</div>}
				/>
				{/* Product - Catalog SetUp */}
				<Route
					path='/back-office/products/catalog/manage-product'
					element={<Product />}
				/>
				<Route
					path='/back-office/products/catalog/uncategorized'
					element={<div>Uncategorized</div>}
				/>
				<Route
					path='/back-office/products/catalog/data-issues'
					element={<div>Data Issues</div>}
				/>
				{/* Product - Data Imports */}
				<Route
					path='/back-office/products/data-import/sim-products'
					element={<SimProduct />}
				/>
				<Route
					path='/back-office/products/data-import/stock-feeds'
					element={<div>Stock Feeds</div>}
				/>
				<Route
					path='/back-office/products/data-import/epos-upload'
					element={<div>Epos Upload</div>}
				/>
				{/* Product - Tools */}
				<Route
					path='/back-office/products/tools/print-labels'
					element={<div>Print Labels</div>}
				/>
				<Route
					path='/back-office/products/tools/price-match'
					element={<div>Price Match</div>}
				/>

				{/* Part Orderings - Ordering / Receiving */}
				<Route
					path='/back-office/part-orderings/ordering-receiving/ordering-receiving'
					element={<div>Stock Re-ordering</div>}
				/>
				<Route
					path='/back-office/part-orderings/ordering-receiving/customer-ordering'
					element={<div>Customer Ordering</div>}
				/>
				<Route
					path='/back-office/part-orderings/ordering-receiving/view-orders'
					element={<div>View Orders</div>}
				/>
				<Route
					path='/back-office/part-orderings/ordering-receiving/raise-purchase-order'
					element={<div>Raise Purchase Order</div>}
				/>
				<Route
					path='/back-office/part-orderings/ordering-receiving/view-purchase-order'
					element={<div>View Purchase Order</div>}
				/>
				<Route
					path='/back-office/part-orderings/ordering-receiving/receive-goods'
					element={<div>Receive Goods</div>}
				/>
				<Route
					path='/back-office/part-orderings/ordering-receiving/print-price-labels'
					element={<div>Print Price Label</div>}
				/>
				{/* Part Ordering - Customer Order Manager*/}
				<Route
					path='/back-office/part-orderings/customer-order-manager'
					element={<div>Customer Order Manager</div>}
				/>
				{/* Settings - Cycle To Work Schemes*/}
				<Route
					path='/back-office/settings/cycle-to-work-schemes'
					element={<div>Cycle To Work Schemes</div>}
				/>
				{/* Settings - Suppliers*/}
				<Route
					path='/back-office/settings/suppliers'
					element={<div>Suppliers</div>}
				/>
				{/* Settings - Supplier Reps*/}
				<Route
					path='/back-office/settings/supplier-reps'
					element={<div>Supplier Reps</div>}
				/>
				{/* Settings - Brands*/}
				<Route
					path='/back-office/settings/brands'
					element={<div>Brands</div>}
				/>
				{/* Settings - Colors*/}
				<Route
					path='/back-office/settings/colors'
					element={<div>Colors</div>}
				/>
				{/* Settings - Sizes*/}
				<Route
					path='/back-office/settings/sizes'
					element={<div>Sizes</div>}
				/>
				{/* Settings - Size Guides*/}
				<Route
					path='/back-office/settings/size-guides'
					element={<div>Size Guides</div>}
				/>
				{/* Settings - Voucher Codes*/}
				<Route
					path='/back-office/settings/voucher-codes'
					element={<div>Voucher Codes</div>}
				/>

				{/* BackOffice Ends */}

				{/* Sim Starts */}
				{/* Supplier Feeds - Maintain Supplier Feeds */}
				<Route
					path='/admin/sim/supplier-feeds/maintain'
					element={<MaintainSupplierFeeds />}
				/>
				{/* Categorization - Maintain Categories */}
				<Route
					path='/admin/sim/categorization/maintain-categories'
					element={<MaintainCategory />}
				/>
				{/* Categorization - Maintain Lookup Tables */}
				<Route
					path='/admin/sim/categorization/maintain-lookup-tables'
					element={<MaintainLookupTables />}
				/>
				{/* SimProducts - Maintain Sim Products */}
				<Route
					path='/admin/sim/products/maintain'
					element={<MaintainSimProducts />}
				/>
				{/* MissingData - Missing Categories */}
				<Route
					path='/admin/sim/missing-data/missing-categories'
					element={<div>Missing Categories</div>}
				/>
				{/* MissingData - Missing Categories Visual Mode */}
				<Route
					path='/admin/sim/missing-data/missing-categories-visual-mode'
					element={<div>Missing Categories Visual Mode</div>}
				/>
				{/* MissingData - Conflicting Categories */}
				<Route
					path='/admin/sim/missing-data/conflicting-categories'
					element={<div>Conflicting Categories</div>}
				/>
				{/* MissingData - Missing Product Data */}
				<Route
					path='/admin/sim/missing-data/missing-product-data'
					element={<div>Missing Product Data</div>}
				/>
				{/* MissingData - Missing Images */}
				<Route
					path='/admin/sim/missing-data/missing-images'
					element={<div>Missing Images</div>}
				/>
				{/* Sim Ends */}

				{/* Users Starts */}
				{/* Users - Users */}
				<Route
					path='/users/users'
					element={<div>Users</div>}
				/>

				{/* Users - Ends */}
				{/* Admin - Start */}
				<Route
					path='/admin/settings'
					element={<div>Settings</div>}
				/>

				{/* Admin - Ends */}

				{/* Reports Starts */}
				{/* Reports Ends */}

				{/* Settings Starts */}
				{/* Setup - Business Profile */}
				<Route
					path='/settings/setup/business-profile'
					element={<div>Business Profile</div>}
				/>
				{/* Setup - Locations */}
				<Route
					path='/settings/setup/locations'
					element={<div>Locations</div>}
				/>
				{/* Setup - Staff */}
				<Route
					path='/settings/setup/staff'
					element={<div>Staff</div>}
				/>
				{/* Setup - Financial Year */}
				<Route
					path='/settings/setup/financial-year'
					element={<div>Financial Year</div>}
				/>
				{/* Setup - Social Media Accounts */}
				<Route
					path='/settings/setup/social-media-accounts'
					element={<div>Social Media Accounts</div>}
				/>
				{/* Setup - Users */}
				<Route
					path='/settings/setup/users'
					element={<div>Users</div>}
				/>

				{/* Settings Ends */}
			</Route>
		</Routes>
	);
}

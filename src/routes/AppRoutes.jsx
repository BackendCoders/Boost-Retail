/** @format */

import { Route, Routes } from 'react-router-dom';
import Product from '../pages/BackOffice/Product';
import AppLayout from '../layout/AppLayout';
import Dashboard from '../pages/dashboard/dashboard';

export default function AppRoutes() {
	return (
		<Routes>
			<Route element={<AppLayout />}>
				<Route
					path='/'
					index
					element={<Dashboard />}
				/>
				<Route
					path='/back-office/catalog/manage-product'
					element={<Product />}
				/>
			</Route>
		</Routes>
	);
}

/** @format */

import { Route, Routes } from 'react-router-dom';
import Product from '../pages/BackOffice/Product';
import AppLayout from '../layout/AppLayout';

export default function AppRoutes() {
	return (
		<Routes>
			<Route element={<AppLayout />}>
				<Route
					path='/'
					index
					element={<Product />}
				/>
				<Route
					path='/back-office/product'
					element={<Product />}
				/>
			</Route>
		</Routes>
	);
}

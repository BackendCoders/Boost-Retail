/** @format */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App.jsx';
import { store } from './store.js';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App />
				<Toaster
					position='top-right'
					toastOptions={{
						success: {
							style: {
								background: '#22c55e', // green-500
								color: '#fff',
							},
							iconTheme: {
								primary: '#ffffff',
								secondary: '#16a34a', // green-600
							},
						},
						error: {
							style: {
								background: '#ef4444', // red-500
								color: '#fff',
							},
							iconTheme: {
								primary: '#ffffff',
								secondary: '#dc2626', // red-600
							},
						},
						style: {
							padding: '12px 16px',
							borderRadius: '8px',
							fontSize: '14px',
						},
					}}
				/>
			</Provider>
		</BrowserRouter>
	</StrictMode>
);

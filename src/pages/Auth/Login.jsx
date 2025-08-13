/** @format */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoginUser } from '../../slice/authSlice';

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		// username: '',
		// password: '',
		role: 1,
	});
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setError('');
		setSuccess('');
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const role = Number(formData.role);

		// Simple login logic
		if (role === 1 || role === 2) {
			localStorage.setItem('user', role);
			dispatch(setLoginUser(role));
			setSuccess(`Welcome ${role === 1 ? 'Super Admin' : 'Retail Admin'}!`);
			setTimeout(() => {
				navigate(`${role === 1 ? '/admin/dashboard' : '/dashboard'} `);
			}, 1000); // Optional: short delay to show success message
		} else {
			setError('Invalid credentials. Try again.');
		}
	};

	return (
		<div className='min-h-screen bg-light flex items-center justify-center px-4'>
			<div className='w-full max-w-md border border-gray-200 rounded-xl shadow-md p-6'>
				<h2 className='text-2xl font-bold mb-4 text-center'>Login</h2>
				<form
					onSubmit={handleSubmit}
					className='space-y-4'
				>
					{/* <div>
            <label className="block mb-1 font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div> */}
					<div>
						<label className='block mb-1 font-medium text-gray-700'>Role</label>
						<select
							name='role'
							value={formData.role}
							onChange={handleChange}
							className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
						>
							<option value={1}>Super Admin</option>
							<option value={2}>Retail Admin</option>
						</select>
					</div>
					{error && <p className='text-red-500 text-sm'>{error}</p>}
					{success && <p className='text-green-500 text-sm'>{success}</p>}
					<button
						type='submit'
						className='w-full bg-blue-500 hover:bg-blue-600 text-light font-semibold py-2 rounded-md transition'
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;

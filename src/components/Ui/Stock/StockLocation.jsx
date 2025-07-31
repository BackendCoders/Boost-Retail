/** @format */

import React from 'react';

const tableHeaders = ['LOC', 'QTY', 'MIN', 'MAX', 'BO', 'SOLD', 'LA'];
const tableData = [
	{ LOC: '01', QTY: 0, MIN: 0, MAX: 0, BO: 0, SOLD: 0, LA: 0 },
	{ LOC: '02', QTY: 0, MIN: 0, MAX: 0, BO: 0, SOLD: 0, LA: 0 },
	{ LOC: '03', QTY: 0, MIN: 0, MAX: 0, BO: 0, SOLD: 0, LA: 0 },
	{ LOC: '04', QTY: 0, MIN: 0, MAX: 0, BO: 0, SOLD: 0, LA: 0 },
	{ LOC: '05', QTY: 0, MIN: 0, MAX: 0, BO: 0, SOLD: 0, LA: 0 },
	{ LOC: '06', QTY: 0, MIN: 0, MAX: 0, BO: 0, SOLD: 0, LA: 0 },
];

const calculateTotals = () => {
	const totals = { QTY: 0, MIN: 0, MAX: 0, BO: 0, SOLD: 0, LA: 0 };
	tableData.forEach((row) => {
		Object.keys(totals).forEach((key) => {
			totals[key] += row[key];
		});
	});
	return totals;
};

const StockLocation = () => {
	const totals = calculateTotals();

	return (
		<div className='p-5 bg-gray-100 rounded-lg w-full  border border-gray-300'>
			<h2 className='font-semibold text-base mb-3'>Stock Location</h2>
			<div className='overflow-x-auto'>
				<table className='w-full border-collapse text-sm'>
					<thead>
						<tr className='bg-primary text-light'>
							{tableHeaders.map((header) => (
								<th
									key={header}
									className='px-2 py-1 border border-light font-medium'
								>
									{header}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{tableData.map((row, idx) => (
							<tr
								key={idx}
								className='text-center bg-light'
							>
								{tableHeaders.map((header) => (
									<td
										key={header}
										className='border px-2 py-1'
									>
										{row[header] ?? row[header.toUpperCase()]}
									</td>
								))}
							</tr>
						))}
						<tr className='bg-light font-bold'>
							<td className='border px-2 py-1 text-left'>Total</td>
							{['QTY', 'MIN', 'MAX', 'BO', 'SOLD', 'LA'].map((key) => (
								<td
									key={key}
									className='border px-2 py-1 text-center'
								>
									{totals[key]}
								</td>
							))}
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default StockLocation;

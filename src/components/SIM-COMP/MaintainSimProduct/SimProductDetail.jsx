/** @format */

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DetailTab from './SimProductDetailTabs/DetailTab';
import DescriptionTab from './SimProductDetailTabs/DescriptionTab';
import SpecificationTab from './SimProductDetailTabs/SpecificationTab';
import GeometryTab from './SimProductDetailTabs/GeometryTab';

const tabs = [
	{ id: 'details', label: 'Details' },
	{ id: 'description', label: 'Description' },
	{ id: 'specifications', label: 'Specifications' },
	{ id: 'geometry', label: 'Geometry' },
];

export default function SimProductDetail() {
	const { simProducts } = useSelector((state) => state.simProduct);
	const { productId } = useParams();
	const [activeTab, setActiveTab] = useState('details');
	const product = simProducts.find((p) => p.id === Number(productId));
	console.log({ productId, product });
	return (
		<div className='space-y-4'>
			{/* Header Section */}
			<div className=''>
				<div className='flex justify-between items-center py-3 border-b border-b-gray-60'>
					<h1 className='text-xl font-bold'>SIM PRODUCTS</h1>
				</div>
				<div className='flex justify-between items-center py-3 border-b border-b-gray-60'>
					<p className='text-sm mt-1'>
						Maintain Sim Products {'>'} {product?.year}{' '}
						{product?.brand?.at(0)?.toUpperCase() +
							product?.brand?.slice(1).toLowerCase()}{' '}
						{product?.title}{' '}
					</p>
					<div className='flex items-center gap-4 text-sm font-semibold'>
						<span className=''>
							Total Products: 15
							{/* {fakeCategories.length} */}
						</span>
					</div>
				</div>
			</div>

			{/* Product Details Tab Section */}
			<div className='flex flex-col gap-2'>
				<div className='font-semibold'>Search</div>
				<div className='flex gap-2'>
					{tabs.map((tab) => (
						<button
							key={tab.id}
							className={`px-4 py-2 border rounded-full ${
								activeTab === tab.id
									? 'border-primary bg-primary text-white'
									: 'border-text-body text-text-body'
							}`}
							onClick={() => setActiveTab(tab.id)}
						>
							{tab.label}
						</button>
					))}
				</div>
			</div>

			<div>
				{activeTab === 'details' && <DetailTab />}
				{activeTab === 'description' && <DescriptionTab />}
				{activeTab === 'specifications' && <SpecificationTab />}
				{activeTab === 'geometry' && <GeometryTab />}
			</div>
		</div>
	);
}

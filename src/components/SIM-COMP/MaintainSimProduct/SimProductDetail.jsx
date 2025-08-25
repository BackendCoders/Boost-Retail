/** @format */

import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function SimProductDetail() {
	const { simProducts } = useSelector((state) => state.simProduct);
	const { productId } = useParams();
	const product = simProducts.find((p) => p.id === Number(productId));
	console.log({ productId, product });
	return (
		<div className='space-y-4'>
			{/* Header Section */}
			<div className=''>
				<div className='flex justify-between items-center py-3 border-b border-b-border-grid'>
					<h1 className='text-xl font-bold'>SIM PRODUCTS</h1>
				</div>
				<div className='flex justify-between items-center py-3 border-b border-b-border-grid'>
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
		</div>
	);
}

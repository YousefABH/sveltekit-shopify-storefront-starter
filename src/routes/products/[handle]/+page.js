import { error } from '@sveltejs/kit';
import { fetchProduct } from '../../../lib/api/shopify';
import { createProductTemplate } from '../../../lib/utils/product';

export async function load({ params }) {
	const response = await fetchProduct({
		handle: params.handle,
		imgCount: 10
	});
	const product = response?.product;
	if (product) {
		const productTemplate = createProductTemplate(product);

		return {
			product: productTemplate
		};
	} else {
		throw error(404, 'Product not found');
	}
}

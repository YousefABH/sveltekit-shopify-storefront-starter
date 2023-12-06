import { error } from '@sveltejs/kit';
import { fetchAllProducts } from '../lib/api/shopify';
import { createProductCards } from '../lib/utils/product';

export async function load({ url }) {
	try {
		const response = await fetchAllProducts({
			imgCount: 1,
			first: 3
		});

		const products = response?.products?.edges;

		if (!products) {
			throw error(404);
		}

		const productCards = createProductCards(products)

		return {
			latestProducts: productCards
		};
	} catch(err) {
		throw error(500, 'Error retrieving data');
	}
}

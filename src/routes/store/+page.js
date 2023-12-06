import { error } from '@sveltejs/kit';
import { fetchAllProducts } from '../../lib/api/shopify';
import { createProductCards } from '../../lib/utils/product';

export async function load({ url }) {
	const query = url.searchParams.get('q');
	const endCursorParam = url.searchParams.get('end_cursor');
	const startCursorParam = url.searchParams.get('start_cursor');
	let first = 10;
	let last = 10;
	if (endCursorParam || (!endCursorParam && !startCursorParam)) {
		last = null;
	} else {
		first = null;
	}

	try {
		const response = await fetchAllProducts({
			imgCount: 1,
			first: first,
			last: last,
			query: query,
			after: endCursorParam,
			before: startCursorParam
		});

		const products = response?.products?.edges;
		const pageInfo = response?.products?.pageInfo;

		if (!products) {
			throw error(404);
		}

		const productCards = createProductCards(products);

		return {
			products: productCards,
			pageInfo
		};
	} catch {
		throw error(500, 'Error retrieving data');
	}
}

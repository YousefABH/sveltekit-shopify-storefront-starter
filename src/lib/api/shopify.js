import { GraphQLClient } from 'graphql-request';
import {
	CREATE_CART,
	FETCH_ALL_PRODUCTS,
	GET_CART,
	CREATE_CHECKOUT,
	ADD_LINE_ITEM,
	REMOVE_LINE_ITEM,
	FETCH_ALL_COLLECTIONS,
	UPDATE_LINE_ITEM,
	FETCH_PRODUCT
} from './queries';

const shopifyClient = new GraphQLClient(
	` https://${import.meta.env.VITE_STORE_NAME}.myshopify.com/api/2021-07/graphql.json`,
	{
		headers: {
			'Content-Type': 'application/json',
			'X-Shopify-Storefront-Access-Token': import.meta.env.VITE_SHOPIFY_STOREFRONT_API_TOKEN
		}
	}
);

export async function shopifyRequest(query, variables) {
	try {
		const response = await shopifyClient.request(query, variables);
		return response;
	} catch (error) {
		throw error;
	}
}

export async function fetchAllProducts(variables) {
	return await shopifyRequest(FETCH_ALL_PRODUCTS, variables);
}

export async function fetchProduct(variables) {
	return await shopifyRequest(FETCH_PRODUCT, variables);
}

export async function fetchAllCollections() {
	return await shopifyRequest(FETCH_ALL_COLLECTIONS);
}

export async function getCart(variables) {
	return await shopifyRequest(GET_CART, variables);
}

export async function createCart() {
	return await shopifyRequest(CREATE_CART);
}

export async function createCheckout(variables) {
	return await shopifyRequest(CREATE_CHECKOUT, variables);
}

export async function addLineItem(variables) {
	return await shopifyRequest(ADD_LINE_ITEM, variables);
}

export async function updateLineItem(variables) {
	return await shopifyRequest(UPDATE_LINE_ITEM, variables);
}

export async function removeLineItem(variables) {
	return await shopifyRequest(REMOVE_LINE_ITEM, variables);
}

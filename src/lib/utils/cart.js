import { checkAttributesExist } from '$lib/utils/misc';
import { findVariantId } from '$lib/utils/product';
import { addLineItem, createCheckout } from '../api/shopify';

export async function addToCart(quantity, cartId, variants, selectedOptions, optionNames) {
	if (!checkAttributesExist(selectedOptions, optionNames)) {
		throw new Error('Please select a value for each option');
	} else {
		let variantId = findVariantId(variants, selectedOptions);

		try {
			const response = await addLineItem({
				cartId,
				lines: [
					{
						merchandiseId: variantId,
						quantity
					}
				]
			});
			if (response) {
				return response.cartLinesAdd?.cart?.lines.edges;
			}
		} catch {
			throw new Error('Error adding item to cart');
		}
	}
}

export async function checkoutItem(quantity, cartId, variants, selectedOptions, optionNames) {
	if (!checkAttributesExist(selectedOptions, optionNames)) {
		throw new Error('Please select a value for each option');
	} else {
		let variantId = findVariantId(variants, selectedOptions);
		try {
			const response = await createCheckout({
				input: {
					lineItems: [
						{
							quantity,
							variantId
						}
					]
				}
			});
			if (response) {
				return response?.checkoutCreate?.checkout?.webUrl;
			}
		} catch {
			throw new Error('Error creating checkout');
		}
	}
}

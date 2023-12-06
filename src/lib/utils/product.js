export function createProductCards(products) {
	const productCards = products.map((product) => {
		return {
			handle: product?.node?.handle,
			title: product?.node?.title,
			thumbnail: {
				src: product?.node?.images?.edges[0]?.node?.originalSrc,
				alt: product?.node?.images?.edges[0]?.node?.altText
			},
			price: product?.node?.variants?.edges[0]?.node?.price,
			variants: product?.node?.variants?.edges?.map((item) => item.node),
			options: product.node?.options
		};
	});
	return productCards;
}

export function createProductTemplate(product) {
	return {
		title: product?.title,
		description: product?.description,
		images: product?.images?.edges?.map((image) => {
			return {
				src: image?.node?.originalSrc,
				alt: image?.node?.altText
			};
		}),
		price: product?.variants?.edges[0]?.node?.price,
		variants: product?.variants?.edges?.map((item) => item.node),
		options: product.options
	};
}

export function findVariantId(variants, selectedOptions) {
	let variantId = null;

	variants.forEach((variant) => {
		let result = variant?.selectedOptions?.every((option) => {
			return selectedOptions[option?.name] === option?.value;
		});

		if (result) {
			variantId = variant?.id;
		}
	});

	return variantId;
}

export function formatPrice(amount, currencyCode) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: currencyCode
	}).format(amount);
}

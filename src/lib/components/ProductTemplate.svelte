<script>
	import ImageCarousel from './ImageCarousel.svelte';
	import ProductOptions from './ProductOptions.svelte';
	import { addToCart, checkoutItem } from '$lib/utils/cart';
	import { cartIdStore, cartItemsStore } from '$lib/stores';
	import AsyncButton from './AsyncButton.svelte';
	import { goto } from '$app/navigation';
	import { formatPrice } from '../utils/format';
	export let title;
	export let price;
	export let description;
	export let images;
	export let options;
	export let variants;

	let optionNames = options?.map((option) => option.name);

	let quantity = 1;

	let errorMessage = '';

	let selectedOptions;

	async function addToCartHandler() {
		errorMessage = '';
		try {
			const cartItems = await addToCart(
				quantity,
				$cartIdStore,
				variants,
				selectedOptions,
				optionNames
			);
			cartItemsStore.set(cartItems);
		} catch (error) {
			errorMessage = error.message;
		}
	}

	async function buyNowHandler() {
		try {
			const checkoutUrl = await checkoutItem(
				quantity,
				$cartIdStore,
				variants,
				selectedOptions,
				optionNames
			);
			goto(checkoutUrl);
		} catch (error) {
			errorMessage = error.message;
		}
	}
</script>

<svelte:head>
	<title>{title}</title>
	{#if description}
		<meta name="description" content={description} />
	{/if}
</svelte:head>

<div class="product-template-parent-container">
	<div class="images">
		<ImageCarousel {images} />
	</div>
	<div class="product-info">
		<h2>{title}</h2>
		<p class="price">
			{formatPrice(price.amount, price.currencyCode)}
		</p>
		<ProductOptions {options} bind:selectedOptions />
		{#if description}
			<p>
				{description}
			</p>
		{/if}

		<AsyncButton
			--height="60px"
			--font-size="1.4rem"
			--width="100%"
			handler={addToCartHandler}
			label="Add to cart"
		/>
		<AsyncButton
			--height="60px"
			--font-size="1.4rem"
			--width="100%"
			handler={buyNowHandler}
			label="Buy now"
		/>
		{#if errorMessage != ''}
			<p class="error">{errorMessage}</p>
		{/if}
	</div>
</div>

<style lang="scss">
	.product-template-parent-container {
		display: flex;
		justify-content: space-around;
		margin-top: 3rem;
		flex-wrap: wrap;
	}
	.price {
		color: var(--accent-color);
		font-size: 1.3rem;
		margin: 0.5rem 0;
	}
	.product-info {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
	}
	.error {
		color: red;
	}
	p {
		width: 100%;
		margin: 2rem 0;
		max-width: 500px;
		overflow-wrap: break-word;
		max-height: 200px;
		overflow-y: auto;
	}
	.images {
		margin: 1rem;
	}
	h2 {
		font-weight: normal;
	}
</style>

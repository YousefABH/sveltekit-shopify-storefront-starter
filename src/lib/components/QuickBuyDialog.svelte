<script>
	import AsyncButton from './AsyncButton.svelte';
	import ProductOptions from './ProductOptions.svelte';
	import { addToCart, checkoutItem } from '$lib/utils/cart';
	import { cartIdStore, cartItemsStore } from '$lib/stores';
	import { scale } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import Counter from './Counter.svelte';

	export let options = [];
	export let title = '';
	export let variants = [];
	export let showDialog = false;

	let quantity = 1;
	let dialogElement;
	let selectedOptions = {};
	let errorMessage;

	$: cartId = $cartIdStore;

	let optionNames = options?.map((option) => option.name);

	async function addToCartHandler() {
		try {
			const cartItems = await addToCart(quantity, cartId, variants, selectedOptions, optionNames);
			cartItemsStore.set(cartItems);
			showDialog = false;
		} catch (error) {
			errorMessage = error.message;
		}
	}

	async function buyNowHandler() {
		try {
			const checkoutUrl = await checkoutItem(
				quantity,
				cartId,
				variants,
				selectedOptions,
				optionNames
			);
			showDialog = false;
			goto(checkoutUrl);
		} catch (error) {
			errorMessage = error.message;
		}
	}

	function handleClick(e) {
		if (showDialog) {
			const bounds = dialogElement?.getBoundingClientRect();
			if (
				e.clientX < bounds.left ||
				e.clientX > bounds.right ||
				e.clientY > bounds.bottom ||
				e.clientY < bounds.top
			) {
				showDialog = false;
			}
		}
	}
</script>

<svelte:window on:click|capture={handleClick} />

<div class="backdrop" />
<div
	transition:scale={{ duration: 200 }}
	bind:this={dialogElement}
	class="quick-buy-dialog-parent-container"
>
	<h2>{title}</h2>
	<ProductOptions {options} bind:selectedOptions />
	<Counter bind:quantity />
	<div class="purchase">
		<AsyncButton label="Add to cart" handler={addToCartHandler} />
		<AsyncButton label="Buy now" handler={buyNowHandler} />
	</div>
	{#if errorMessage}
		<p class="error">{errorMessage}</p>
	{/if}
</div>

<style lang="scss">
	h2 {
		font-weight: normal;
	}

	.error {
		color: red;
	}

	.purchase {
		align-self: flex-end;
		justify-content: flex-end;
	}
	.quick-buy-dialog-parent-container {
		z-index: 3;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		padding: 1rem 3rem;
		width: clamp(250px, 70vw, 500px);
		background-color: var(--primary-color);
		border: var(--primary-border);
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		h2 {
			font-size: 1.3rem;
		}
	}
	.backdrop {
		z-index: 2;
	}

	@media (max-width: 300px) {
		.quick-buy-dialog-parent-container {
			padding: 1rem;
		}
	}
</style>

<script>
	import Cart from '../lib/components/Cart.svelte';
	import Header from '../lib/components/layout/Header.svelte';
	import '../lib/styles/global.scss';
	import Footer from '../lib/components/layout/Footer.svelte';
	import { onMount } from 'svelte';
	import { siteAuthor, siteDescription, siteName } from '../lib/config';
	import { createCart, getCart } from '../lib/api/shopify';
	import { browser } from '$app/environment';
	import { navigating } from '$app/stores';
	import { cartIdStore, cartItemsStore } from '$lib/stores';
	import PageLoader from '../lib/components/ui-helpers/PageLoader.svelte';
	import { fly } from 'svelte/transition';

	let cartId;
	let cartUrl;

	export let data;

	onMount(async () => {
		if (browser) {
			cartId = localStorage.getItem('cart_id');
			cartIdStore.set(cartId);
		}
		if (!cartId) {
			const response = await createCart();
			cartId = response.cartCreate.cart.id;
			if (browser) {
				localStorage.setItem('cart_id', cartId);
				cartIdStore.set(cartId);
			}

			cartUrl = response.cartCreate.cart.checkoutUrl;
		} else {
			const response = await getCart({ cartId: cartId });
			if (response.cart) {
				cartId = response.cart.id;
				cartUrl = response.cart.checkoutUrl;
				cartItemsStore.set(response.cart.lines.edges);
			} else {
				const response = await createCart();
				cartId = response.cartCreate.cart.id;
				if (browser) {
					localStorage.setItem('cart_id', cartId);
					cartIdStore.set(cartId);
				}
			}
		}
	});
</script>

<svelte:head>
	<title>{siteName}</title>
	<meta name="description" content={siteDescription} />
	<meta name="author" content={siteAuthor} />
</svelte:head>

<Header />

<Cart {cartUrl} cartItems={$cartItemsStore} />

{#if $navigating}
	<PageLoader />
{/if}

{#key data.pathname}
	<main in:fly={{ duration: 300, y: -30 }}>
		<slot />
	</main>
{/key}

<Footer />

<style lang="scss">
	main {
		min-height: 80vh;
	}
</style>

<script>
	import { formatPrice } from '$lib/utils/format';
	import QuickBuyDialog from './QuickBuyDialog.svelte';

	export let title;
	export let price;
	export let handle;
	export let thumbnail;
	export let options;
	export let variants;

	let showDialog = false;
</script>

<div class="card-parent-container">
	<a href="/products/{handle}">
		<div class="image-container flex-center">
			{#if thumbnail.src}
				<img src={thumbnail?.src} alt={thumbnail?.alt} />
			{:else}
				<img src="/images/placeholder-big.png" alt="Product thumbnail placeholder" />
			{/if}
		</div>
	</a>
	<div class="price-buy-container flex-center">
		<p class="price">
			{formatPrice(price.amount, price.currencyCode)}
		</p>
		<button
			class="cl-btn df-btn flex-center"
			on:click={() => {
				showDialog = true;
			}}><span>+</span></button
		>
	</div>
	<a href="/products/{handle}">
		<h2 class="title">{title}</h2>
	</a>
</div>

{#if showDialog}
	<QuickBuyDialog {options} {variants} {title} bind:showDialog />
{/if}

<style lang="scss">
	$background-color_1: rgba(0, 0, 0, 0.4);

	a {
		display: block;
	}
	.card-parent-container {
		margin: 2rem 1rem;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	.price-buy-container {
		justify-content: space-between;
		width: 100%;
		margin-top: 2rem;
	}
	.price {
		color: var(--accent-color);
		margin: 0;
	}
	.image-container {
		width: 280px;
		height: fit-content;
		max-height: 250px;
		overflow: hidden;
		background-color: var(--primary-color);
		justify-content: center;
		border: var(--primary-border);
	}
	img {
		max-height: 250px;
	}
	h2 {
		margin: 0;
		font-size: 1rem;
		font-weight: normal;
	}
	button {
		font-weight: bold;
		font-size: 1.7rem;
		padding: 0.1rem 0.6rem;
		justify-content: center;
		text-align: center;
	}
</style>

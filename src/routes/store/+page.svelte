<script>
	import ProductList from '../../lib/components/ProductList.svelte';
	import Pagination from '../../lib/components/Pagination.svelte';
	export let data;

	import { invalidateAll, afterNavigate } from '$app/navigation';

	afterNavigate(() => {
		invalidateAll();
	});

	$: products = data.products;
	$: pageInfo = data.pageInfo;
</script>

<svelte:head>
	<title>Store</title>
</svelte:head>

{#if products}
	{#if products.length != 0}
	<div>
		<ProductList {products} />
		<Pagination {...pageInfo} />
	</div>
	{:else}
		<div class="center">
			<p>No products found</p>
		</div>
	{/if}
{/if}

<style lang="scss">
	p {
		width: 100vw;
		color: rgba(0, 0, 0, 0.5);
		margin: 0;
		text-align: center;
		font-size: clamp(2rem, 3vw, 3rem);
	}

	div {
		width: fit-content;
	}
</style>

<script>
	import ProductList from '../lib/components/ProductList.svelte'
	import { siteName } from '../lib/config';

	export let data;

	$: latestProducts = data.latestProducts
</script>

<svelte:head>
	<title>{siteName}</title>
</svelte:head>

<h1>Latest Products</h1>
<div class="latest-products flex-center">
	<ProductList products={latestProducts}/>
</div>

<style lang="scss">
	* {
		box-sizing: border-box;
	}
	h1 {
		font-weight: normal;
		text-align: center;
		margin: 3rem;
		box-sizing: border-box;
	}

	.latest-products {
		flex-wrap: wrap;
		justify-content: center;
		margin: 4rem 0;
		margin-top: 0;
	}
</style>

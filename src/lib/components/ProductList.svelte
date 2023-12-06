<script>
	import ProductCard from './ProductCard.svelte';

	export let products;
</script>

<ul class="flex-center cl-ul">
	{#each products as product}
		<li>
			<ProductCard {...product} />
		</li>
	{/each}
</ul>

<style lang="scss">
	ul {
		flex-wrap: wrap;
		width: 100vw;
		justify-content: center;
	}
</style>

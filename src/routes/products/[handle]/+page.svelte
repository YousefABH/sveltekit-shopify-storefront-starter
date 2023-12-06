<script>
	import ProductTemplate from '../../../lib/components/ProductTemplate.svelte';
	export let data;

	$: product = data.product;
</script>


<ProductTemplate {...product} />

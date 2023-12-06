<script>
	import SearchBar from '../SearchBar.svelte';
	import { closeCartDialog } from '$lib/stores';
	import CartIcon from '../svg/CartIcon.svelte';
</script>

<nav class="flex-center">
	<a href="/store">Store</a>
	<SearchBar />
	<button
		on:click={() => {
			closeCartDialog.set(false);
		}}
		class="cl-btn"><CartIcon /></button
	>
</nav>

<style lang="scss">
	nav {
		flex-grow: var(--grow);
		justify-content: space-between;
	}
	a {
		&:hover {
			text-decoration: underline;
		}
	}
</style>

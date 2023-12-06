<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let hasNextPage;
	export let hasPreviousPage;
	export let startCursor;
	export let endCursor;

	function goToPrevPage() {
		const searchParams = $page.url.searchParams;
		searchParams.set('start_cursor', startCursor);
		searchParams.delete('end_cursor');
		goto(`${$page.url.pathname}?${searchParams}`);
	}

	function goToNextPage() {
		const searchParams = $page.url.searchParams;
		searchParams.set('end_cursor', endCursor);
		searchParams.delete('start_cursor');
		goto(`${$page.url.pathname}?${searchParams}`);
	}
</script>

<div class="pagination-parent-container flex-center">
	{#if hasPreviousPage}
		<button class="cl-btn prev-btn" on:click={goToPrevPage}
			><img src="/icons/arrow.svg" alt="Arrow icon" /></button
		>
	{/if}
	{#if hasNextPage}
		<button class="cl-btn next-btn" on:click={goToNextPage}
			><img src="/icons/arrow.svg" alt="Arrow icon" /></button
		>
	{/if}
</div>

<style lang="scss">
	.pagination-parent-container {
		margin: 2rem;
		justify-content: center;
	}
	button {
		margin: 1rem;
		img {
			width: 25px;
		}
		&.prev-btn {
			img {
				transform: rotate(180deg);
			}
		}
	}
</style>

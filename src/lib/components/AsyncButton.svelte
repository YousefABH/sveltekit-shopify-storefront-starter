<script>
	import LoadSpinner from './ui-helpers/LoadSpinner.svelte';
	export let label = '';
	export let handler;

	let loading = false;

	async function handleClick() {
		loading = true;
		await handler();
		loading = false;
	}
</script>

<button on:click={handleClick} class="cl-btn df-btn">
	{#if loading}
		<LoadSpinner --width="15px" />
	{:else}
		{label}
	{/if}</button
>

<style>
	button {
		font-weight: normal;
		font-size: var(--font-size);
		height: var(--height);
		width: var(--width);
		margin: 1rem 0;
		padding: 0.4rem;
		min-width: 120px;
	}
</style>

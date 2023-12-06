<script>
	import { closeCartDialog } from '$lib/stores';
	import LineItem from './LineItem.svelte';
	import CloseIcon from './svg/CloseIcon.svelte';

	let element;

	export let cartUrl;
	export let cartItems = [];

	let display = 'none';
	let right = '-100%';

	function handleClick(e) {
		if (e.clientX < element?.getBoundingClientRect()?.left) {
			right = '-100%';
			display = 'none';
			closeCartDialog.set(true);
		}
	}

	$: if ($closeCartDialog) {
		right = '-100%';
		display = 'none';
	} else {
		right = '0';
		display = 'block';
	}
</script>

<svelte:window on:click|capture={handleClick} />

<div style:--display={display} style:--right={right} class="backdrop" />
<div style:--right={right} class="cart-parent-container" bind:this={element}>
	<button
		class="close-button cl-btn"
		on:click={() => {
			closeCartDialog.set(true);
		}}><CloseIcon /></button
	>
	{#if cartItems.length === 0}
		<p class="center">Cart is empty</p>
	{:else}
		<h1 class="flex-center">Cart <span class="item-count">{cartItems.length}</span></h1>
		<ul class="cl-ul">
			{#each cartItems as item (item.node.id)}
				<li>
					<LineItem {item} />
				</li>
			{/each}
		</ul>
		<div class="checkout flex-center">
			<a class="df-btn" href={cartUrl}>Proceed to checkout</a>
		</div>
	{/if}
</div>

<style lang="scss">
	.close-button {
		position: absolute;
		top: 3%;
		right: 3%;
		transform: scale(1.4);
	}

	h1 {
		span {
			margin: 0.5rem;
		}
	}

	.item-count {
		color: var(--primary-color);
		background-color: var(--secondary-color);
		font-size: 1rem;
		border-radius: 200rem;
		padding: 0.1rem 0.5rem;
		display: inline-block;
	}
	$background-color_3: rgba(0, 0, 0, 0.2);

	h1 {
		margin: 0;
		font-weight: normal;
	}
	.checkout {
		height: 100px;
		justify-content: center;
		margin: 1rem;
		a {
			padding: 0.5rem 1rem;
		}
	}
	.cart-parent-container {
		ul {
			height: 70%;
			overflow-y: auto;
		}
		box-sizing: border-box;
		padding: 1rem;
		height: 100vh;
		width: 400px;
		position: fixed;
		top: 0;
		transition: all 0.2s;
		right: var(--right);
		z-index: 3;
		box-shadow: -5px 0 5px rgba(0, 0, 0, 0.2);
		border-left: var(--primary-border);
		background-color: var(--primary-color);

		@media (max-width: 440px) {
			width: 100vw;
		}
	}

	.backdrop {
		display: var(--display);
		z-index: 2;
	}
</style>

<script>
	export let item;
	import CloseIcon from './svg/CloseIcon.svelte';
	import { removeLineItem, updateLineItem } from '../api/shopify';
	import { cartItemsStore, cartIdStore } from '$lib/stores';
	import AddIcon from './svg/AddIcon.svelte';
	import SubtractIcon from './svg/SubtractIcon.svelte';
	import { formatPrice } from '../utils/format';

	async function incrementQuantity(item) {
		const response = await updateLineItem({
			cartId: $cartIdStore,
			lines: [
				{
					id: item?.node?.id,
					merchandiseId: item?.node?.merchandise?.id,
					quantity: item?.node?.quantity + 1
				}
			]
		});
		cartItemsStore.set(response?.cartLinesUpdate?.cart?.lines?.edges);
	}

	async function decrementQuantity(item) {
		const response = await updateLineItem({
			cartId: $cartIdStore,
			lines: [
				{
					id: item?.node?.id,
					merchandiseId: item?.node?.merchandise?.id,
					quantity: item?.node?.quantity - 1
				}
			]
		});
		cartItemsStore.set(response?.cartLinesUpdate?.cart?.lines?.edges);
	}

	async function removeCartItem(itemToRemove, i) {
		await removeLineItem({
			cartId: $cartIdStore,
			lineIds: [i]
		});

		cartItemsStore.set($cartItemsStore.filter((item) => item !== itemToRemove));
	}
</script>

<div class="line-item-parent-container flex-center">
	<button
		class="delete cl-btn"
		on:click={() => {
			removeCartItem(item, item?.node?.id);
		}}><CloseIcon /></button
	>
	{#if item?.node?.merchandise?.product?.images?.edges[0]?.node}
	<div class="img-container">
		<img
			src={item?.node?.merchandise?.product?.images?.edges[0]?.node?.originalSrc}
			alt={item?.node?.merchandise?.product?.images?.edges[0]?.node?.altText}
		/>
	</div>
	{:else}
		<img src="/images/placeholder-big.png" alt="Placeholder" />
	{/if}

	<div>
		<p class="title">{item?.node?.merchandise?.product?.title}</p>
		<p class="variant">{item?.node?.merchandise?.title}</p>
		<div class="price-q-counter-container flex-center">
			<div class="counter flex-center">
				<button
					class="cl-btn"
					on:click={() => {
						decrementQuantity(item);
					}}><SubtractIcon /></button
				><span>{item.node.quantity}</span><button
					class="cl-btn"
					on:click={() => {
						incrementQuantity(item);
					}}><AddIcon /></button
				>
			</div>
			<span class="price">
				{formatPrice(
					item?.node?.cost?.totalAmount?.amount,
					item?.node?.cost?.totalAmount?.currencyCode
				)}
			</span>
		</div>
	</div>
</div>

<style lang="scss">
	$color_3: rgba(0, 0, 0, 0.7);
	$background-color_2: rgba(0, 0, 0, 0.07);

	.price {
		color: var(--accent-color);
	}
	.title {
		margin-bottom: 0.5rem;
	}
	.variant {
		font-size: 0.9rem;
		margin-bottom: 1rem;
		color: $color_3;
	}
	.counter {
		span {
			margin: 0 1rem;
		}
		button {
			font-size: 1.1rem;
			padding: 0;
			background-color: $background-color_2;
			width: 25px;
			height: 25px;
			border-radius: 5px;
		}
	}
	.price-q-counter-container {
		justify-content: space-between;
	}
	.line-item-parent-container {
		position: relative;
		align-items: flex-start;
		padding: 2rem 1rem;
		border-bottom: var(--primary-border);
		.delete {
			position: absolute;
			top: 2%;
			right: 0%;
			img {
				width: 15px;
				border: none;
			}
		}
		p {
			margin-top: 0;
		}
		div {
			flex-grow: 2;
		}

		.img-container {
			height: 100px;
			max-width: 90px;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: 1rem;
			border: var(--primary-border);

			img {
				max-height: 80px;
				max-width: 90px;
			}
		}


	}
</style>

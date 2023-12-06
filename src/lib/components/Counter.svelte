<script>
	import SubtractIcon from './svg/SubtractIcon.svelte';
	import AddIcon from './svg/AddIcon.svelte';

	export let quantity = 1;

	function increment() {
		quantity += 1;
	}

	function decrement() {
		if (quantity > 1) {
			quantity -= 1;
		}
	}
</script>

<div class="counter flex-center">
	<button class="cl-btn" on:click={decrement}><SubtractIcon /></button><span>{quantity}</span
	><button on:click={increment} class="cl-btn"><AddIcon /></button>
</div>

<style>
	.counter {
		margin: 2rem 0;
		gap: 10px;
	}

span {
    width: 20px;
    text-align: center;
}

	button {
		background-color: rgb(209, 209, 209);
		width: 30px;
		height: 30px;
		border-radius: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>

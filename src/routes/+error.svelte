<script>
	import { page } from '$app/stores';
</script>

<div class="center">
	<h1>{$page.status}</h1>
	<p>{$page.error.message}</p>
</div>

<style lang="scss">
	div {
		color: rgba(0, 0, 0, 0.5);
		margin: 0;
		text-align: center;
		font-size: clamp(2rem, 3vw, 3rem);
	}
</style>

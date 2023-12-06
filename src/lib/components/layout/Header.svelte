<script>
	import HeaderNav from './HeaderNav.svelte';
	import Logo from '../svg/Logo.svelte';
</script>

<div class="parent-container">
	<header class="flex-center">
		<div>
			<a href="/">
				<Logo />
			</a>
		</div>
		<HeaderNav --grow="2" />
	</header>
</div>

<style lang="scss">
	$background-color_1: rgba(255, 255, 255, 0.6);

	.parent-container {
		position: sticky;
		z-index: 1;
		top: 15px;
		width: 100vw;
		max-width: 800px;
		margin: 1rem auto;
	}

	header {
		padding: 0.5rem 1.3rem;
		background-color: $background-color_1;
		backdrop-filter: blur(2px);
		border-radius: 200rem;
		margin: 1rem;
		border: var(--primary-border);
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	div {
		flex-grow: 1;
	}

	a {
		margin-right: 1rem;
		text-decoration: none;
		color: inherit;
	}
</style>

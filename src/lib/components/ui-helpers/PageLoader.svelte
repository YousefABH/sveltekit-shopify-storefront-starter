<div class="parent">
	<ul class="cl-ul center flex-center">
		{#each Array.from({ length: 3 - 1 + 1 }, (_, index) => 1 + index) as item, index}
			<li />
		{/each}
	</ul>
</div>

<style lang="scss">
	.parent {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		z-index: 9999;
		background-color: rgba(255, 255, 255, 0.5);
		left: 0;
	}

	@keyframes slide_in_left {
		from {
			opacity: 0;
			transform: translateX(-2rem);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}
	li {
		@for $i from 1 through 8 {
			opacity: 0;
			width: 20px;
			height: 20px;
			background-color: var(--secondary-color);
			animation: slide_in_left 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) forwards infinite;
			&:nth-of-type(#{$i}) {
				animation-delay: 0.15s + $i * 0.05s;
			}
		}
	}
</style>

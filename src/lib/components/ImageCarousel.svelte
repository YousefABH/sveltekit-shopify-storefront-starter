<script>
	export let images = [];

	let itemWidth;
	let slide = 0;

	let innerWidth;

	function slideRight() {
		if (slide !== 0) {
			slide += itemWidth;
		}
	}

	function slideLeft() {
		if (Math.abs(slide) !== (images.length - 1) * itemWidth) {
			slide -= itemWidth;
		}
	}

	$: {
		if (innerWidth) {
			slide = 0;
		}
	}
</script>

<svelte:window bind:innerWidth />

<div class="img-carousel-parent-container flex-center">
	<button class="left cl-btn" on:click={slideRight}>
		<img src="/icons/arrow.svg" alt="Arrow" />
	</button>
	<div class="carousel" style:--slide={slide + 'px'}>
		<div class="slider">
			{#each images as image}
				<div class="image-container" bind:clientWidth={itemWidth}>
					<img src={image.src} alt={image.alt} />
				</div>
			{/each}
		</div>
	</div>
	<button class="right cl-btn" on:click={slideLeft}>
		<img src="/icons/arrow.svg" alt="Arrow" />
	</button>
</div>

<style lang="scss">
	.img-carousel-parent-container {
		display: flex;
		justify-content: center;
		width: fit-content;
		position: relative;
		margin: 0 auto;
	}

	.carousel {
		display: flex;
		overflow: hidden;
		width: clamp(300px, 80vw, 600px);
		max-height: 600px;
		min-width: 250px;
		margin: 0 auto;
	}

	img {
		max-height: 600px;
	}

	.slider {
		display: flex;
		transition: transform 0.2s;
		transform: translateX(var(--slide));
		z-index: 0;
	}

	button {
		margin: 0.5rem;
		position: absolute;
		z-index: 0;
		img {
			width: clamp(30px, 3vw, 50px);
			min-width: 0;
		}
	}

	.image-container {
		width: clamp(300px, 80vw, 600px);
		max-height: 600px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.left {
		left: 0;
		z-index: 1;
		transform: rotate(180deg);
	}

	.right {
		right: 0;
		z-index: 1;
	}
</style>

<div class="spinner" />

<style lang="scss">
	.spinner {
		width: var(--width);
		height: var(--width);
		border: 4px solid rgba(0, 0, 0, 0.1);
		border-top: 4px solid #000000;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin: 0 auto;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>

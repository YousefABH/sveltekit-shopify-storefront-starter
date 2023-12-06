<script>
	export let options = [];
	export let selectedOptions = {};
</script>

<ul class="cl-ul">
	{#each options as option}
		<li>
			<p>{option.name.toUpperCase()}</p>
			<ul class="cl-ul flex-center">
				{#each option.values as value}
					<li aria-current={value === selectedOptions[option.name]}>
						<button
							class="cl-btn df-btn"
							on:click={() => {
								selectedOptions = { ...selectedOptions, [option.name]: value };
							}}>{value}</button
						>
					</li>
				{/each}
			</ul>
		</li>
	{/each}
</ul>

<style lang="scss">
	ul {
		flex-wrap: wrap;
	}
	li {
		ul {
			li {
				button {
					font-weight: normal;
					font-size: 1rem;
					margin: 0.5rem 0;
					padding: 0.4rem;
					border-radius: 0.4rem;
				}
				margin-right: 0.8rem;
			}
			li[aria-current='true'] {
				button {
					background-color: var(--secondary-color);
					color: var(--primary-color);
				}
			}
		}
	}
</style>

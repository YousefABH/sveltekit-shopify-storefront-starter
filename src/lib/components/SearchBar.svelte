<script>
	import { goto, afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import SearchIcon from './svg/SearchIcon.svelte';
	let query;

	afterNavigate(() => {
		if (!$page.url.searchParams.get('q')) {
			query = '';
		}
	});

	function handleSearch() {
		if (query != '' && query) {
			goto(`/store?q=${query}`);
		}
	}
</script>

<form>
	<div>
		<input
			type="text"
			bind:value={query}
			on:keypress={(event) => {
				if (event.key === 'Enter') {
					handleSearch();
				}
			}}
			placeholder="Search all products..."
		/>
		<button
			class="cl-btn"
			aria-label="Search"
			type="submit"
			tabindex="-10"
			on:keypress|preventDefault
			on:click|preventDefault={handleSearch}><SearchIcon /></button
		>
	</div>
</form>

<style lang="scss">
	form {
		position: relative;
	}
	input {
		box-sizing: border-box;
		padding: 1rem;
		border-radius: 50px;
		font-family: inherit;
		border: var(--primary-border);
		height: 1.8rem;
		margin: 0 1rem;
	}

	input:focus {
		outline: none;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
	}
	button {
		position: absolute;
		right: 7%;
		top: 15%;
	}

	@media (max-width: 500px) {
		button {
			right: 16%;
		}
		input {
			width: clamp(30px, 20vw, 100px);
			font-size: 0px;
			&::placeholder {
				opacity: 0;
			}
		}
		form:focus-within {
			box-sizing: border-box;
			position: fixed;
			z-index: 3;
			left: -20px;
			top: -1px;
			button {
				display: none;
			}
			input {
				position: fixed;
				font-size: 1rem;
				width: 92vw;
				height: 50px;
		
				&::placeholder {
					opacity: 1;
				}
			}
		}
	}
</style>

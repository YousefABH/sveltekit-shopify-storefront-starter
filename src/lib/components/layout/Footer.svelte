<script>

	import { siteAuthor } from "../../config";

</script>
<footer class="flex-center">
	<nav>
		<ul class="footer-links flex-center" role="menu">
			<li role="menuitem"><a href="#">Store</a></li>
			<li role="menuitem"><a href="#">About Us</a></li>
			<li role="menuitem"><a href="#">Contact Us</a></li>
			<li role="menuitem"><a href="#">FAQs</a></li>
		</ul>
	</nav>
	<p>© {new Date().getFullYear()} {siteAuthor}</p>
</footer>

<style lang="scss">
	footer {
		padding: 1rem;
		justify-content: space-around;
		background-color: var(--secondary-color);
		color: var(--primary-color);
		height: 300px;
		margin-top: 5rem;
		position: relative;

		nav {
			ul {
				list-style: none;
				padding: 0;
				margin: 0;

				li {
					margin: 1rem;

					a {
						text-decoration: none;
						color: var(--primary-color);

						&:hover {
							text-decoration: underline;
						}
					}
				}
			}
		}

		p {
			font-size: 0.8rem;
			position: absolute;
			bottom: 0;
			left: 0;
			margin: 2rem;
			align-self: flex-end;
		}
	}

	@media (max-width:400px) {
		nav ul {
			flex-direction: column;
			align-items: flex-start;
		}

		footer {
			justify-content: flex-start;
		}
	}
</style>

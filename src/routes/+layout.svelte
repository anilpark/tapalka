<script>
	import '../app.css';
	import { initTgWebView } from '$lib';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { BadgeDollarSign, Logs, Users, Store, Settings } from 'lucide-svelte';

	onMount(() => {
		initTgWebView();
	});

</script>


<main class="bg-slate-950">
	<slot />

	<nav class="bg-neutral-800 p-3 rounded flex items-center justify-center gap-7">
		<a class:active={$page.route.id === '/tasks'} href="/tasks">
			<Logs />
		</a>
		<a class:active={$page.route.id === '/friends'}  href="/friends">
			<Users />
		</a>
		<a  class="home" class:active={$page.route.id === '/'} href="/">
			<BadgeDollarSign />
		</a>
		<a class:active={$page.route.id === '/shop'} href="/shop">
			<Store />
		</a>
		<a class:active={$page.route.id === '/settings'} href="/settings">
			<Settings />
		</a>
	</nav>
</main>

<style>
    main {
        position: relative;
        background: var(--background);
        height: 100vh;
				width: 100%;
				overflow: hidden;
    }

    nav {
        position: fixed;
        bottom: 0;
        width: 100%;
    }

		a{
				color: lightgrey;
		}

    .active {
        color: greenyellow;
    }

		.home{
				scale: 1.5;
				margin: 0 10px;

				border-radius: 50%;
				padding: 3px;
		}
</style>

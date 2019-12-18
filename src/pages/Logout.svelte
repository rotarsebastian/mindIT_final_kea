<script>
	import { onMount } from 'svelte';
	import { curRoute } from '../routing/router.js';


	onMount(() => {
		localStorage.clear();
		curRoute.set('/home');
		window.history.pushState({path: '/home'}, '', window.location.origin + '/home');
		// window.location.href = '/login';
	});
	
</script>

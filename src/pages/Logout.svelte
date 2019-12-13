<script>
	import { onMount } from 'svelte';

	onMount(() => {
		localStorage.clear();
		window.location.href = '/login';
	});
	
</script>

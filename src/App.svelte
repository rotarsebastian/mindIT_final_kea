<script>
	import Header from './components/Header.svelte';
	import router, { curRoute } from './routing/router.js';
	import { onMount } from 'svelte';

	onMount(() => {
	curRoute.set(window.location.pathname);
	if (!history.state) {
		window.history.replaceState({path: window.location.pathname}, '',   window.location.href)
	}
	})

	const sourceImage = './assets/images/test.png';

</script>

<!-- ****************************************************** -->
<!-- ************************Styles************************ -->
<!-- ****************************************************** -->

<style>
#pageContent{
	width: 100%;
	padding: .5rem;
}
</style>

<!-- ****************************************************** -->
<!-- ************************HTML************************** -->
<!-- ****************************************************** -->

<Header></Header>

<div id="pageContent">
	<!-- Page component updates here -->
	<svelte:component this={router[$curRoute]} />
</div>







<script>
	//import jq from "jquery";
	import Riddle from './components/Riddle.svelte';
	import router, { curRoute } from './routing/router.js';
	import RouterLink from './routing/RouterLink.svelte';
	import { onMount } from 'svelte';

	const sourceImage = './assets/images/test.png';

	onMount(() => {
		curRoute.set(window.location.pathname);
		if (!history.state) {
			window.history.replaceState({path: window.location.pathname}, '',   window.location.href)
		}
	})

	function handlerBackNavigation(event){
		curRoute.set(event.state.path)
	}

</script>

<!-- ****************************************************** -->
<!-- ************************Styles************************ -->
<!-- ****************************************************** -->

<style>
	img{
		width: 200px;
    	height: auto;
	}
</style>

<!-- ****************************************************** -->
<!-- ************************HTML************************** -->
<!-- ****************************************************** -->

<!-- <HeaderTop></HeaderTop> -->

<img src="./assets/images/mindit_logo.svg" alt="logo">

<svelte:window on:popstate={handlerBackNavigation} />

<RouterLink page={{path: '/home', name: 'Home'}} />
<RouterLink page={{path: '/createRiddle', name: 'Create Riddle'}} />

<div id="pageContent">
	<!-- Page component updates here -->
	<svelte:component this={router[$curRoute]} />
</div>







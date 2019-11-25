<style>
	.header_container {
		width: 100vw;
		height: 100px;
		border-radius: 2px;
		box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
		padding: 1em;
		display: flex;
	}

	#mindit_logo{
		width: 200px;
    	height: auto;
	}

	.navbar{
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
	}
</style>

<script>
	import RouterLink from '../routing/RouterLink.svelte';
	import router, { curRoute } from '../routing/router.js';


	function handlerBackNavigation(event){
		curRoute.set(event.state.path)
	}

	let current = 'navbar';
</script>

<svelte:window on:popstate={handlerBackNavigation} />

<div class="header_container">
	<img src="./assets/images/mindit_logo_3.svg" id="mindit_logo" alt="mindit_logo"/>
	<div class:navbar="{current === 'navbar'}"></div>

	<RouterLink page={{path: '/home', name: 'Home'}} />
	<RouterLink page={{path: '/create-quiz', name: 'Create Quiz'}} />
</div>
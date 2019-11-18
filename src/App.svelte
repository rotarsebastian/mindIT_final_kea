<script>
	//import axios from "axios";
	//import jq from "jquery";
	//import Riddle from './components/Riddle.svelte';
	import Riddle from './components/Riddle.svelte';
	import router, { curRoute } from './routing/router.js';
	import RouterLink from './routing/RouterLink.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		curRoute.set(window.location.pathname);
		if (!history.state) {
			window.history.replaceState({path: window.location.pathname}, '',   window.location.href)
		}
	})

	function handlerBackNavigation(event){
		curRoute.set(event.state.path)
	}
		
	const addRiddle = () => {
		console.log(riddle_content_value, riddle_answer_value, riddle_entry_value, riddle_duration_value);
		axios.post(basicURL + 'api-create-riddle.php', {
			riddle_content: riddle_content_value,
			riddle_answer: riddle_answer_value,
			riddle_entry: riddle_entry_value,
			riddle_duration: riddle_duration_value
		})
		.then(function (response) {
			console.log(response.data);
		})
		.catch(function (error) {
			console.log(error);
		});
	};

	let riddle_content_value, riddle_answer_value, riddle_entry_value, riddle_duration_value = '';
	

</script>

<!-- ****************************************************** -->
<!-- ************************Styles************************ -->
<!-- ****************************************************** -->

<style>
	.inputElement{
		display: flex;
		justify-content: space-between;
		width: 300px;
		height: auto;
	}
</style>

<!-- ****************************************************** -->
<!-- ************************HTML************************** -->
<!-- ****************************************************** -->

<!-- <div class="inputElement">
	<label for="text">
		Riddle Text
	</label>
	<input id="text" bind:value={riddle_content_value}>
</div>

<div class="inputElement">
	<label for="lastName">
		Answer
	</label>
	<input id="lastName" bind:value={riddle_answer_value}>
</div>

<div class="inputElement">
	<label for="email">
		Entry
	</label>
	<input id="email" bind:value={riddle_entry_value}>
</div>

<div class="inputElement">
	<label for="email">
		Duration
	</label>
	<input id="email" bind:value={riddle_duration_value}>
</div>

<button on:click={addRiddle}>Add riddle</button> -->

<!-- <HeaderTop></HeaderTop> -->

<svelte:window on:popstate={handlerBackNavigation} />

<RouterLink page={{path: '/home', name: 'Home'}} />
<RouterLink page={{path: '/createRiddle', name: 'Create Riddle'}} />

<div id="pageContent">
	<!-- Page component updates here -->
	<svelte:component this={router[$curRoute]} />
</div>







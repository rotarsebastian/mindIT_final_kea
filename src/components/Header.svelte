<script>
	import RouterLink from '../routing/RouterLink.svelte';
	import router, { curRoute } from '../routing/router.js';
	import jq from "jquery";
	import { onMount } from 'svelte';

	const basicURL = 'https://aqueous-escarpment-49631.herokuapp.com/apis/';
	const results = document.querySelector('#results');

	let filterOptions = [
		{ id: 0, text: `Filter by difficulty`, value: 'unset' },
		{ id: 1, text: `Very Easy`, value:'VeryEasy' },
		{ id: 2, text: `Easy`, value:'Easy' },
		{ id: 3, text: `Medium`, value:'Medium'},
		{ id: 4, text: `Hard`, value:'Hard'},
		{ id: 5, text: `Very Hard`, value:'VeryHard' }
	];

	let selected;
	let search = '';

	function handlerBackNavigation(event){
		curRoute.set(event.state.path)
	}

	function toHomePage(event){
		curRoute.set('/home');
		window.history.pushState({path: '/home'}, '', window.location.origin + '/home');
	}

	function handleSearch() {
		if (search.length >= 2) {
			jq('#results').empty();
				jq.ajax({
					type: 'GET',
					url: basicURL + 'api-search-and-filter.php',
					data: {
						search: search,
						limit: 20,
						token: localStorage.token,
						filter: selected.value
					},
					dataType: "json",

				})
				.done( matches => {
					console.log(matches);
					// jq('#results').empty();

					// jq.each(matches, (index, zip) => {
					// 	let divZip = `<div class="result showPropertiesByZipCode">jq{zip}</div>`;
					// 	jq('#results').append(divZip);
					// });
				})
				.fail(function () {
					console.log('Error');
				});
		}

		// if (this.value.length < 2) {
		// 	jq('#results').hide();
		// } else {
		// 	jq('#results').show();
		// }

	}
</script>

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
		cursor: pointer;
	}

	/* TOP SEARCH BAR AND PROPERTY ADD */
	#searchBar_container {
		display: flex;
		justify-content: space-between;
		top: 3rem;
		height: 3rem;
	}

	#searchBar {
		justify-content: center;
		display: flex;
		align-items: center;
		height: 100%;
	}

	#search_input {
		height: 2rem;
		width: 29vw;
		border-radius: 4px;
		outline: none;
		border: 1px solid darkgrey;
		margin-left: .25rem;
		padding-left: .65rem;
		/* color: #FF851B; */
		position: relative;
	}

	#results {
		position: absolute;
		top: 2.5rem;
		width: 29vw;
		height: auto;
		background-color: #f9f9f9;
		margin-left: 0;
		max-height: 13rem;
		overflow-y: scroll;
		left: 3px;
	}
	.result {
		padding: .7rem;
		color: #FF851B;
		box-shadow: 0px 0px 2px 0px rgba(209, 209, 209, 1);
		cursor: pointer;
	}

</style>
<svelte:window on:popstate={handlerBackNavigation} />

<div class="header_container">
	<img on:click={toHomePage} src="./assets/images/mindit_logo_3.svg" id="mindit_logo" alt="mindit_logo"/>

	<RouterLink page={{path: '/home', name: 'Home'}} />
	<RouterLink page={{path: '/create-quiz', name: 'Create Quiz'}} />
	<!-- <RouterLink page={{path: '/login', name: 'Login'}} /> -->

	<div id="searchBar_container">
		<div id="searchBar">
			<input id="search_input" type="text" placeholder="Search for a quiz" name="search" maxlength="30" on:input={handleSearch} bind:value={search}/>
			<select bind:value={selected} on:change={handleSearch}>
				{#each filterOptions as difficulty}
					<option value={difficulty}>
						{difficulty.text}
					</option>
				{/each}
			</select>
			<div id="results"></div>
		</div>
	</div>


</div>

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
	#searchBar_addProperty {
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

	/* .result {
		padding: .7rem;
		color: #FF851B;
		box-shadow: 0px 0px 2px 0px rgba(209, 209, 209, 1);
		cursor: pointer;
	} */

</style>

<script>
	import RouterLink from '../routing/RouterLink.svelte';
	import router, { curRoute } from '../routing/router.js';
	import jq from "jquery";


	function handlerBackNavigation(event){
		curRoute.set(event.state.path)
	}

	function toHomePage(event){
		curRoute.set('/home');
		window.history.pushState({path: '/home'}, '', window.location.origin + '/home');
	}

	const basicURL = 'https://aqueous-escarpment-49631.herokuapp.com/apis/';

	// const search = document.querySelector('#search_input');
	// const results = document.querySelector('#results');

	// search.addEventListener('input', function () {

	// 	if (jq('#search_input').val().length >= 2) {
	// 		jq('#results').empty();
	// 		setTimeout(() => {
	// 			jq.ajax({
	// 					url: basicURL + 'api-search.php',
	// 					data: {
	// 						search: search.value
	// 					},
	// 					dataType: "JSON"
	// 				})
	// 				.done(function (matches) {
	// 					jq('#results').empty();
	// 					// matches.forEach((match) => {
	// 					//     jq('#results').append(`<div>jq{match}</div>`);
	// 					// })
	// 					jq.each(matches, (index, zip) => {
	// 						let divZip = `<div class="result showPropertiesByZipCode">jq{zip}</div>`;
	// 						jq('#results').append(divZip);
	// 					});
	// 				})
	// 				.fail(function () {
	// 					console.log('Error');
	// 				});
	// 		}, 700);

	// 	}

	// 	if (search.value.length < 2) {
	// 		results.style.display = 'none';
	// 	} else {
	// 		results.style.display = 'block';
	// 	}

	// });
</script>

<svelte:window on:popstate={handlerBackNavigation} />

<div class="header_container">
	<img on:click={toHomePage} src="./assets/images/mindit_logo_3.svg" id="mindit_logo" alt="mindit_logo"/>

	<RouterLink page={{path: '/home', name: 'Home'}} />
	<RouterLink page={{path: '/create-quiz', name: 'Create Quiz'}} />
	<!-- <RouterLink page={{path: '/login', name: 'Login'}} /> -->

	<div id="searchBar_addProperty">
		<div id="searchBar">
				<input id="search_input" type="text" placeholder="Search for a quiz" name="search" maxlength="4">
				<!-- <div id="seeAllProperties">See all listed properties</div> -->
			<div id="results"></div>
		</div>
	</div>


</div>
<script>
	import jq from "jquery";
	import Quiz from '../components/Quiz.svelte';
	import { curRoute } from '../routing/router.js';

	const basicURL = 'https://aqueous-escarpment-49631.herokuapp.com/apis/';

	let filterOptions = [
		{ id: 0, text: `All difficulties`, value: 'unset' },
		{ id: 1, text: `Very Easy`, value:'VeryEasy' },
		{ id: 2, text: `Easy`, value:'Easy' },
		{ id: 3, text: `Medium`, value:'Medium'},
		{ id: 4, text: `Hard`, value:'Hard'},
		{ id: 5, text: `Very Hard`, value:'VeryHard' }
	];

	let selected;
	let search = '';
	
	const handleSearch = async () => {
		let matchesQuizzes = [];
		const searchedQuizzes = await jq.ajax({
			type: 'GET',
			url: basicURL + 'api-search-and-filter.php',
			data: {
				search: search,
				limit: 20,
				token: localStorage.token,
				filter: selected.value
			},
			dataType: "json",
			success: (matches) => {
				matchesQuizzes = matches;
			}
		});
		promiseQuizzes = matchesQuizzes;
	}

	const getInitialData = async () => {
		const limit = 20;
		const quizzesArray = await jq.ajax({
			type: 'GET',
			url: basicURL + `api-get-quizzes.php?limit=${limit}`,
			dataType: "json",
			data: {
				token: localStorage.token
			},
			success: (data) => {
				return data;
			}
		});
		if (quizzesArray) {
			return quizzesArray;
		} else {
			throw new Error();
		}
	}

	let promiseQuizzes = getInitialData();

	function toCreateQuizPage(event){
		curRoute.set('/create-quiz');
		window.history.pushState({path: '/create-quiz'}, '', window.location.origin + '/create-quiz');
	}

</script>

<style>
	.loading_spinner{
		width: 100vw;
		height: 100vh;
		text-align: center;
		line-height: 80vh;
	}

	#searchBar_container {
		margin-top: -46px;
    	margin-bottom: 45px;
	}
	#searchBar{
		margin: 0 20px;
	}
	#search_input{
		width: 100%;
		border-radius: 4px;
	}
	#top_bar{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 16px;
	}

	#filter_container{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	#filter_icon{
		width: 20px;
		margin-right: 15px;
		filter: invert(60%) sepia(90%) saturate(1657%) hue-rotate(337deg) brightness(95%) contrast(88%);
	}

	#createQuiz_button{
		color: white;
		background: purple;
		border: none;
		outline: none;
		padding: 10px 20px;
		border-radius: 4px;
		margin-right: 23px;
	}

	#no_quizzes {
		text-align: center;
		margin: 3rem;
		font-size: 18px;
		color: purple;
	}

</style>

{#await promiseQuizzes}
    <div class="loading_spinner">...waiting (spinner)</div>
{:then quizzes }
	<div id="searchBar_container">
		<div id="searchBar">
			<input id="search_input" type="text" placeholder="Search for a quiz" name="search" maxlength="30" on:input={handleSearch} bind:value={search}/>
		</div>
	</div>
	<div id="top_bar">
		<div id="filter_container">
			<img src="./assets/images/filter_icon.svg" id="filter_icon" alt="filter_icon"/>
			<select bind:value={selected} on:change={handleSearch}>
				{#each filterOptions as difficulty}
					<option value={difficulty}>
						{difficulty.text}
					</option>
				{/each}
			</select>
		</div>

		<div id="create_quiz">
			<button id="createQuiz_button" on:click={toCreateQuizPage}>+ Create quiz</button>
		</div>
	</div>
	{#if quizzes.length > 0}
		{#each quizzes as {id, name, questionsAmount, difficulty, user_first_name, user_last_name, user_id}, i} 
			<Quiz id={id}>
				<div>{name}</div>
				<div>{questionsAmount}</div>
				<div>Difficulty: {difficulty}</div>
				<div>Created by: {user_first_name} { user_last_name}</div>
			</Quiz>
		{/each}
		{:else}
			<div id="no_quizzes">No quizzes were found for your search</div>
	{/if}
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}




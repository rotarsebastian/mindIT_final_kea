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

	function toCreateQuizPage(){
		curRoute.set('/create-quiz');
		window.history.pushState({path: '/create-quiz'}, '', window.location.origin + '/create-quiz');
	}

	function toQuizPage(quiz_id){
		curRoute.set('/quiz');
		const quizPage = '/quiz?id=' + quiz_id;
		window.history.pushState({path: '/quiz'}, '', window.location.origin + quizPage);
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

	#no_quizzes {
		text-align: center;
		margin: 3rem;
		font-size: 18px;
		color: purple;
	}

	.quiz_top_container{
		display: flex;
		justify-content: space-between;
		font-weight: bold;
		height: 42px;
	}

	.quiz_name{
		text-transform: capitalize;
    	font-size: 22px;
	}

	.quiz_difficulty {
    	font-size: 18px;
	}

	.quiz_questions_amount{
		margin: 1rem 0;
		font-weight: bold;
	}

	.quiz_bottom_container{
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
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
			<button class="purple_button" on:click={toCreateQuizPage}>+ Create quiz</button>
		</div>
	</div>
	{#if quizzes.length > 0}
		{#each quizzes as {id, name, questionsAmount, difficulty, user_first_name, user_last_name, user_id}, i} 
			<Quiz id={id}>
				<div class="quiz_top_container">
					<div class="quiz_name">{name}</div>
					<div class="quiz_difficulty">Difficulty: {difficulty}</div>
				</div>
				<div class="quiz_questions_amount">{questionsAmount} Questions</div>
				<div class="quiz_bottom_container">
					<div class="quiz_author">created by {user_first_name} { user_last_name}</div>
					<button class="purple_button" on:click|preventDefault={() => toQuizPage(id)}>Enter quiz</button>
				</div>
			</Quiz>
		{/each}
		{:else}
			<div id="no_quizzes">No quizzes were found for your search</div>
	{/if}
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}




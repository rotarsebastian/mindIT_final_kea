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

	#filter_container{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	#filter_container select {
		display: block;
		font-size: 12px;
		color: #444;
		line-height: 1.3;
		padding: .6em 1.4em .5em .8em;
		width: 114px;
		box-sizing: border-box;
		margin: 0;
		border: 1px solid rgba(229, 115, 57, 0.3);
		box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
		border-radius: .5em;
		-moz-appearance: none;
		-webkit-appearance: none;
		appearance: none;
		background-color: #fff;
		background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
		linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
		background-repeat: no-repeat, repeat;
		background-position: right .7em top 50%, 0 0;
		background-size: .65em auto, 100%;
	}
	#filter_container select::-ms-expand {
		display: none;
	}
	#filter_container select:hover {
		border-color: rgba(229, 115, 57, 0.5);
	}
	#filter_container select:focus {
		border-color: #aaa;
		box-shadow: 2px 2px 8px rgba(0,0,0,0.2);
		box-shadow: 0 0 0 3px -moz-mac-focusring;
		color: #222; 
		outline: none;
	}
	#filter_container select option {
		font-weight:normal;
	}

	#filter_icon{
		width: 20px;
		margin-right: 15px;
		filter: invert(60%) sepia(90%) saturate(1657%) hue-rotate(337deg) brightness(95%) contrast(88%);
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




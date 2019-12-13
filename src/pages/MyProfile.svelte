<script>
	import jq from "jquery";
	import Quiz from '../components/Quiz.svelte';

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

</script>

<style>
	.loading_spinner{
		width: 100vw;
		height: 100vh;
		text-align: center;
		line-height: 80vh;
	}
</style>

{#await promiseQuizzes}
    <div class="loading_spinner">...waiting (spinner)</div>
{:then quizzes }
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
			</div>
	</div>
    {#each quizzes as {id, name, questionsAmount, difficulty, user_first_name, user_last_name, user_id}, i} 
        <Quiz id={id}>
            <div>{name}</div>
            <div>{questionsAmount}</div>
            <div>Difficulty: {difficulty}</div>
            <div>Created by: {user_first_name} { user_last_name}</div>
        </Quiz>
    {/each}
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}




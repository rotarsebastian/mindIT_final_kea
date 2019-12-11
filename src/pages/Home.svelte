<script>
    import { onDestroy } from 'svelte';
	import jq from "jquery";
	import Quiz from '../components/Quiz.svelte';

	const basicURL = 'https://aqueous-escarpment-49631.herokuapp.com/apis/';

	const getData = async () => {
		const limit = 20;
		const quizzesArray = await jq.ajax({
			type: 'GET',
			url: basicURL + `api-get-quizzes.php?limit=${limit}`,
			dataType: "json",
			data: {
				token: localStorage.token
			},
			success: (data) => {
				console.log(data);
				return data;
			}
		});
		if (quizzesArray) {
			return quizzesArray;
		} else {
			throw new Error();
		}
	}

	const promiseQuizzes = getData();

</script>

<style></style>

<!-- Page component updates here -->

{#await promiseQuizzes}
    <p>...waiting (spinner)</p>
{:then quizzes}
    {#each quizzes as {id, name, questionsAmount, difficulty, user_first_name, user_last_name}, i} 
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


<script>
	import axios from "axios";

	const basicURL = 'https://aqueous-escarpment-49631.herokuapp.com/apis/';
	let arrayOfQuestions = [];

	let riddleContentValue = '', riddleAnswerValue = '', riddleDifficultyValue, canCreateQuiz = false;
	const difficultyLevel = [
		{ value: '', text: 'Select difficulty level' },
		{ value: 'easy', text: 'Easy' },
		{ value: 'medium', text: 'Medium' },
		{ value: 'hard', text: 'Hard' }
	];

	const addQuestion = () => {
		if (riddleDifficultyValue !== '' && riddleContentValue.length > 5 && riddleAnswerValue.length > 5) {
			const newQuestion = {
				questionContentValue: riddleContentValue,
				questionAnswerValue: riddleAnswerValue,
				questionDifficultyValue: riddleDifficultyValue,
			};
			arrayOfQuestions.push(newQuestion);
			riddleContentValue = '', riddleAnswerValue = '', riddleDifficultyValue = '';
			if(arrayOfQuestions.length > 1){
				canCreateQuiz = true;
			}
		}
		console.log(arrayOfQuestions);
	}

    const createQuiz = () => {
		axios.post(basicURL + 'api-create-quiz.php', {
			questions: JSON.stringify(arrayOfQuestions)
		})
		.then(function (response) {
			console.log(response.data);
		})
		.catch(function (error) {
			console.log(error);
		});
    };

</script>
<style>
  .inputElement{
		display: flex;
		justify-content: space-between;
		width: 300px;
		height: auto;
	}
</style>

<h1>This is Create quiz page</h1>

<div class="form_container">

		<div class="inputElement">
			<label for="text">
				Question
			</label>
			<input id="text" bind:value={riddleContentValue} name="riddleValue">
		</div>

		<div class="inputElement">
			<label for="lastName">
				Answer
			</label>
			<input id="lastName" bind:value={riddleAnswerValue} name="riddleAnswer">
		</div>

		<div class="inputElement">
			<select bind:value={riddleDifficultyValue} name="riddleDifficulty">
				{#each difficultyLevel as level}
					<option value={level.value}>
						{level.text}
					</option>
				{/each}
			</select>
		</div>
		<button on:click={ addQuestion } >Add question</button>
</div>

{#if canCreateQuiz}
	<button on:click={ createQuiz }>Create quiz</button>
{/if}
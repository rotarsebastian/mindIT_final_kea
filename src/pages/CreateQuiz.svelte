<script>
	import axios from "axios";

	const basicURL = 'https://aqueous-escarpment-49631.herokuapp.com/apis/';
	let arrayOfQuestions = [];

	let questionValue = '', questionAnswer = '', questionDifficulty, canCreateQuiz = false;
	const difficultyLevel = [
		{ value: '', text: 'Select difficulty level' },
		{ value: 'easy', text: 'Easy' },
		{ value: 'medium', text: 'Medium' },
		{ value: 'hard', text: 'Hard' }
	];

	const addQuestion = () => {
		if (questionDifficulty !== '' && questionValue.length > 5 && questionAnswer.length > 5) {
			const newQuestion = {
				questionContentValue: questionValue,
				questionAnswerValue: questionAnswer,
				questionDifficultyValue: questionDifficulty,
			};
			arrayOfQuestions.push(newQuestion);
			questionValue = '', questionAnswer = '', questionDifficulty = '';
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
	
	const isNotValid = (value) => {
		if( value.length > 5 ) {
			return false;
		} 
		return true;
	}

</script>
<style>
  	.inputElement{ 
		display: flex;
		justify-content: space-between;
		width: 300px;
		height: auto;
	}

	.error {
		color: red;
	}
</style>

<h1>This is Create quiz page</h1>

<div class="form_container">

		<div class="inputElement">
			<label for="text">
				Question
			</label>
			<input id="text" bind:value={questionValue}>
		</div>
		{#if isNotValid(questionValue) }
			<div class="error">Not long enough</div>
		{/if}

		<div class="inputElement">
			<label for="lastName">
				Answer
			</label>
			<input id="lastName" bind:value={questionAnswer} name="questionAnswer">
		</div>
		{#if isNotValid(questionAnswer) }
			<div class="error">Not long enough</div>
		{/if}

		<div class="inputElement">
			<select bind:value={questionDifficulty} name="questionDifficulty">
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
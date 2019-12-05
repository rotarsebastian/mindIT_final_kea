<script>
	import axios from "axios";

	const basicURL = 'https://aqueous-escarpment-49631.herokuapp.com/apis/';
	let arrayOfQuestions = [];

	let quizName = 'dada', questionValue = '', questionAnswer = '', questionDifficulty = 0, canCreateQuiz = false, difficultyChoosed = false;
	const difficultyLevel = [
		{ value: 0, text: 'Select difficulty level' },
		{ value: 1, text: 'Easy' },
		{ value: 2, text: 'Medium' },
		{ value: 3, text: 'Hard' }
	];

	const addQuestion = () => {
		if (questionDifficulty === 0) {
			difficultyChoosed = true;
		}
		if (questionDifficulty !== 0 && questionValue.length > 5 && questionAnswer.length > 5) {
			difficultyChoosed = false;
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
		console.log(JSON.stringify(arrayOfQuestions))
		axios.post(basicURL + 'api-create-quiz.php', {
			name: quizName,
			questions: arrayOfQuestions
		})
		.then(function (response) {
			console.log(response.data);
		})
		.catch(function (error) {
			console.log(error);
		});
	};
	
	const showError = (value) => {
		if( value.length <= 5 && value.length > 0 ) {
			return true;
		} 
		return false;
	}

</script>
<style>
  	.form_container {
		width: 100vw;
	}

	.inputElement textarea {
		resize: none;
		outline: none;
	}

	.error {
		color: red;
		font-size: 0.7rem;
    	margin: .5rem 0;
	}
</style>

<h1>This is Create quiz page</h1>

<div class="page_content">
	<div class="form_container">
		<div class="inputElement">
			<label for="text">
				Question
			</label>
			<textarea id="text" bind:value={questionValue}></textarea>
		</div>
		{#if showError(questionValue) }
			<div class="error">Not long enough</div>
		{/if}

		<div class="inputElement">
			<label for="lastName">
				Answer
			</label>
				<textarea id="lastName" bind:value={questionAnswer} name="questionAnswer"></textarea>
		</div>
		{#if showError(questionAnswer) }
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

		{#if difficultyChoosed && questionDifficulty === 0 }
			<div class="error">Please select difficulty</div>
		{/if}

		<button on:click={ addQuestion } >Add question</button>
		{#if canCreateQuiz}
			<button on:click={ createQuiz }>Create quiz</button>
		{/if}
	</div>
</div>


<script>
	import toastr from "toastr";
	import jq from "jquery";
	import { curRoute } from '../routing/router.js';

	const basicURL = 'https://aqueous-escarpment-49631.herokuapp.com/apis/';
	let arrayOfQuestions = [];

	toastr.options = {
		"positionClass": "toast-bottom-right",
		"preventDuplicates": true,
    }

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
				toastr.success('Your question has been added. You can create your quiz now or you can add more questions');
			} else {
				toastr.success(`Your question has been added. Add at least ${arrayOfQuestions.length} more questions to create the quiz`);
			}
		}
		// console.log(arrayOfQuestions);
	}

    const createQuiz = () => {
		jq.ajax({
            type: "POST",
            url: basicURL + "api-create-quiz.php",
            dataType: "json",
            data: {
                name: quizName,
				questions: JSON.stringify(arrayOfQuestions),
				token: localStorage.token
            },
            success: (data) => {
				toastr.success('Your quiz has been registered successfully');
				curRoute.set('/home');
				window.history.pushState({path: '/home'}, '', window.location.origin + '/home');
            },
            error: () => {
                alert("Error: Login Failed");
            }
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
		width: 100%;
		padding: .5rem .2rem;
	}

	.inputElement textarea {
		resize: none;
		outline: none;
		width: 100%;
		border-radius: 4px;
	}

	label{
		margin: .45rem 0;
		color: purple;
		font-weight: bold;
		margin-bottom: .66rem;
    	padding-left: .25rem;
	}

	#filter_container{
		align-items: flex-end;
	}

	#filter_container select{
		width: 195px;
	}

	.error {
		color: red;
		font-size: 0.7rem;
		margin: .5rem 0;
		margin-top: .25rem;
		padding: 0 .25rem;
	}

	.add_question_button{
		color: #333;
		outline: none;
		border: none;
		font-size: 20px;
		background: transparent;
		padding: 0;
	}

	.purple_button{
		margin-top: 1.7rem;
    	width: 100%;
	}

	.wrap_input_container{
		margin-bottom: 1.15rem;
	}
</style>

<h1>Create a new quiz</h1>

<div class="page_content">
	<div class="form_container">
		<div class="wrap_input_container">
			<div class="inputElement">
				<label for="text">
					Question
				</label>
				<textarea id="text" bind:value={questionValue} placeholder="Enter your question here"></textarea>
			</div>
			{#if showError(questionValue) }
				<div class="error">Your question is not long enough</div>
			{/if}
		</div>

		<div class="wrap_input_container">
			<div class="inputElement">
				<label for="lastName">
					Correct answer
				</label>
					<textarea id="lastName" bind:value={questionAnswer} name="questionAnswer" placeholder="Enter the correct answer here"></textarea>
			</div>
			{#if showError(questionAnswer) }
				<div class="error">Your answer is not long enough</div>
			{/if}
		</div>

		<div id="filter_container">
			<div class="container_left_side">
				<label for="questionDifficulty">Choose question difficulty</label>
				<select bind:value={questionDifficulty} name="questionDifficulty">
					{#each difficultyLevel as level}
						<option value={level.value}>
							{level.text}
						</option>
					{/each}
				</select>
			</div>
			<button on:click={ addQuestion } class="add_question_button">╋ &nbsp;  Add question</button>
		</div>

		{#if difficultyChoosed && questionDifficulty === 0 }
			<div class="error">Please select difficulty</div>
		{/if}

		{#if canCreateQuiz}
			<button on:click={ createQuiz } class="purple_button">Create quiz</button>
		{/if}
	</div>
</div>


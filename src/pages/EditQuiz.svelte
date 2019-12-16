<script>
	import toastr from "toastr";
	import jq from "jquery";
    import CreateQuiz from "./CreateQuiz.svelte";
    import { curRoute } from '../routing/router.js';

    const urlParams = new URLSearchParams(window.location.search);
    const quiz_id = urlParams.get('id');
    const basicURL = 'https://aqueous-escarpment-49631.herokuapp.com/apis/';

    toastr.options = {
		"positionClass": "toast-bottom-right",
		"preventDuplicates": true,
    }

    let quizData = {}, addNewQuestion = false;

    let questionValue = '', questionAnswer = '', questionDifficulty = 0, canEditQuiz = false, difficultyChoosed = false;

	const difficultyLevel = [
		{ value: "0", text: 'Select difficulty level' },
		{ value: "1", text: 'Easy' },
		{ value: "2", text: 'Medium' },
		{ value: "3", text: 'Hard' }
    ];
    
    const addQuestion = () => {
        addNewQuestion = true;
		if (questionDifficulty === 0) {
			difficultyChoosed = true;
		}
		if (questionDifficulty !== 0 && questionValue.length > 5 && questionAnswer.length > 5) {
			difficultyChoosed = false;
			const newQuestion = {
				questionContent: questionValue,
				questionAnswer: questionAnswer,
				questionDifficulty: questionDifficulty,
			};
            quizData.questions.push(newQuestion);
            addNewQuestion = false;
			questionValue = '', questionAnswer = '', questionDifficulty = 0;
			if(quizData.questions.length > 1){
				canEditQuiz = true;
				toastr.success('Your question has been added. You can create your quiz now or you can add more questions');
			} else {
				toastr.success(`Your question has been added. Add at least ${quizData.questions.length} more questions to create the quiz`);
            }
            promiseQuiz = quizData;
            console.log(quizData);
		}
    }

    const removeQuestion = (question_id) => {
        console.log(quizData)
        quizData.questions = quizData.questions.filter(question => {return question.questionID !== question_id});
        if( typeof question_id !== 'undefined') {quizData.removedQuestions.push(question_id);}
        promiseQuiz = quizData;
    }
    
    const editQuiz = () => {
		if(quizData.quizName.length > 5 && canEditQuiz) {
			jq.ajax({
				type: "POST",
				url: basicURL + "api-edit-quiz.php",
				dataType: "json",
				data: {
                    name: quizData.quizName,
                    id: quiz_id,
					questions: JSON.stringify(quizData.questions),
					removedQuestions: JSON.stringify(quizData.removedQuestions),
					token: localStorage.token
				},
				success: (data) => {
                    // console.log(data);
					toastr.success('Your quiz has been edited successfully');
					curRoute.set('/my-quizzes');
					window.history.pushState({path: '/my-quizzes'}, '', window.location.origin + '/my-quizzes');
				},
				error: () => {
					alert("Error: Login Failed");
				}
			});
		}
	};
    
    const getQuiz = async () => {
		const quiz = await jq.ajax({
            type: 'GET',
			url: basicURL + `api-get-quiz-questions.php`,
			dataType: "json",
			data: {
                quizID: quiz_id,
				token: localStorage.token
			},
			success: (data) => {
                quizData = data;
                quizData.removedQuestions = [];
                if(quizData.questions.length > 1) canEditQuiz = true;
                return quizData;
			},
			error: error => {
				console.log(error);
			}
		});
		if (quiz) {
			return quiz;
		} else {
            throw new Error();
		}
	}

    let promiseQuiz = getQuiz();
    
    const showError = (value) => {
		if( value.length <= 5 && value.length > 0 ) {
			return true;
		} 
		return false;
	}

</script>
<style>

	.inputElement textarea, .inputElement input {
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
        margin: 1rem 0;
        margin-top: 2rem;
        cursor: pointer;
	}

	.purple_button{
        margin: 1.7rem 0;
    	width: 100%;
    }
    
    .orange_button{
        margin-top: 1.7rem;
        padding: 0.3rem .95rem;
        background: orange;
    }

	.wrap_input_container{
        margin-bottom: 2rem;
    }
    
    .wrap_question{
        border: 1px solid rgba(128, 0, 128, 0.136);
        border-radius: 4px;
        margin-bottom: 2rem;
        padding: 0.75rem;
    }
</style>

{#await promiseQuiz}
    <div class="loading_spinner">...waiting (spinner)</div>
{:then quiz}
    <div class="wrap_input_container">
        <div class="inputElement">
            <label for="text">
                Quiz name
            </label>
            <input id="text" bind:value={quizData.quizName} />
        </div>
        {#if showError(quizData.quizName) }
            <div class="error">Your quiz name is not long enough</div>
        {/if}
    </div>
    {#each quiz.questions as question, i} 
    <div class="wrap_question">
        <div class="wrap_input_container">
                <div class="inputElement">
                    <label for="text">
                        Question {i+1}
                    </label>
                    <textarea id="text" bind:value={quiz.questions[i].questionContent} ></textarea>
                </div>
                {#if showError(quiz.questions[i].questionContent) }
                    <div class="error">Your question is not long enough</div>
                {/if}
            </div>

            <div class="wrap_input_container">
                <div class="inputElement">
                    <label for="lastName">
                        Correct answer
                    </label>
                        <textarea id="lastName" bind:value={quiz.questions[i].questionAnswer} name="questionAnswer"></textarea>
                </div>
                {#if showError(quiz.questions[i].questionAnswer) }
                    <div class="error">Your answer is not long enough</div>
                {/if}
            </div>

            <div id="filter_container">
                <div class="container_left_side">
                    <label for="questionDifficulty">Choose question difficulty</label>
                    <select bind:value={quiz.questions[i].questionDifficulty} name="questionDifficulty">
                        {#each difficultyLevel as level}
                            <option value={level.value}>
                                {level.text}
                            </option>
                        {/each}
                    </select>
                </div>
                <button class="remove_question_button orange_button" on:click={() => removeQuestion(quiz.questions[i].questionID) } >Remove question</button>
            </div>
            {#if quiz.questions[i].questionDifficulty === "0" }
			    <div class="error">Please select difficulty</div>
		    {/if}
    </div>
    {/each}
    {#if addNewQuestion}
        <div class="add_new_question">
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
            </div>
        </div>
    {/if}
    <button on:click={ addQuestion } class="add_question_button">╋ &nbsp;  Add question</button>
    {#if quiz.questions.length > 1 && canEditQuiz}
		<button on:click={ editQuiz } class="purple_button">Edit quiz</button>
	{/if}
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}


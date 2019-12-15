<script>
    import jq from "jquery";

    const basicURL = 'https://aqueous-escarpment-49631.herokuapp.com/apis/';

    export let quizID;
    
    const getQuestions = async () => {
		const quiz = await jq.ajax({
            type: 'GET',
			url: basicURL + `api-get-quiz-questions.php`,
			dataType: "json",
			data: {
                quizID: quizID,
				token: localStorage.token
			},
			success: (data) => {
                return data;
			}
		});
		if (quiz) {
			return quiz;
		} else {
            throw new Error();
		}
	}

    const promiseQuestions = getQuestions();
    
    function checkQuiz(){
        promiseQuestions.then((questions) => {
            console.log(questions);
        })
    }

</script>
<style>
    .question_container{
        border: 1px solid rgba(2, 2, 2, 0.1);
        padding: 1rem;
        border-radius: 4px;
        margin: .5rem 0;
    }

    .question_title, .question_content{
        margin-bottom: 1rem;
    }

    .question_title{
        color: purple;
        font-weight: bold;
    }

    .question_answer{
        width: 100%;
        padding: .35rem .7rem;
        border-radius: 4px;
    }

    .purple_button {
        width: 100%;
        margin: 1rem 0;
    }
</style>

{#await promiseQuestions}
    <div class="loading_spinner">...waiting (spinner)</div>
{:then quiz}
	{#each quiz.questions as question, i} 
        <div class="question_container">
            <div class="question_title">Question {i + 1}</div>
            <div class="question_content">{question.questionContent}</div>
            <input class="question_answer" type="text" placeholder="Enter your answer here">
        </div>
    {/each}
    <button class="purple_button" on:click={checkQuiz}>Submit</button>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}


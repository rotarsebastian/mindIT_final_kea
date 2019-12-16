<script>
	import jq from "jquery";
    import CreateQuiz from "./CreateQuiz.svelte";

    const urlParams = new URLSearchParams(window.location.search);
    const quiz_id = urlParams.get('id');
    const basicURL = 'https://aqueous-escarpment-49631.herokuapp.com/apis/';
    
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
                return data;
			}
		});
		if (quiz) {
            console.log(quiz);
			return quiz;
		} else {
            throw new Error();
		}
	}

	const promiseQuiz = getQuiz();

</script>
<style></style>

{#await promiseQuiz}
    <div class="loading_spinner">...waiting (spinner)</div>
{:then quiz}
    <div>da</div>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}


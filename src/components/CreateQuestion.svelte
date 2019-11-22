<style>
    .inputElement{
		display: flex;
		justify-content: space-between;
		width: 300px;
		height: auto;
	}
</style>

<script context="module">    
    import axios from "axios";
	const basicURL = 'https://aqueous-escarpment-49631.herokuapp.com/apis/';

    export const addRiddle = () => {
        const arrayOfQuestions = [{riddleContentValue: riddleContentValue, riddleAnswerValue: riddleAnswerValue, riddleDifficultyValue:riddleDifficultyValue}];
        console.log(arrayOfQuestions);
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

	export let riddleContentValue, riddleAnswerValue, riddleDifficultyValue;
</script>

<div class="question">

    <div class="inputElement">
        <label for="text">
            Question
        </label>
        <input id="text" bind:value={riddleContentValue}>
    </div>

    <div class="inputElement">
        <label for="lastName">
            Answer
        </label>
        <input id="lastName" bind:value={riddleAnswerValue}>
    </div>

    <div class="inputElement">
        <label for="email">
            Dificulty
        </label>
        <input id="email" bind:value={riddleDifficultyValue}>
    </div>

</div>
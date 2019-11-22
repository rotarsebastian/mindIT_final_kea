<script>
	import CreateQuestion, { addRiddle } from '../components/CreateQuestion.svelte';

	let question;

	const addQuestion = () => {
		// const child = document.createElement(new CreateQuestion);
		// child.textContent = 'child';
		// question.appendChild(child);
	}

</script>
<style>
</style>

<h1>This is Create quiz page</h1>

<div class="questions" bind:this={ question }  >
	<CreateQuestion/>
</div>


<button on:click={ addQuestion }>Add question</button>

<button on:click={ addRiddle }>Create quiz</button>
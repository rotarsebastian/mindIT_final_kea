<script>
	import axios from "axios";
	import jq from "jquery";
	import Riddle from './components/Riddle.svelte';

	const basicURL = 'https://aqueous-escarpment-49631.herokuapp.com/apis/';
	const promiseRiddles = getData();

	async function getData() {
		const riddlesArray = await axios.get(basicURL + 'api-get-riddles.php').then(response => {return response.data;});
		if (riddlesArray) {
			return riddlesArray;
		} else {
			throw new Error();
		}
	}
		
	const addRiddle = () => {
		console.log(riddle_content_value, riddle_answer_value, riddle_entry_value, riddle_duration_value);
		axios.post(basicURL + 'api-create-riddle.php', {
			riddle_content: riddle_content_value,
			riddle_answer: riddle_answer_value,
			riddle_entry: riddle_entry_value,
			riddle_duration: riddle_duration_value
		})
		.then(function (response) {
			console.log(response.data);
		})
		.catch(function (error) {
			console.log(error);
		});
	};

	let riddle_content_value, riddle_answer_value, riddle_entry_value, riddle_duration_value = '';

</script>

<!-- ****************************************************** -->
<!-- ************************Styles************************ -->
<!-- ****************************************************** -->

<style>
	.inputElement{
		display: flex;
		justify-content: space-between;
		width: 300px;
		height: auto;
	}
</style>

<!-- ****************************************************** -->
<!-- ************************HTML************************** -->
<!-- ****************************************************** -->

<div class="inputElement">
	<label for="text">
		Riddle Text
	</label>
	<input id="text" bind:value={riddle_content_value}>
</div>

<div class="inputElement">
	<label for="lastName">
		Answer
	</label>
	<input id="lastName" bind:value={riddle_answer_value}>
</div>

<div class="inputElement">
	<label for="email">
		Entry
	</label>
	<input id="email" bind:value={riddle_entry_value}>
</div>

<div class="inputElement">
	<label for="email">
		Duration
	</label>
	<input id="email" bind:value={riddle_duration_value}>
</div>

<button on:click={addRiddle}>Add riddle</button>

{#await promiseRiddles}
	<p>...waiting</p>
{:then riddles}
	{#each riddles as [ riddle_id, content, author, answer, createdAt, finishesAt, price ], i} 
		<Riddle>
			<div>{content}</div>
			<div>Created at: {createdAt}</div>
		</Riddle>
	{/each}
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}





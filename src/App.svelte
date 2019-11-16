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
		console.log(text, lastName, email);
		axios.post(basicURL + 'api-create-riddle.php', {
			riddle_text: text,
			lastName: lastName,
			email: email
		})
		.then(function (response) {
			console.log(response.data);
		})
		.catch(function (error) {
			console.log(error);
		});
	};

	let name = 'world';
	let text = '';
	let lastName = '';
	let email = '';

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

<h1>Hello {name}!</h1>

<div class="inputElement">
	<label for="text">
		Riddle Text
	</label>
	<input id="text" bind:value={text}>
</div>

<div class="inputElement">
	<label for="lastName">
		Last name
	</label>
	<input id="lastName" bind:value={lastName}>
</div>

<div class="inputElement">
	<label for="email">
		Email
	</label>
	<input id="email" bind:value={email}>
</div>

<button on:click={addRiddle}>Add riddle</button>

{#await promiseRiddles}
	<p>...waiting</p>
{:then riddles}
	{#each riddles as [ id, text, lastName, email, createdAt ], i} 
		<Riddle>
			<div>{text}</div>
			<div>{lastName}</div>
			<div>{email}</div>
			<div>Created at: {createdAt}</div>
		</Riddle>
	{/each}
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}





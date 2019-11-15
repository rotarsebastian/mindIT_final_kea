<script>
	import axios from "axios";
	import jq from "jquery";

	const basicURL = 'https://aqueous-escarpment-49631.herokuapp.com/apis/';

	const getData = () => {
		axios.get(basicURL + 'api-get-riddles.php').then(response => console.log(response.data));
	};

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

	getData();
	
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
<script>
	import axios from "axios";
	import jq from "jquery";

	const basicURL = 'https://aqueous-escarpment-49631.herokuapp.com/apis/';

	const getData = () => {
		axios.get(basicURL + 'api-get-riddles.php').then(response => console.log(response.data));
	};

	const addRiddle = () => {
		axios.post(basicURL + 'api-create-riddle.php', {
			riddle_text: 'riddle3',
			lastName: 'Flintstone',
			email: 'c@c.com'
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
</script>

<h1>Hello {name}!</h1>
<button on:click={addRiddle}>Add riddle</button>
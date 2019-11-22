<script>
    import { onDestroy } from 'svelte';
    import axios from "axios";
	import jq from "jquery";
	import Riddle from '../components/Riddle.svelte';

	const basicURL = 'https://aqueous-escarpment-49631.herokuapp.com/apis/',
		promiseRiddles = getData();

	async function getData() {
		const limit = 2;
		const riddlesArray = await axios.get(basicURL + `api-get-riddles.php?limit=${limit}`).then(response => {return response.data;});
		if (riddlesArray) {
			return riddlesArray;
		} else {
			throw new Error();
		}
	}

</script>

<style></style>

<!-- Page component updates here -->

{#await promiseRiddles}
    <p>...waiting (spinner)</p>
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


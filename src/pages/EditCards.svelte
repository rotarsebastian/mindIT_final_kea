<script>
    import jq from "jquery";
	import toastr from "toastr";
    import { curRoute } from '../routing/router.js';

	const basicURL = 'https://aqueous-escarpment-49631.herokuapp.com/apis/';
    let cardsData = {};
    
	const getUserCards = async () => {
		const cards = await jq.ajax({
            type: 'GET',
			url: basicURL + 'api-get-user-cards.php',
			dataType: "json",
			data: {
				token: localStorage.token
			},
			success: (data) => {
                cardsData = data;
                cardsData.forEach(card => {
                    card.number = card.number.replace(/(\d{4})/g, '$1 ').replace(/(^\s+|\s+$)/,'');
                    card.number = card.number.replace(/^.{9}/g, '**** ****');      
                });
                console.log(cardsData);
                // return cardsData;
			},
			error: error => {
				console.log(error);
			}
		});
		if (cards) {
			return cards;
		} else {
            throw new Error();
		}
    }
    
    let promiseCards = getUserCards();

</script>

<style>

</style>

{#await promiseCards}
    <div class="loading_spinner">...waiting (spinner)</div>
{:then cards}
    <div class="page_title">Edit cards</div>
    <div>cards</div>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
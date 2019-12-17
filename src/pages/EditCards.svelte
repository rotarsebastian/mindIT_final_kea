<script>
    import jq from "jquery";
	import toastr from "toastr";
    import { curRoute } from '../routing/router.js';

	const basicURL = 'https://aqueous-escarpment-49631.herokuapp.com/apis/';
    let cardsData = {};

    let cardNumberWasTouched = false, expDateWasTouched = false, CVVWasTouched = false, triedWithEmpty = false;

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

    const setFirstTouched = (input) => {
		if(input === 'cardNumber') {cardNumberWasTouched = true};
		if(input === 'expDate') {expDateWasTouched = true};
		if(input === 'CVV') {CVVWasTouched = true};
	}

	const validateInput = (elmValue, input) => {
		let isValid = false;
		triedWithEmpty = false;
		switch(input) {
			case 'cardNumber':
				isValid = (elmValue.replace(/ /g,'').length === 16 && /^\d+$/.test(elmValue)) ? true : false;
				break;
			case 'expDate':
				isValid = (elmValue.replace(/ /g,'').length === 7 && /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(elmValue.replace(/ /g,''))) ? true : false;
				break;
			case 'CVV':
				isValid = (elmValue.replace(/ /g,'').length === 3 && /^\d+$/.test(elmValue.replace(/ /g,''))) ? true : false;
				break;
			default:
				console.log(`VALIDATION FAILED: no validation for: ${input}`);
				break;
		}
		return isValid;
    }
    
    const toEditCard = (card_id) => {

    }

</script>

<style>
.primary_card{
    color: green;
    margin-top: .35rem;
    padding-left: .3rem;
    font-size: 13px;
    margin-bottom: 1.4rem;
}

input{
    width: auto;
}

.primary{
    background: rgba(13, 119, 13, 0.137);
    border: none;
}

.row {
    border-radius: 10px;
    border: 1px solid rgba(128, 0, 128, 0.322);
}

.purple_button, .orange_button {
    width: 90%;
}
.wrap_input_container{
    height: auto;
}
</style>

{#await promiseCards}
    <div class="loading_spinner">...waiting (spinner)</div>
{:then cards}
    <div class="page_title">Edit cards</div>

    <div class="edit_cards_container">
        {#each cards as card}
        <div class='page_wrapper'>
		    <div class='row' class:primary="{card.isPrimary === 1}">
			    <div class='column'>
                    <div class="wrap_input_container">
                        <div class="inputElement">
                            <label for="text">
                                Card number
                            </label>
                            <input class="readonly_input card_number" type="text" bind:value={card.number} readonly />
                        </div>
                    </div>
                </div>
                <div class='column'>
                    <div class="wrap_input_container">
                        <div class="inputElement">
                            <label for="text">
                                Expiration date
                            </label>
                            <input type="text" bind:value={card.expDate} placeholder="ex. 03/2019" on:input={() => setFirstTouched('expDate')} />
                        </div>
                        {#if (!(validateInput(card.expDate, 'expDate')) && expDateWasTouched) || (!(validateInput(card.expDate, 'expDate')) && triedWithEmpty) }
                            <div class="error">Your credit card exp date is not not valid</div>
                        {/if}
                    </div>
                    <div class="wrap_input_container">
                        <div class="wrap_buttons_edit_cards">
                            <button class="purple_button edit_card_button" on:click={toEditCard}>Edit card</button>
                        </div>
				    </div>
                </div>
                <div class='column'>
                    <div class="wrap_input_container">
                        <div class="inputElement">
                            <label for="text">
                                CVV
                            </label>
                            <input type="text" bind:value={card.CVV} placeholder="ex. 865" on:input={() => setFirstTouched('CVV')} />
                        </div>
                        {#if (!(validateInput(card.CVV, 'CVV')) && CVVWasTouched) || (!(validateInput(card.CVV, 'CVV')) && triedWithEmpty) }
                            <div class="error">Your credit card CVV is not not valid (ex. 865)</div>
                        {/if}
                    </div>
                    <div class="wrap_input_container">
                        <div class="wrap_buttons_edit_cards">
                            <button class="orange_button">Delete card</button>
                        </div>
				</div>
                </div>
		    </div>
        </div>
        {#if card.isPrimary === 1}
            <div class="primary_card">This card is your primary card</div>
        {/if}
        {/each}
    </div>  
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
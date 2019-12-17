<script>
	import jq from "jquery";
	import toastr from "toastr";
    import { curRoute } from '../routing/router.js';

	const basicURL = 'https://aqueous-escarpment-49631.herokuapp.com/apis/';
	let userData = {};

	let firstNameWasTouched = false, lastNameWasTouched = false, usernameWasTouched = false, passwordWasTouched = false, addressWasTouched = false,
		postalCodeWasTouched = false, phoneWasTouched = false, cityWasTouched = false, triedWithEmpty = false;

    toastr.options = {
		"positionClass": "toast-bottom-right",
		"preventDuplicates": true,
    }

	const getUserDetails = async () => {
		const user = await jq.ajax({
            type: 'GET',
			url: basicURL + 'api-get-user-details.php',
			dataType: "json",
			data: {
				token: localStorage.token
			},
			success: (data) => {
				userData = data;
				userData.password = '';
				const primaryCardArray = userData.creditCards.filter((card) => { return card.isPrimary === 1} );
				userData.primaryCard = primaryCardArray[0];
				userData.primaryCard.number = userData.primaryCard.number.replace(/(\d{4})/g, '$1 ').replace(/(^\s+|\s+$)/,'');
				userData.primaryCard.number = userData.primaryCard.number.replace(/^.{14}/g, '**** **** ****');
				delete userData.creditCards;
				if(userData.phone === '0'){userData.phone = ''};
				if(userData.postalCode === '0'){userData.postalCode = ''};
				console.log(userData);
                return userData;
			},
			error: error => {
				console.log(error);
			}
		});
		if (user) {
			return user;
		} else {
            throw new Error();
		}
	}

	let promiseUser = getUserDetails();
	
	const areThereErrors = () => { return jq('.error').length > 0 ? true : false }

	const setFirstTouched = (input) => {
		if(input === 'firstName') {firstNameWasTouched = true};
		if(input === 'lastName') {lastNameWasTouched = true};
		if(input === 'username') {usernameWasTouched = true};
		if(input === 'password') {passwordWasTouched = true};
		if(input === 'address') {addressWasTouched = true};
		if(input === 'postalCode') {postalCodeWasTouched = true};
		if(input === 'phone') {phoneWasTouched = true};
		if(input === 'city') {cityWasTouched = true};
	}

	const validateInput = (elmValue, input) => {
		let isValid = false;
		triedWithEmpty = false;
		switch(input) {
			case 'firstName':
				isValid = elmValue.length > 1;
				break;
			case 'lastName':
				isValid = elmValue.length > 1;
				break;
			case 'username':
				isValid = elmValue.length > 1;
				break;
			case 'password':
				isValid = elmValue.length > 5;
				break;
			case 'address':
				isValid = elmValue.length > 1;
				break;
			case 'postalCode':
				isValid = (elmValue.length === 4 && /^\d+$/.test(elmValue)) ? true : false;
				break;
			case 'phone':
				isValid = (elmValue.length === 8) ? true : false;
				break;
			case 'city':
				isValid = elmValue.length > 1;
				break;
			default:
				console.log(`VALIDATION FAILED: no validation for: ${input}`);
				break;
		}
		return isValid;
	}

	const toEditCards = () => {
		curRoute.set('/edit-cards');
		window.history.pushState({path: '/edit-cards'}, '', window.location.origin + '/edit-cards');
	}

</script>

<style>
.page_wrapper{
  display: flex;
  margin: 0;
  padding: 0;
}

.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}

.column {
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
}

.wrap_input_container{
	height: 110px;
	padding: 10px;
}

.wrap_buttons{
	display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin-top: 13px;
}

.edit_card_button{
	background: transparent;
    border: 1px solid #8000808a;
    color: #8000808a;
}

.edit_card_button:hover{
	background: purple;
	color: white;
}

.purple_button, .orange_button{
	width: 100%;
	padding: 0.4em 0.7rem;
}

</style>

{#await promiseUser}
    <div class="loading_spinner">...waiting (spinner)</div>
{:then user}
	<div class="page_title">Your profile</div>
	
	<div class='page_wrapper'>
		<div class='row'>
			<div class='column'>
				<div class="wrap_input_container">
					<div class="inputElement">
						<label for="text">
							First name
						</label>
						<input type="text" bind:value={user.firstName} placeholder="First name" on:input={() => setFirstTouched('firstName')} />
					</div>
					{#if (!(validateInput(user.firstName, 'firstName')) && firstNameWasTouched) || (!(validateInput(user.firstName, 'firstName')) && triedWithEmpty) }
						<div class="error">Your first name is not long enough</div>
					{/if}
				</div>
				<div class="wrap_input_container">
					<div class="inputElement">
						<label for="text">
							Last name
						</label>
						<input type="text" bind:value={user.lastName} placeholder="Last name" on:input={() => setFirstTouched('lastName')} />
					</div>
					{#if (!(validateInput(user.lastName, 'lastName')) && lastNameWasTouched) || (!(validateInput(user.lastName, 'lastName')) && triedWithEmpty) }
						<div class="error">Your last name is not long enough</div>
					{/if}
				</div>
				<div class="wrap_input_container">
					<div class="inputElement">
						<label for="text">
							Username
						</label>
						<input type="text" bind:value={user.username} placeholder="Username" on:input={() => setFirstTouched('username')} />
					</div>
					{#if (!(validateInput(user.username, 'username')) && usernameWasTouched) || (!(validateInput(user.username, 'username')) && triedWithEmpty) }
						<div class="error">Your username is not long enough</div>
					{/if}
				</div>
				<div class="wrap_input_container">
					<div class="inputElement">
						<label for="text">
							Password
						</label>
						<input type="password" bind:value={user.password} placeholder="Password" on:input={() => setFirstTouched('password')} />
					</div>
					{#if (!(validateInput(user.password, 'password')) && passwordWasTouched) || (!(validateInput(user.password, 'password')) && triedWithEmpty) }
						<div class="error">Your password is not long enough</div>
					{/if}
				</div>
			</div>
			<div class='column'>
				<div class="wrap_input_container">
					<div class="inputElement">
						<label for="text">
							Address (Street, number)
						</label>
						<input type="text" bind:value={user.address} placeholder="Address" on:input={() => setFirstTouched('address')} />
					</div>
					{#if (!(validateInput(user.address, 'address')) && addressWasTouched) || (!(validateInput(user.address, 'address')) && triedWithEmpty) }
						<div class="error">Your address is not long enough</div>
					{/if}
				</div>
				<div class="wrap_input_container">
					<div class="inputElement">
						<label for="text">
							Postal code
						</label>
						<input type="text" bind:value={user.postalCode} placeholder="Postal code" on:input={() => setFirstTouched('postalCode')} />
					</div>
					{#if (!(validateInput(user.postalCode, 'postalCode')) && postalCodeWasTouched) || (!(validateInput(user.postalCode, 'postalCode')) && triedWithEmpty) }
						<div class="error">Your postal code is not not valid</div>
					{/if}
				</div>
				<div class="wrap_input_container">
					<div class="inputElement">
						<label for="text">
							Primary credit card
						</label>
						<input class="readonly_input" type="text" bind:value={user.primaryCard.number} readonly />
					</div>
				</div>
				<div class="wrap_input_container">
					<div class="wrap_buttons">
						<button class="purple_button">Edit profile</button>
					</div>
				</div>
			</div>
			<div class='column'>
				<div class="wrap_input_container">
					<div class="inputElement">
						<label for="text">
							Phone number
						</label>
						<input type="text" bind:value={user.phone} placeholder="Phone number" on:input={() => setFirstTouched('phone')} />
					</div>
					{#if (!(validateInput(user.phone, 'phone')) && phoneWasTouched) || (!(validateInput(user.phone, 'phone')) && triedWithEmpty) }
						<div class="error">Your phone is not valid</div>
					{/if}
				</div>
				<div class="wrap_input_container">
					<div class="inputElement">
						<label for="text">
							City
						</label>
						<input type="text" bind:value={user.city} placeholder="City" on:input={() => setFirstTouched('city')} />
					</div>
					{#if (!(validateInput(user.city, 'city')) && cityWasTouched) || (!(validateInput(user.city, 'city')) && triedWithEmpty) }
						<div class="error">Your city is not long enough</div>
					{/if}
				</div>
				<div class="wrap_input_container">
					<div class="wrap_buttons">
						<button class="purple_button edit_card_button" on:click={toEditCards}>Edit cards</button>
					</div>
				</div>
				<div class="wrap_input_container">
					<div class="wrap_buttons">
						<button class="orange_button">Delete profile</button>
					</div>
				</div>
			</div>
		</div>
	</div>

{:catch error}
	<p style="color: red">{error.message}</p>
{/await}



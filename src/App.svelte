<script>
	import Header from './components/Header.svelte';
	import router, { curRoute } from './routing/router.js';
	import { onMount } from 'svelte';
	import jq from "jquery";


	onMount(() => {
		curRoute.set(window.location.pathname);
		if (!history.state) {
			window.history.replaceState({path: window.location.pathname}, '',   window.location.href)
		}
	})

	function isAuthOrLoginPage() {
		return (window.location.pathname === '/login' || window.location.pathname === '/signup') ? true : false;
	}

	async function isUserLoggedIn() {
		if(!localStorage.token){
			curRoute.set('/login');
			window.history.pushState({path: '/login'}, '', window.location.origin + '/login');
			return false;
		}
		if( await promiseCheckUser ){
			return allowUser ? true : false;
		}
	}

	const basicURL = 'https://aqueous-escarpment-49631.herokuapp.com/apis/';

	const isUserLogged = async () => {
		const response = await jq.ajax({
			type: 'GET',
			url: basicURL + "app_client.php",
			dataType: "json",
			data: {
				token: localStorage.token
			},
			success: (data) => {
				if (typeof data['userID'] !== 'undefined') {
					var alertMessage = 'You have a valid token! Here is your user Id: ' + data['userID'];
					console.log(alertMessage);
					allowUser = true;
				} 
				else if (typeof data['error'] !== 'undefined') {
					console.log('Error: ' + data['error']);
				}
				else {
					console.log('Error: Your request has failed.');
				}
			}
        });
	}

	let allowUser = false;
	const promiseCheckUser = isUserLogged();
	const sourceImage = './assets/images/test.png';

</script>

<!-- ****************************************************** -->
<!-- ************************Styles************************ -->
<!-- ****************************************************** -->

<style>
#pageContent{
	width: 100%;
	padding: .5rem;
}
</style>
<!-- ****************************************************** -->
<!-- ************************HTML************************** -->
<!-- ****************************************************** -->


{#if isUserLoggedIn() }
	{#if !isAuthOrLoginPage()}
		<Header></Header>
	{/if}

	<div id="pageContent">
		<!-- Page component updates here -->
		<svelte:component this={router[$curRoute]} />
	</div>

{:else if !isUserLoggedIn()}
	<svelte:component this={router[$curRoute]} />
{/if}











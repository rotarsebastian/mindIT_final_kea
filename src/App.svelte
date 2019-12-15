<script>
	import Header from './components/Header.svelte';
	import router, { curRoute } from './routing/router.js';
	import { onMount } from 'svelte';
	import jq from "jquery";

	let showHeader = true;

	onMount(async () => {
		if(!localStorage.token){
			curRoute.set('/login');
			window.history.pushState({path: '/login'}, '', window.location.origin + '/login');
			return false;
		}
		await promiseCheckUser;
		if(window.location.pathname === '/login' || window.location.pathname === '/signup') {
			if(allowUser) {
				showHeader = true;
				curRoute.set('/home');
				window.history.pushState({path: '/home'}, '', window.location.origin + '/home');
			} else {
				curRoute.set(window.location.pathname);
				window.history.pushState({path: '/login'}, '', window.location.origin + '/login');
				showHeader = false;
			}
		}
		if(!allowUser) {
			curRoute.set('/login');
			window.history.pushState({path: '/login'}, '', window.location.origin + '/login');
			showHeader = false;
		}
		curRoute.set(window.location.pathname);
		if (!history.state) {
			window.history.replaceState({path: window.location.pathname}, '',   window.location.href)
		}
	})

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
	padding: 0 18%;
	margin-top: 6rem;
}
</style>
<!-- ****************************************************** -->
<!-- ************************HTML************************** -->
<!-- ****************************************************** -->


{#if allowUser }
	{#if showHeader}
		<Header></Header>
	{/if}
	<div id="pageContent">
		<!-- Page component updates here -->
		<svelte:component this={router[$curRoute]} />
	</div>

{/if}

{#if !allowUser}
	<svelte:component this={router[$curRoute]} />
{/if}









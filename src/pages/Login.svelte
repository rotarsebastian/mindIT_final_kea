<script>
    import jq from "jquery";
    import { curRoute } from '../routing/router.js';


    const basicURL = 'https://aqueous-escarpment-49631.herokuapp.com/apis/';

	let user_emailOrUsername = 'admin_sebi', user_password = 'sebi1234';

    jq(document).ready(function() {
        // jq('#test').click(function() {
        //     jq.ajax({
        //         type: 'GET',
        //         url: basicURL + "app_client.php",
        //         dataType: "json",
        //         data: {
        //             token: localStorage.token
        //         },
        //         success: function(data) {
        //             console.log(data);
        //             if (typeof data['userID'] !== 'undefined') {
        //                 var alertMessage = 'You have a valid token! Here is your user Id: ' + data['userID'];
        //                 if (typeof data['exp'] !== 'undefined') {
        //                     alertMessage = alertMessage + ' and your token expires: ' + data['exp'];
        //                 }
        //                 alert(alertMessage);
        //             } 
        //             else if (typeof data['error'] !== 'undefined') {
        //                 alert('Error: ' + data['error']);
        //             }
        //             else {
        //                 alert('Error: Your request has failed.');
        //             }
        //         }
        //     });
        // });
        // jq('#goodLogin').click(function() {
        //     jq.ajax({
        //         type: "POST",
        //         url: basicURL + "app_client.php",
        //         dataType: "json",
        //         data: {
        //             username: "john.doe",
        //             password: "foobar"
        //         },
        //         success: function(data) {
        //         localStorage.token = data['token'];
        //         alert('Successfully retrieved token from the server! Token: ' + data['token']);
        //         },
        //         error: function() {
        //             alert("Error: Login Failed");
        //         }
        //     });
        // });
        
        // jq('#badLogin').click(function() {
        //     jq.ajax({
        //         type: "POST",
        //         url: basicURL + "app_client.php",
        //         dataType: "json",
        //         data: {
        //         username: "john.doe",
        //         password: "foobarfoobar"
        //         },
        //         success: function(data) {
        //             if (typeof data['error'] !== 'undefined') {
        //                 alert('Error: ' + data['error']);
        //                 localStorage.clear();
        //             }
        //         },
        //         error: function() {
        //         alert('Error: Your request has failed.');
        //         }
        //     });
        // });
        jq('#logout').click(function() {
            localStorage.clear();
        });
     });

    
    
    const login = () => {
        jq.ajax({
            type: "POST",
            url: basicURL + "api-login.php",
            dataType: "json",
            data: {
                user_emailOrUsername: user_emailOrUsername,
                user_password: user_password
            },
            success: function(data) {
                console.log(data, data['token']);
                localStorage.token = data['token'];
                localStorage.userName = data['userName'];
                window.location.href = '/home';
                curRoute.set('/home');
		        window.history.pushState({path: '/home'}, '', window.location.origin + '/home');
            },
            error: function() {
                alert("Error: Login Failed");
            }
        });
    };
	
	const showError = (value) => {
		if( value.length <= 5 && value.length > 0 ) {
			return true;
		} 
		return false;
	}

</script>
<style>
  	.form_container {
		width: 100vw;
	}

	.error {
		color: red;
		font-size: 0.7rem;
    	margin: .5rem 0;
	}
</style>

<h1>This is Login page</h1>

<div class="page_content">
	<div class="form_container">
		<div class="inputElement">
			<label for="text">
				Username or email
			</label>
			<input id="text" bind:value={user_emailOrUsername} />
		</div>
		{#if showError(user_emailOrUsername) }
			<div class="error">Not long enough</div>
		{/if}

		<div class="inputElement">
			<label for="lastName">
				Password
			</label>
				<input id="lastName" bind:value={user_password} name="password" />
		</div>
		{#if showError(user_password) }
			<div class="error">Not long enough</div>
		{/if}

        <!-- <button on:click={ login }>Login</button> -->
        <button id="myLogin" on:click={ login }>My login</button>
        <!-- <button id="goodLogin">Login</button>
        <button id="test">Test</button>
        <button id="badLogin">Bad Login</button> -->
        <button id="logout">Logout</button>
	</div>
</div>


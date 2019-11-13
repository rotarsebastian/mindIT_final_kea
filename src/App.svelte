<script>
	import axios from "axios";
	import jq from "jquery";


	const getData = () => {
		// axios.get('https://raw.githubusercontent.com/rotarsebastian/node-task/master/data.json').then(response => console.log(response.data));
		axios.get('http://localhost:8080/backend/apis/api-get-riddles.php').then(response => console.log(response.data));
	};

	getData();

	// 	getNewsfeed(query: any = {}): Observable<any> {
	//     const { page = 1, limit = 10 } = query;
	//     const url = `${this.baseUrl}/${this.organizationId}/newsfeed-v2`;
	//     return this.http.get<any>(url, { params: { page, limit } });
	//   }
	
	let name = 'world';
</script>

<h1>Hello {name}!</h1>
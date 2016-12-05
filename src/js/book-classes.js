const URL = 'http://apis.baidu.com/tngou/book/classify'
const KEY = 'e0284796cc5fffc0f276b885e4fb3759'

let vm = new Vue({
	el: '#app',
	data: {
		classes: []
	},
	created () {
		let that = this

		$.ajax({
			url: URL,
			dataType: 'json',
			method: 'get',
			headers: {apikey: KEY},
			success (r) {
				if (r.status) that.classes = r.tngou
			}
		})
	}
})
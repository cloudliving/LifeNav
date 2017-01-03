const URL = 'http://apis.baidu.com/tngou/book/classify'
const KEY = 'e0284796cc5fffc0f276b885e4fb3759'

let vm = new Vue({
	el: '#app',
	data: {
		classes: []
	},
	methods: {
		getPath (filename) {
			return this.isServer ? 
			`http://cloudliving-img.b0.upaiyun.com/static/Home/fruit/images/books/${filename}.png`
			: `../images/books/${filename}.png`
		}
	},
	created () {
		let that = this
		that.isServer = !!location.hostname && location.hostname != 'localhost'

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
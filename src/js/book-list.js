const URL = 'http://apis.baidu.com/tngou/book/list'
const KEY = 'e0284796cc5fffc0f276b885e4fb3759'
const IMGURL = 'http://tnfs.tngou.net/image'
const ROWS = 10
const ID = parser().id

let vm = new Vue({
	el: '#app',
	data: {
		list: [],
		curPage: 1,
		allPage: 1,
		loading: false,
		pages: []
	},
	methods: {
		load () {
			let that = this

			$.ajax({
				url: URL,
				method: 'get',
				data: {id: ID, page: that.curPage, rows: ROWS},
				dataType: 'json',
				headers: {apikey: KEY},
				beforeSend () {
					that.loading = true
					that.list = []
				},
				success (r) {
					if (r.status) {
						that.allPage != r.totalpage && (that.allPage = r.totalpage)
						that.list = r.list
					}
					that.loading = false
				},
				error (error) {
					that.loading = false
					alert('出错啦')
				}
			})
		},
		click (id) {
			this.curPage = id
			this.load()
		},
		prev () {
			if (this.curPage <= 1) return
			this.curPage--	
			this.load()
		},
		next () {
			if (this.curPage >= this.allPage) return
			this.curPage++
			this.load()
		}
	},
	created () {
		this.load()
	}
})



function parser () {
	let temp = {}

	location.search.slice(1).split('&').forEach(e => {
		let o = e.split('=')
		temp[o[0]] = o[1]
	})

	return temp
}
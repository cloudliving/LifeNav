const URL = 'http://apis.baidu.com/tngou/book/show'
const KEY = 'e0284796cc5fffc0f276b885e4fb3759'
const ID = parser().id


let vm = new Vue({
	el: '#app',
	data: {
		img: '',
		name: '',
		author: '',
		count: '',
		time: '',
		summary: '',
		list: [],
		loading: false,
		select: null,
		chapter: {}
	},
	methods: {
		read (item, index) {
			this.chapter = item
			this.select = index
		},
		next () {
			if (this.select >= this.max) {
				alert('没有了')
				return
			}
			this.chapter = this.list[++this.select]
			$('.book-detail-ctn').scrollTop(0)
		},
		prev () {
			if (this.select <= 0) {
				alert('没有了')
				return
			}
			this.chapter = this.list[--this.select]
			$('.book-detail-ctn').scrollTop(0)
		},
		back () {
			this.chapter = {}
		}
	},
	computed: {
		max () {
			return this.list.length
		}
	},
	created () {
		let that = this

		$.ajax({
			url: URL,
			method: 'get',
			data: {id: ID},
			dataType: 'json',
			headers: {apikey: KEY},
			beforeSend () {
				that.loading = true
			},
			success (r) {
				if (r.status) {
					that.img = r.img
					that.name = r.name
					that.author = r.author
					that.count = r.count
					that.time = moment(+r.time).format('YYYY-MM-DD')
					that.summary = r.summary
					that.list = r.list
				}
				that.loading = false
			},
			error (error) {
				that.loading = false
				alert('出错啦')
			}
		})
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

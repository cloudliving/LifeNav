const url = 'http://api.map.baidu.com/telematics/v3/weather?location=武汉&output=json&ak=FK9mkfdQsloEngodbFl4FeY3'

var vm = new Vue({
	el: '#app',
	data: {
		result: {
			currentCity: '',
			index: [],
			pm25: '',
			weather_data: []
		}
	},
	computed: {
		curTemp () {
				return this.result.weather_data.length && this.result.weather_data[0].date.match(/实时：(\d+)/)[1]
		},
		temp () {
			return this.result.weather_data.length && this.result.weather_data[0].temperature
		},
		date () {
			return this.result.weather_data.length && this.result.weather_data[0].date.split('(')[0]
		},
		future () {
			var array = this.result.weather_data
			var temp = []
			for (var i = 0; i < array.length; i++) {
				if (i!=0) {
					temp.push(array[i])
				}
			}
			return temp
		}
	},
	methods: {
		toIcon (str) {
			var className
			console.log(str)
			if (str.search('雨')>-1) {className = 'icon-xy'}
			else if (str.search('晴')>-1) {className = 'icon-qt'}
			else if (str.search('雪')>-1) {className = 'icon-xx'}
			else {className = 'icon-yt'}

			return `<span class="${className}"></span>`
		}
	}
})


function jsonp (url, func) {
	if (!window._jsonpCallBack) {
		window._jsonpCallBack = res => {
			func.call(null, res)
		}
	}
	var script = document.createElement('script')
	script.src = url+ '&callback=_jsonpCallBack'
	document.body.appendChild(script)
}


jsonp(url, function(e) {
	if (e.status === 'success') {
		vm.result = e.results[0]
	}
})
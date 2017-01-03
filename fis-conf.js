fis.set('project.ignore', [
		'.git/**',
		'node_modules/**',
		'output/**',
		'qietu/**',
		'.gitignore',
		'package.json',
		'fis-conf.js'
	])


fis
	.match('src/css/(*.styl)', {
		parser: 'stylus',
		preprocessor: fis.plugin('autoprefixer', {
			'browsers': ['last 2 versions', 'iOS 7']
		}),
		rExt: '.css',
		release: '/css/$1'
	})
	.match('src/images/(**)', {
		release: '/images/$1'
		// useHash: true
	})
	.match('src/js/(**)', {
		parser: fis.plugin('babel-5.x'),
		release: '/js/$1'
	})
	.match('src/lib/(**)', {
		release: '/lib/$1'
	})
	.match('src/view/(**)', {
		// parser: 'pug',
		parser: fis.plugin('pug', {
			pretty: true
		}),
		rExt: '.html',
		release: '/view/$1'
	})
	.match('src/mixin/(**)', {
		release: false
	})


fis
	.media('prod')
	.match('!*.pug', {
		domain: 'http://cloudliving-img.b0.upaiyun.com/static/Home/fruit'
	})
	.match('*.styl', {
		useHash: true,
		optimizer: fis.plugin('clean-css')
	})
	.match('*.js', {
		useHash: true,
		optimizer: fis.plugin('uglify-js')
	})
	.match('*.png', {
		optimizer: fis.plugin('png-compressor', {
	      type : 'pngquant'
	    })
	})

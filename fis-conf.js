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
	.match('*.pug', {
		parser: 'pug',
		rExt: '.html'
	})
	.match('src/js/*.js', {
		parser: fis.plugin('babel-5.x')
	})
	.match('*.styl', {
		parser: 'stylus',
		preprocessor: fis.plugin('autoprefixer', {
			'browsers': ['last 2 versions', 'iOS 7']
		}),
		rExt: '.css' 
	})


fis
	.media('prod')
	.match('!*.pug', {
		domain: 'http://cloudliving-img.b0.upaiyun.com/static/Home/lifeNav'
	})
	.match('*.styl', {
		optimizer: fis.plugin('clean-css')
	})
	.match('*.js', {
		optimizer: fis.plugin('uglify-js')
	})

	.match('*.png', {
		optimizer: fis.plugin('png-compressor', {
	      type : 'pngquant'
	    })
	})
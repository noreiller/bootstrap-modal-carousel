module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')

		, jshint: {
			all: ['Gruntfile.js', 'src/js/*.js']
			, options: {
				laxbreak: true
				, laxcomma: true
				, smarttabs: true
			}
		}

		, clean: {
			dist: ['dist']
		}

		, uglify: {
			nooptim: {
				options: {
					banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
					, beautify: true
					, compress: false
					, mangle: false
				}
				, files: {
					'dist/js/<%= pkg.name %>.js': ['src/js/*.js']
				}
			}
			, compile: {
				options: {
					banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
				}
				, files: {
					'dist/js/<%= pkg.name %>.min.js': ['src/js/*.js']
				}
			}
			, vendor: {
				files: {
					"dist/js/demo.min.js": [
						"bower_components/holderjs/holder.js"
					]
				}
			}
		}

		, less: {
			nooptim: {
				options: {
					banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
					, paths: ["src/less"]
				}
				, files: {
					"dist/css/<%= pkg.name %>.css": "src/less/*.less"
				}
			}
			, minify: {
				options: {
					banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
					, paths: ["src/less"]
					, cleancss: true
				}
				, files: {
					"dist/css/<%= pkg.name %>.min.css": "src/less/*.less"
				}
			}
		}

		, template: {
			handlebars: {
				engine: 'handlebars'
				, cwd: 'src/templates/'
				, partials: ['src/templates/partials/*.html']
				, data: 'src/templates/data/data.json'
				, options: {}
				, files: [
					{
						expand: true
						, cwd: 'src/templates'
						, src: '*.html'
						, dest: 'dist/'
						, ext: '.html'
					}
				]
			}
		}

		, watch: {
			templates: {
				files: [
					"src/templates/*"
					, "src/templates/**/*"
				]
				, tasks: ['template']
			}
			, scripts: {
				files: [
					"src/js/*.js"
				]
				, tasks: ['jshint', 'uglify']
			}
			, styles: {
				files: [
					"src/less/*"
				]
				, tasks: ['less']
			}
		}

		, 'gh-pages': {
			options: {
				base: 'dist'
			}
			, src: ['**']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-template-html');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-gh-pages');

	grunt.registerTask('build', ['jshint', 'clean', 'uglify', 'less', 'template']);
	grunt.registerTask('deploy', ['build', 'gh-pages']);
	grunt.registerTask('dev', ['build', 'watch']);

	grunt.registerTask('default', ['build']);
};

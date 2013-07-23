module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')

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
						, dest: 'docs/'
						, ext: '.html'
					}
				]
			}
		}

		, watch: {
			templates: {
				files: [
					"src/templates/*.html"
					, "src/templates/partials/*.html"
				]
				, tasks: ['template']
			}
		}
	});

	grunt.loadNpmTasks('grunt-template-html');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['template']);
};

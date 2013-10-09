(function ($) {
	// Load images via flickr for demonstration purposes:
	$.ajax({
		url: 'http://api.flickr.com/services/rest/',
		data: {
			format: 'json'
			, method: 'flickr.interestingness.getList'
			, api_key: '7b6adc01d126207c79f41b80383a22b8'
			, per_page: 1
			, extras: 'description, url_m'
		},
		dataType: 'jsonp',
		jsonp: 'jsoncallback'
	}).done(function (data) {
		$.each(data.photos.photo, function (index, photo) {
			if (photo.url_m) {
				$('#myContent')
					.append(
						$('<img />').prop({
							'src': photo.url_m
						})
						, $('<p>')
							.append('<strong>' + photo.title + '</strong>')
							.append('<br />')
							.append(photo.description._content)
					)
				;
			}
		});
	});
})(jQuery);

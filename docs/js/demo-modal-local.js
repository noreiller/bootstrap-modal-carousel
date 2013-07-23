(function ($) {
	// Load images via flickr for demonstration purposes:
	$.ajax({
		url: 'http://api.flickr.com/services/rest/',
		data: {
			format: 'json'
			, method: 'flickr.interestingness.getList'
			, api_key: '592e96960de6a476d84cff71a495867f'
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

(function ($) {
	// Hide the carousel while we load it from Flickr
	$('#myCarousel').hide();

	// Load images via flickr for demonstration purposes:
	$.ajax({
		url: 'http://api.flickr.com/services/rest/',
		data: {
			format: 'json'
			, method: 'flickr.interestingness.getList'
			, api_key: '592e96960de6a476d84cff71a495867f'
			, per_page: 10
			, extras: 'description, url_l, l_width, l_height'
		},
		dataType: 'jsonp',
		jsonp: 'jsoncallback'
	}).done(function (data) {
		var carouselInner = $('#myCarousel .carousel-inner');

		$.each(data.photos.photo, function (index, photo) {
			if (photo.url_l) {
				$('<div class="item"/>')
					.append(
						$('<img />').prop({
							'src': photo.url_l
						})
						, $('<div class="carousel-caption">')
							.append('<h4>' + photo.title + '</h4>')
							.append('<p>' + photo.description._content + '</p>')
					)
					.appendTo(carouselInner)
				;

				if (index == 0) {
					carouselInner.find('img:first').load(function () {
						// When the first image is loaded, display the carousel
						$('#myCarousel').show().carousel('fit');
					});
				}
			}
		});

		carouselInner.find('.item:first').addClass('active');
	});

	// Enable the modal fullscreen when clicking on the fullscreen button
	$('#myButtonFullscreen').on('click', function (e) {
		$('#myModal').addClass('modal-fullscreen');
	});

	// Disable the modal fullscreen when clicking on the modal button
	$('#myButtonModal').on('click', function (e) {
		$('#myModal').removeClass('modal-fullscreen');
	});
})(jQuery);

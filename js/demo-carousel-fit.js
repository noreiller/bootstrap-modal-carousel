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
			, extras: 'description, url_m, m_width, m_height'
		},
		dataType: 'jsonp',
		jsonp: 'jsoncallback'
	}).done(function (data) {
		var carouselInner = $('#myCarousel .carousel-inner');

		$.each(data.photos.photo, function (index, photo) {
			if (photo.url_m) {
				$('<div class="item"/>')
					.append(
						$('<img />').prop({
							'src': photo.url_m
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
					})
				}
			}
		});

		carouselInner.find('.item:first').addClass('active');
	});

	$('#myButtonCaptionActive').on('click', function (e) {
		$('#myButtonCaptionActive')
			.removeClass('btn-info')
			.addClass('btn-success')
		;
		$('#myButtonCaptionHover, #myButtonCaptionHide, #myButtonCaptionNone')
			.addClass('btn-info')
			.removeClass('btn-success')
		;
		$('#myCarousel')
			.removeClass('carousel-caption-hover carousel-caption-hide')
			.addClass('carousel-caption-active')
		;
	});

	$('#myButtonCaptionHover').on('click', function (e) {
		$('#myButtonCaptionHover')
			.removeClass('btn-info')
			.addClass('btn-success')
		;
		$('#myButtonCaptionActive, #myButtonCaptionHide, #myButtonCaptionNone')
			.addClass('btn-info')
			.removeClass('btn-success')
		;
		$('#myCarousel')
			.removeClass('carousel-caption-active carousel-caption-hide')
			.addClass('carousel-caption-hover')
		;
	});

	$('#myButtonCaptionHide').on('click', function (e) {
		$('#myButtonCaptionHide')
			.removeClass('btn-info')
			.addClass('btn-success')
		;
		$('#myButtonCaptionActive, #myButtonCaptionHover, #myButtonCaptionNone')
			.addClass('btn-info')
			.removeClass('btn-success')
		;
		$('#myCarousel')
			.removeClass('carousel-caption-active carousel-caption-hover')
			.addClass('carousel-caption-hide')
		;
	});

	$('#myButtonCaptionNone').on('click', function (e) {
		$('#myButtonCaptionNone')
			.removeClass('btn-info')
			.addClass('btn-success')
		;
		$('#myButtonCaptionActive, #myButtonCaptionHover, #myButtonCaptionHide')
			.addClass('btn-info')
			.removeClass('btn-success')
		;
		$('#myCarousel')
			.removeClass('carousel-caption-active carousel-caption-hover carousel-caption-hide')
		;
	});
})(jQuery);

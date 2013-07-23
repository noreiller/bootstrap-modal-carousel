(function (factory) {
	'use strict';
	if (typeof define === 'function' && define.amd) {
		// Register as an anonymous AMD module:
		define([
			'jquery',
			'bootstrap'
		], factory);
	} else {
		// Browser globals:
		factory(
			window.jQuery
		);
	}
}(function ($) {
	'use strict';

	$.extend($.fn.carousel.defaults, {
		modalize: false
	});

	$.extend($.fn.carousel.Constructor.prototype, {
		modalize: function () {
			if (this.options.modalize && !this.modalized) {
				this.$element
					.on('modal-hide modal-shown', function (event) {
						if (event.type == 'modal-shown') {
							$(this).data('height', $(this).data('carousel').height);
							$(this).data('carousel').height = $(this).parents('.modal-body:first').height();
						}
						else if (event.type == 'modal-hide') {
							$(this).height($(this).data('height'));
							$(this).data('carousel').height = $(this).data('height');
							$(this).data('height', undefined);
							$(this).find('.carousel-caption').css({ 'left': 0, 'right': 0});
						}

						$(this).carousel('fit');
					})
					.on('fit', function () {
						var
							modalHeight = $(this).parents('.modal-fullscreen').height()
							, $slide = $(this).find('.active')
						;

						if ($(this).find('.prev, .next').length) {
							$slide = $(this).find('.prev:first, .next:first');
						}

						var $img = $slide.find('img:first');

						if ($(this).parents('.modal-fullscreen:first').length) {
							var status = 0;

							if (
								($(this).data('carousel').height != modalHeight
									&& (
										$(this).height() < $img[0].naturalHeight
										|| modalHeight > $img[0].offsetHeight
								))
							) {
								status = 2;
							}
							else if (modalHeight < $img[0].offsetHeight
							) {
								status = 1;
							}

							if (status > 0) {
								$(this).css({
									'height': modalHeight
								});

								$(this).data('carousel').height = modalHeight;
							}

							if (status > 1) {
								$(this).carousel('fit');
							}

							$(this).parents('.modal-fullscreen:first').modal('fit');
						}
					})
				;

				this.modalized = true;
			}
		}
	});

	var _fn = $.fn.carousel;
	$.fn.carousel = function () {
		var result = _fn.apply(this, arguments);

		this.each(function () {
			var
				$this = $(this)
				, data = $this.data('carousel')
			;

			if (data.options.modalize || $(this).data('modalize') == true) {
				data.options.modalize = true;
				data.modalize();
			}
		});

		return result;
	};
	$.fn.carousel.defaults = _fn.defaults;
	$.fn.carousel.Constructor = _fn.Constructor;
	$.fn.carousel.noConflict = _fn.noConflict;
}));

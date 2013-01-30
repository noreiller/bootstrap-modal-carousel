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
					.on('modal-hide modal-shown', function (e) {
						if (e.type == 'modal-shown') {
							$(this).data('height', $(this).data('carousel').height);
							$(this).data('carousel').height = $(this).parents('.modal-body:first').height();
						}
						else if (e.type == 'modal-hide') {
							$(this).height($(this).data('height'));
							$(this).data('carousel').height = $(this).data('height');
							$(this).data('height', undefined);
						}

						$(this).carousel('fit');
					})
					.on('fit', function () {
						var 
							height = $(this).parents('.modal-fullscreen').height()
							, $slide = $(this).find('.active')
						;

						if ($(this).find('.prev, .next').length) {
							$slide = $(this).find('.prev:first, .next:first');
						}

						var $img = $slide.find('img:first');

						if (
							$(this).parents('.modal-fullscreen:first').length 
							&& $(this).data('carousel').height != $(this).parents('.modal-fullscreen').height()
							&& (
								$(this).height() < $img[0].naturalHeight
								|| $(this).parents('.modal-fullscreen').height() > $img[0].offsetHeight
							)
						) {

							if (0 && $img[0].naturalHeight < height) {
								height = $img[0].naturalHeight;
							}

							$(this).css({ 
								'height': height
							});

							$(this).data('carousel').height = height;
							
							$(this).carousel('fit');
						}
						else if ($(this).parents('.modal-fullscreen:first').length) {
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
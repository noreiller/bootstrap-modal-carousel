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

	$.extend($.fn.carousel.Constructor.prototype, {
		fit: function (item) {
			if (this.fitting || !this.$element.hasClass('carousel-fit')) return;

			this.fitting = true;

			var
				that = this
				, slide = typeof item !== 'undefined' ? item : 'active'
			;

			if (item != 'active' && slide == 'active' && this.$element.find('.prev').length) {
				slide = 'prev';
			}
			else if (item != 'active' && slide == 'active' && this.$element.find('.next').length) {
				slide = 'next';
			}

			var
				$slide = this.$element.find('.' + slide)
				, $img = $slide.find('img')
				, $caption = $slide.find('.carousel-caption')
				, e = $.Event('fit')
				, unfit = function () {
					$caption.css({
						'left': 0 || $caption.css('left')
						, 'right': 0 || $caption.css('right')
					});
				}
				, adaptWrapper = function () {
					if (that.$element.height() != $img[0].offsetHeight) {
						that.$element.animate({
							'height': $img[0].offsetHeight
						}, adaptCaption);
					}
					else {
						adaptCaption();
					}
				}
				, adaptCaption = function () {
					$caption.css({
						'left': $img[0].offsetLeft
						, 'right': $img.parent().width() - $img[0].offsetLeft - $img[0].offsetWidth
					});

					that.fitting = false;

					that.$element.trigger(e);
				}
			;

			unfit();

			if (slide != 'active' && this.height) {
				this.$element.animate({
					'height': this.height
				}, adaptWrapper);
			}
			else {
				adaptWrapper();
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

			if (!data.height) {
				data.height = $this.height();
			}

			if ($this.hasClass('carousel-fit')) {
				data.fit();
			}
		});

		return result;
	};
	$.fn.carousel.defaults = _fn.defaults;
	$.fn.carousel.Constructor = _fn.Constructor;
	$.fn.carousel.noConflict = _fn.noConflict;

	var _slide = $.fn.carousel.Constructor.prototype.slide;
	$.fn.carousel.Constructor.prototype.slide = function () {
		var
			that = this
			, result = _slide.apply(this, arguments)
		;

		if (this.$element.hasClass('carousel-fit')) {
			this.fit(this.$element.find('.next').length ? 'next' : 'prev');
		}

		return result;
	};

	$(window).on('resize', function (e) {
		$('.carousel').carousel('fit');
	});
}));

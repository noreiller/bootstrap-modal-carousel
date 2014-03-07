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

	// Extend the carousel constructor with some utils methods
	$.extend($.fn.carousel.Constructor.prototype, {
		fit: function (height) {
			if (!height) {
				height = $('.item.active', this.$element).height();
			}

			// Update the height of the carousel with the active slide one, in
			// the case when the image has the max-width:100% and is too big.
			if (height != this.$element.height()) {
				if ($.support.transition) {
					this.$element.animate({
						height: height
					});
				}
				else {
					this.$element.height(height);
				}


				this.$element.trigger($.Event('fit.bs.carousel', { height: height }));
			}

			// If the slide contains only one image, adjust the size of the caption to it
			if (this.$element.find('.item.active img').length == 1) {
				var
					$img = this.$element.find('.item.active img')
					, pos = {
						left: $img.position().left
						, right: $img.position().left
					}
				;

				if ($.support.transition) {
					this.$element.find('.carousel-caption').animate(pos);
				}
				else {
					this.$element.find('.carousel-caption').css(pos);
				}
			}
		}
	});

	$(document)
		.on('slide.bs.carousel', '.carousel.carousel-fit', function (event) {
			var data = $(this).data('bs.carousel');

			// Set the height of the carousel with the active slide one
			data.$element.height($('.item.active', data.$element).height());

			// Determine which slide will be next (first, prev, next, last)
			var $next = $('.item.active', data.$element)[event.direction == 'left' ? 'next' : 'prev']();
			if (!$next.length) {
				$next = $('.item:' + (event.direction == 'left' ? 'first' : 'last') + '-child', data.$element);
			}

			var height;
			// TWO WAYS
			// 1/ The next slide is already showing and we can get the height
			// 2/ The next slide is not yet shown and we clone it

			// 1/ Animate to the height of the next active slide
			height = $next.height();

			// // 2/ Clone the next slide
			// var $clone = $next.clone(), result;

			// // Set the clone invisible and avoid display:none!important rules
			// $clone
			// 	.css({visibility: 'hidden', display: 'block'})
			// 	.attr('style', $clone.attr('style').replace('block', 'block !important'))
			// ;

			// // Append the clone to the DOM
			// $clone.appendTo($('body'));


			// // Animate to the height of the next active slide
			// height = $clone.height();

			// // Remove the clone
			// $clone.remove();

			// Update the height of the carousel
			data.fit(height);
		})
		.on('slid.bs.carousel', '.carousel.carousel-fit', function (event) {
			var data = $(this).data('bs.carousel');
			data.fit();
		})
	;
}));

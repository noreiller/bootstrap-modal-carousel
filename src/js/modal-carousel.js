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

	/**
	 * Update the carousel top margin
	 * @param  {object} $carousel The carousel element
	 * @param  {number} height    The height of the carousel
	 */
	function updateCarouselTopMargin ($carousel, height) {
		if (!height) {
			height = $carousel.height();
		}

		var
			$parent = $carousel.parents('.modal:first')
			, needHeadingHandle = !$parent.hasClass('force-fullscreen')
			, parentFreeSpace = $parent.height()
		;

		if (needHeadingHandle) {
			parentFreeSpace = parentFreeSpace - $('.modal-header', $parent).height();
			parentFreeSpace = parentFreeSpace - $('.modal-footer', $parent).height();
		}

		if ($.support.transition && $carousel.hasClass('slide')) {
			$carousel.animate({
				marginTop: (parentFreeSpace - height) / 2
			});
		}
		else {
			$carousel.css({
				marginTop: (parentFreeSpace - height) / 2
			});
		}
	}

	$(document)
		// When the modal is shown, fit the carousel
		.on('shown.bs.modal', '.modal', function (event) {
			if ($('.carousel', this).length) {
				$('.carousel', this).data('bs.carousel').fit();
			}
		})
		// When the fullscreen modal is shown, place the carousel at the center
		.on('shown.bs.modal', '.modal.modal-fullscreen', function (event) {
			if ($('.carousel', this).length) {
				updateCarouselTopMargin($('.carousel', this).data('bs.carousel').$element);
			}
		})
		// When the carousel is adjusted in a fullscreen modal, adjust its position
		.on('fit.bs.carousel', '.modal.modal-fullscreen .carousel', function (event) {
			updateCarouselTopMargin($(this).data('bs.carousel').$element, event.height);
		})
		// When a carousel comes back to its native postion, remove the top
		// margin and fit it if needed.
		.on('replaced.bs.local', '.carousel', function (event) {
			$(this).css('margin-top', 0);

			if ($(this).hasClass('carousel-fit')) {
				$(this).data('bs.carousel').fit();
			}
		})
	;
}));

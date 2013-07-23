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

	$(document).on('click.modal.data-api', '[data-toggle="modal"]', function (event) {
		var
			$this = $(this)
			, href = $this.attr('href')
			, $local = $($this.attr('data-local') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
			, $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
		;

		if ($local.length && $target.length) {
			var
				$next = $local.next()
				, $prev = $local.prev().length
				, $parent = $local.parent()
				, $detached = $local.detach()
				, movedEvent = $.Event('moved')
			;

			$target.find('.modal-body').empty().append($detached);
			$detached.trigger(movedEvent);
			$detached.trigger($.Event('shown'));

			$target.one('show shown hide hidden', function (event) {
				$detached.trigger('modal-' + event.type);
			});

			$target.on('hide', function () {
				if ($next.length) {
					$detached.detach().insertBefore($next);
				}
				else if ($prev.length) {
					$detached.detach().insertAfter($prev);
				}
				else {
					$detached.detach().appendTo($parent);
				}

				$detached.trigger(movedEvent);
			});
		}
	});

}));

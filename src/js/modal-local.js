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

	// Extend the modal constructor with some utils methods
	$.extend($.fn.modal.Constructor.prototype, {
		/**
		 * Store the local selector element to the options
		 * @param  {string} selector The selector of the element to detach
		 */
		local: function (selector) {
			this.options.local = selector;
		}
		/**
		 * Detach the local element to the modal
		 */
		, detach: function () {
			$(this.options.local).trigger($.Event('detach.bs.local'));

			if (!this.$placeholder) {
				this.$placeholder = $('<div></div>')
					.addClass('hidden')
					.html(this.$element.find('.modal-body').html())
					.insertBefore($(this.options.local))
				;
			}

			this.$local = $(this.options.local).detach();

			this.$element.find('.modal-body').empty().append(this.$local);

			$(this.options.local).trigger($.Event('detached.bs.local'));
		}
		/**
		 * Replace the local element to its native position
		 */
		, replace: function () {
			$(this.options.local).trigger($.Event('replace.bs.local'));

			this.$local.detach().insertAfter(this.$placeholder);

			this.$element.find('.modal-body').html(this.$placeholder.html());

			$(this.options.local).trigger($.Event('replaced.bs.local'));
		}
	});

	$(document)
		// Detach the local element when the modal is going to be shown
		.on('show.bs.modal', '.modal', function () {
			var data = $(this).data('bs.modal');

			if (data.options.local) {
				data.detach();
			}
		})
		// Replace the local element when the modal is going to be hidden
		.on('hidden.bs.modal', '.modal', function () {
			var data = $(this).data('bs.modal');

			if (data.options.local) {
				data.replace();
			}
		})
		// Store the local selector to the modal options
		.on('click.bs.modal.data-api', '[data-toggle="modal"][data-local]', function (event) {
			$($(this).attr('data-target')).modal('local', $(this).data('local'));
		})
	;
}));

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

	$.extend($.fn.modal.Constructor.prototype, {
		fit: function () {
			if (this.$element.hasClass('modal-fullscreen')) {
				var
					modalHeight = this.$element.find('.modal-body:first').height()
					, viewportHeight = $(window).height()
				;

				var top = viewportHeight < modalHeight ? 0 : ((viewportHeight - modalHeight) / 2);

				if (modalHeight == 0) {
					top = 0;
				}

				this.$element.find('.modal-body')[this.$element.is('.fade') && this.$element.hasClass('in') ? 'animate' : 'css']({
					'margin-top': top + 'px'
				});
			}
			else {
				this.unfit();
			}
		}
		, unfit: function () {
			this.$element.find('.modal-body')[this.$element.is('.fade') && this.$element.hasClass('in') ? 'animate' : 'css']({
				'margin-top': '0'
			});
		}
	});

	var _backdrop = $.fn.modal.Constructor.prototype.backdrop;
	$.fn.modal.Constructor.prototype.backdrop = function () {
		var
			that = this
			, oldCallback = arguments[0]
			, newCallback = function () {
				oldCallback();
				that.fit();
			}
		;

		arguments[0] = newCallback;

		return _backdrop.apply(this, arguments);
	};

	$(window).on('resize', function () {
		$('.modal-fullscreen').modal('fit');
	});
}));

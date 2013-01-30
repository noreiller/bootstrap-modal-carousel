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
					, documentHeight = $(document).height()
				;

				this.$element.find('.modal-body')[this.$element.hasClass('in') ? 'animate' : 'css']({
					'margin-top': ((documentHeight - modalHeight) / 2) + 'px'
				});
			}
			else {
				this.unfit();
			}
		}
		, unfit: function () {
			this.$element.find('.modal-body')[this.$element.hasClass('in') ? 'animate' : 'css']({
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
}));
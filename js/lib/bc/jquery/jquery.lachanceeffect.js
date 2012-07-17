/**
 * jQuery.LachanceEffect
 * 
 * @author Bluecadet, developers@bluecadet.com
 * @license MIT
 * @license https://github.com/bluecadet/JS_Toolkit/blob/master/LICENSE.txt
 *
 * Ken Burns has an effect named after him, why shouldn't Troy Lachance?
 * This plugin animates a child image to zoom in within borders of a 
 * parent element.
 */

(function($) {
	/**
	 * Default values
	 */
	var defaults = {
		duration: 250,
		scale: 0.25
	};
	 
	/**
     * Public plugin methods
     */
	var methods = {
		/**
		 * Constructor
		 * 
		 * @param float scale
	 	 *   Percent to scale image on roll over as a decimal (0 - 1)
	 	 *   Default: 0.5
	 	 * @param int duration
		 *   Duration in milliseconds for image animation
		 */
		init: function(options) {
			return this.each(function() {
				if ($('img', this).height() > 0 && $('img', this).width() > 0) {
					internal.setup(this, options);
				}
				else {
					var self = this;
					$('img', this).bind('load.lachance', function(event) {
						internal.setup(self, options);
						$(self).unbind('.lachance');
					});
				}
			});
		},
		/**
		 * Removes mouse events.
		 */
		destroy: function() {
			return this.each(function() {
				$('img', this).unbind('mouseenter', internal.mouseOver);
				$('img', this).unbind('mouseleave', internal.mouseOut);
			});
		}
	};

	/**
     * Private plugin methods
     */
	var internal = {
		/**
		 * Extend defaults in a new object
		 */
		storeDefaults: function(self, options) {
			options = $.extend({}, defaults, options);
			options.original_height = $('img', self).height();
			options.original_width = $('img', self).width();
			return options;
		},
		/**
		 * Add markup and styles to target
		 */
		setup: function(self, options) {
			if (!$('.img-container', self).length) {
				$('img', self).wrap('<div class="img-container">');
			}
			$('.img-container', self).css({
				position: 'relative',
				overflow: 'hidden',
				height: $('img', self).height() + 'px',
				width: $('img', self).width() + 'px'
			});
			$('img', self).css({
				position: 'absolute'
			});
			options = internal.storeDefaults(self, options);
			$(self).bind('mouseenter', {
				options: options
			}, internal.mouseOver);
			$(self).bind('mouseleave', {
				options: options
			}, internal.mouseOut);
		},
		/**
		 * mouseover handler
		 */
		mouseOver: function(event) {
			var options = event.data.options
			pct = options.scale,
			h = options.original_height,
			w = options.original_width,
			newH = h * pct,
			newW = w * pct,
			newT = newH / 2 * -1,
			newL = newW / 2 * -1;
			$('img', this).stop();
			$('img', this).animate({
				height: newH + 'px',
				width: newW + 'px',
				marginLeft: newL + 'px',
				marginTop: newT + 'px',
				top: '50%',
				left: '50%'
			}, {
				duration: options.duration
			});
		},
		/**
		 * mouseout handler
		 */
		mouseOut: function(event) {
			var options = event.data.options,
			newH = options.original_height,
			newW = options.original_width;
			$('img', this).stop();
			$('img', this).animate({
				height: newH + 'px',
				width: newW + 'px',
				marginTop: '0px',
				marginLeft: '0px',
				top: '0%',
				left: '0%'
			}, {
				duration: options.duration
			});
		}
	};
	
	/**
	 * Magic.
	 */
	$.fn.LachanceEffect = function(method_options) {
		if (methods[method_options]) {
			return methods[method_options].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		else if (typeof method_options === 'object' || !method_options) {
			return methods.init.apply(this, arguments);
		}
		else {
			$.error('Method ' + method + 'does not exist. What are you doing?');
		}
	};
})(jQuery);
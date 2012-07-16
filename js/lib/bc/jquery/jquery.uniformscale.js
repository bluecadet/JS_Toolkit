/**
 * jQuery.UniformScale
 * 
 * @author Bluecadet, developers@bluecadet.com
 * @license MIT
 * @license http://opensource.org/licenses/mit-license.html
 *
 * Scale target element uniformly to fit indicated dimension. This 
 * plugin will surround the image with a div to be used to more
 * dependably retrieve the surrounding dimensions.
 * 
 * @param string dimension
 *     Dimension to scale expressed as height or width
 * @param int min
 *     Minimum size of non-targetted dimension
 * @param boolean resize
 *     Create listener to automatically adjust when parent is resized.
 *     
 * TODO: This plugin was built for a specific purpose. Investigate 
 * making this have wider applications.
 */

(function($, exports) {
	/**
	 * Default values
	 */
	var defaults = {
		dimension: 'width',
		min: 0,
		resize: false
	};
	
	/**
     * Public plugin methods
     */
	var methods = {
		/**
		 * Constructor
		 */
		init: function(options) {
			return this.each(function() {
				var wrapper = internal.wrapper(this);
				options = $.extend({}, defaults, options);
				if (options.resize) {
					$(exports).bind('resize.uniformscale', {options: options, self: $(this)}, function(event) {
						internal.resize(event.data.options, event.data.self);
					});
				}
				
				/**
				 * Check to make sure the image is loaded or 
				 * delay resizing.
				 */
				if ($(this).height() > 0) {
					internal.resize(options, $(this));
				} 
				else {
					var self = this;
					$(this).bind('load.uniformscale', function(event) {
						internal.resize(options, $(self));
						$(self).unbind('.uniformscale');
					})
				}
			});
		},
		/**
		 * Manually trigger scaling
		 */
		set: function(options) {
			return this.each(function() {
				options = $.extend({}, defaults, options);
				internal.resize(options, $(this));
			});
		},
		/**
		 * Remove resize listener
		 */
		stop: function(options) {
			return this.each(function() {
				$(exports.unbind('.uniformscale', internal.resize));
			});
		}
	};
	
	/**
     * Private plugin methods
     */
    var internal = {
		wrapper: function(self) {
			var div = $('<div class="uniformscale">').css({
				width: '100%',
				height: '100%',
				display: 'block'
			});
			return $(self).wrap(div).parent();
		},
		resize: function(options, self) {
			if ($(self).is(':visible')) {
				options.width = $(self).parent().width();
				options.height = $(self).parent().height();
				var width = $(self).width(),
					height = $(self).height(),
					ratio = 0,
					newH = 0,
					newW = 0;
				switch (options.dimension) {
					case 'width':
						ratio = options.width / width;
						newH = height * ratio;
						if (newH >= options.min) {
							$(self).width(options.width);
							$(self).height(newH);
						}
						else {
							ratio = options.min / height;
							newW = width * ratio;
							$(self).width(newW);
							$(self).height(options.min);
						}
					break;
					case 'height':
						ratio = options.height / height;
						newW = width * ratio;
						if (newW >= options.min) {
							$(self).width(newW);
							$(self).height(options.height);
						}
						else {
							ratio = options.min / width;
							newH = height * ratio;
							$(self).width(options.min);
							$(self).height(newH);
						}
					break;
					default:
						$.error('Improper dimension set. Please chose height or width.');
					break;
				}
			}
		}
	};
	
	$.fn.UniformScale = function(method_options) {
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
})(jQuery, window);
/**
 * jQuery.FlipBook
 * 
 * @author Bluecadet, developers@bluecadet.com
 * @license MIT
 * @license http://opensource.org/licenses/mit-license.html
 *
 * Takes an array of images to be flipped through like and old school
 * flip book animation. You can indicate stop frames and control the
 * speed of the animation.
 */

(function($, exports) {
	
	/**
	 * Default values
	 */
	var defaults = {
		frames: new Array(),
		stop_frames: new Array(),
		fps: 12,
		complete: null
	};
	
	/**
	 * Public plugin methods
	 */
	var methods = {
		/**
		 * Constructor
		 * 
		 * @param Array images
		 *   Image paths in the order in which they should appear
		 * @param Array stop_frames
		 *   Frames where the animation should pause
		 * @param int fps
		 *   How many frames to attempt to play per second.
		 * @param function complete
		 *   Function to call once initialization is complete
		 */
		init: function(options) {
			return this.each(function() {
				options = internal.storeValues(this, options);
				internal.loadFrames(this, options);
			});
		}
	};
	
	/**
	 * Private internal methods
	 */
	var internal = {
		/**
		 * Extends defaults and returns new object
		 */
		storeValues: function(self, options) {
			options = $.extend({}, defaults, options);
			return options;
		},
		/**
		 * Loads all the paths provided in frames.
		 */
		loadFrames: function(self, options) {
			
		}
	};
	
	$.fn.FlipBook = function(method_options){
		if (methods[method_options]) {
			return methods[method_options].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		else if (typeof method_options === 'object' || !method_options) {
			return methods.init.apply(this, arguments);
		}
		else {
			$.error('Method ' + method + 'does not exist.');
		}
	};
})(jQuery, window);
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
 * 
 * TODO: Update animation properties
 * TODO: Destroy
 * TODO: Allow animation to loop
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
		 * @param Array frames
		 *   Image paths in the order in which they should appear
		 * @param int fps
		 *   How many frames to attempt to play per second.
		 * @param function complete
		 *   Function to call once initialization is complete
		 */
		init: function(options) {
			return this.each(function() {
				options = internal.storeValues(this, options);
				var images = internal.loadFrames(this, options);
				$(this).html(images);
			});
		},
		/**
		 * Change properties of the flipbook
		 */
		update: function(options) {
			return this.each(function() {
				
			});
		},
		/**
		 * Tell the flipbook to play forward
		 * 
		 * @param int stop_frame
		 *   Frame to stop playing animation
		 * @param function complete
		 *   Function to call once animation is complete
		 */
		play: function(options) {
			return this.each(function() {
				var self = this,
					interval_delay = 1 / $(this).data('flipbook-options').fps * 1000,
					stop = (options && options.stop) ? options.stop : $(self).children().length - 1,
					first_frame = $(self).children().first(),
					last_frame = $(self).children().length,
					current_frame,
					target_frame;
				
				var frame_interval = setInterval(function() {
					current_frame = $(self).children().index($(self).children().filter(':visible'));
					target_frame = $(self).children().index($(self).children()[stop]);

					if (current_frame != target_frame) {
						$($(self).children()[current_frame]).hide();
						// animate
						if (current_frame == last_frame && target_frame == 0) {
							// Loop to the beginning
							current_frame = 0;
						}
						else if (current_frame == 0 && target_frame == first_frame) {
							// Go to the end
							current_frame = target_frame;
						}
						else {
							// Determine if we step forward or backward
							current_frame = (current_frame > target_frame) ? current_frame - 1 : current_frame + 1;
						}
						$($(self).children()[current_frame]).show();
						console.log(current_frame);
					}
					else {
						// done.
						clearInterval(frame_interval);
						if (options && options.complete)
							options.complete();
					}
				}, interval_delay);
				$(this).data('flipbook-interval', frame_interval);
			});
		},
		/**
		 * Tell the flipbook to stop
		 */
		stop: function() {
			return this.each(function() {
				var interval = $(this).data('flipbook-interval');
				clearInterval(interval);
			});
		},
		/**
		 * Skip to the specified frame
		 * 
		 * @param int frame
		 *   Frame to display
		 */
		skip: function(options) {
			return this.each(function() {
				if (options && options.frame) {
					$(this).children().filter(':visible').hide();
					$($(this).children()[options.frame]).show();
				}
				else {
					$.error('You did not specify a frame that FlipBook should skip to.');
				}
			});
		},
		/**
		 * Remove the images and any timers or listeners
		 */
		destroy: function() {
			return this.each(function() {
				
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
			$(self).data('flipbook-options', options);
			return options;
		},
		/**
		 * Loads all the paths provided in frames.
		 */
		loadFrames: function(self, options) {
			var images = new Array();
			var num = options.frames.length;
			$.each(options.frames, function(count, frame) {
				var image = new Image();
				$(image).bind('load.flipbookload error.flipbookerror', function(event) {
					num--;
					if (num == 0) {
						$(image).unbind('.flipbookload .flipbookerror');
						if (options.complete != null) {
							options.complete();
						}
					}
				});
				image.src = frame;
				image.className = 'flipbook-image frame-' + count;
				if (count > 0)
					$(image).css('display', 'none');
				images[count] = image;
			});
			return images;
		},
		/**
		 * Determine the frame animation should stop on
		 */
		targetFrame: function(self, stop_frame) {
			if (stop_frame) {
				// User provided a target, find it.
				return $(self).children()[stop_frame];
			}
			else {
				// No target provided, use end frame.
				return $(self).children().last();
			}
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
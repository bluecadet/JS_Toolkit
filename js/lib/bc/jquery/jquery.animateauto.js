/* 
 * jQuery.animateauto
 * 
 * @author Bluecadet, developers@bluecadet.com
 * @license MIT
 * @license https://github.com/bluecadet/JS_Toolkit/blob/master/LICENSE.txt
 *
 * Animates selected property to 'auto'
 * 
 * Determines the value of the property when set to auto. Animates that 
 * property to the stored value and sets the property to 'auto' once
 * animation has completed. 
 * 
 * @param string property
 *   css property to animate
 *   
 * @param Object options
 *	  mixed duration 
 *	    speed to animate property, can be milliseconds, 'fast', or 'slow'
 *    string easing
 *      easing function to use
 *    complete function
 *      callback to call when animation is complete
 *    step function
 *      function to be called after each step of the animation
 *    queue boolean
 *    specialEasing Object
 *   
 * TODO: Test queue
 * TODO: Test special easing  
 */


(function($) {
	
	var defaults = {
		property: null,
		duration: 'fast',
		easing: null,
		complete: null,
		step: null,
		queue: false,
		specialEasing: null
	};
	
	$.fn.animateauto = function(property, options) {
		return this.each(function() {
			options = $.extend({}, defaults, options);
			var original = $(this).css(property);
			$(this).css(property, 'auto');
			var target = {};
			var value = $(this).css(property);
			target[property] = (value != 'auto') ? value : 0;
			$(this).css(property, original);
			$(this).animate(target, {
				duration: options.duration,
				easing: options.easing,
				complete: function() {
					$(this).css(property, 'auto');
					if (options.complete) {
						options.complete();
					}
				},
				step: function(now, fx) {
					if (options.step) {
						options.step.call(this, now, fx);
					}
				},
				queue: options.queue,
				specialEasing: options.specialEasing
			});
		});
	}
	
})(jQuery);
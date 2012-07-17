/**
 * Array.indexOf
 * 
 * @author Bluecadet, developers@bluecadet.com
 * @license MIT
 * @license https://github.com/bluecadet/JS_Toolkit/blob/master/LICENSE.txt
 *
 * Older versions of Internet Explorer doesn't have an indexOf 
 * function for Arrays. This modifies the prototype to add in 
 * this functionality if it doesn't exist.
 * 
 * After including this function, use indexOf as normal.
 */

if (!Array.indexOf) {
	Array.prototype.indexOf = function(obj) {
		for (var i = 0; i < this.length; i++) {
			if (this[i] == obj) {
				return i;
			}
		}
		return -1;
	}
}


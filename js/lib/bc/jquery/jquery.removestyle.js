/* 
 * jQuery.removestyle
 *
 * @author Bluecadet, developers@bluecadet.com
 * @license MIT
 * @license https://github.com/bluecadet/JS_Toolkit/blob/master/LICENSE.txt
 * 
 * Finds the specified attribute in the target element's
 * style property and deletes it
 * 
 * @param string style
 *     style to remove from element
 */

(function($) {
    $.fn.removeStyle = function(style) {
        var search = new RegExp(style + '[^;]+;?', 'g');
        return this.each(function() {
            $(this).attr('style', function(i, style) {
                return style.replace(search, '');
            });
        });
    };
})(jQuery);
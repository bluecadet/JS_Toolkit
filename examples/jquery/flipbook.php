<?php

/**
 * Bluecadet Javascript Toolkit
 * 
 * @author Bluecadet, developers@bluecadet.com
 * @license MIT
 * @license https://github.com/bluecadet/JS_Toolkit/blob/master/LICENSE.txt
 *
 * Takes an array of images to be flipped through like and old school
 * flip book animation. You can indicate stop frames and control the
 * speed of the animation.
 */

?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>jQuery.flipbook | Bluecadet Javascript Toolkit</title>
	<link rel="stylesheet" href="../../css/main.css" type="text/css" media="screen" title="no title" charset="utf-8">
</head>
<body>
	<div class="content">
		<hgroup class="main">
			<h1>Bluecadet Javascript Toolkit</h1>
			<h2>jQuery.FlipBook <a href="https://github.com/bluecadet/JS_Toolkit/blob/master/js/lib/bc/jquery/jquery.flipbook.js">(https://github.com/bluecadet/JS_Toolkit/blob/master/js/lib/bc/jquery/jquery.flipbook.js)</a></h2>
		</hgroup>
		<p>
			Takes an array of images to be flipped through like and old school flip book animation. 
			You can indicate stop frames and control the speed of the animation.
		</p>
		</p>
		<div class="example example-01">
			<div class="flipbook"></div>
			<h3>Demo at 12 fps</h3>
			<ul>
				<li><a href="#" class="play">Play</a></li>
				<li><a href="#" class="stop">Stop</a></li>
				<li><a href="#" class="skip">Skip to frame 24</a></li>
			</ul>
		</div>
		<div class="example example-02">
			<div class="flipbook"></div>
			<h3>Demo at 24 fps</h3>
			<ul>
				<li><a href="#" class="play">Play</a></li>
				<li><a href="#" class="stop">Stop</a></li>
				<li><a href="#" class="skip">Skip to frame 24</a></li>
			</ul>
		</div>
	</div>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
	<script>window.jQuery || document.write('<script src="js/libs/jquery-1.7.2.min.js"><\/script>');</script>
	<script src="../../js/lib/bc/jquery/jquery.flipbook.js"></script>
	<script>
		/**
		 * Demo code
		 */
		(function($, exports) {
			
			/**
			 * I'm lazy. Building an array of all the images I wish to load.
			 */
			var frames = new Array(),
				total_frames = 48;
			for (var i = 1; i < total_frames; i++) {
				var num = (i < 10) ? '0' + i : i;
				frames.push('../img/flipbook/flipbook00' + num + '.gif');
			}
			
			/**
			 * Going to vary FPS to display two distinct animations on 
			 * the same page
			 */
			var fps = [12, 24];
			
			$.each($('.example'), function(count, example) {
				
				/**
				* Create the flipbook
				*/
				$('.flipbook', example).FlipBook({
					frames: frames,
					fps: fps[count],
					complete: function() {
						console.log('All images have been loaded');
					}
				});

				/**
				* Play/Stop/Skip buttons
				*/
				$('.play', example).bind('click', function(event) {
					event.preventDefault();
					$('.flipbook', example).FlipBook('play', {
						complete: function() {
							console.log('Animation Complete');
						}
					});
				});
				$('.stop', example).bind('click', function(event) {
					event.preventDefault();
					$('.flipbook', example).FlipBook('stop');
				});
				$('.skip', example).bind('click', function(event) {
					event.preventDefault();
					$('.flipbook', example).FlipBook('skip', {
						frame: 24
					});
				});
				
			});
			
		})(jQuery, window);
	</script>
</body>
</html>
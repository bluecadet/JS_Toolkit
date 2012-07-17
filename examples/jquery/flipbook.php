<?php

/**
 * Bluecadet Javascript Toolkit
 * 
 * @author Bluecadet, developers@bluecadet.com
 * @license MIT
 * @license http://opensource.org/licenses/mit-license.html
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
			<h2>jQuery.FlipBook</h2>
		</hgroup>
		<p>
			Takes an array of images to be flipped through like and old school flip book animation. 
			You can indicate stop frames and control the speed of the animation.
		</p>
		</p>
		<div class="example">
			<div id="flipbook"></div>
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
			 * Create the flipbook
			 */
			$('#flipbook').FlipBook({
				frames: frames,
				fps: 24,
				complete: function() {
					console.log('All images have been loaded');
				}
			});
			
			/**
			 * Play/Stop buttons
			 */
			$('.play').bind('click', function(event) {
				event.preventDefault();
				$('#flipbook').FlipBook('play', {
					complete: function() {
						console.log('Animation Complete');
					}
				});
			});
			$('.stop').bind('click', function(event) {
				event.preventDefault();
				$('#flipbook').FlipBook('stop');
			});
			
			$('.skip').bind('click', function(event) {
				event.preventDefault();
				$('#flipbook').FlipBook('skip', {
					frame: 24
				});
			});
			
		})(jQuery, window);
	</script>
</body>
</html>
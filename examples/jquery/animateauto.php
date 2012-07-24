<?php

/**
 * Bluecadet Javascript Toolkit
 * 
 * @author Bluecadet, developers@bluecadet.com
 * @license MIT
 * @license https://github.com/bluecadet/JS_Toolkit/blob/master/LICENSE.txt
 *
 * Determines the value of the property when set to auto. Animates that 
 * property to the stored value and sets the property to 'auto' once
 * animation has completed.
 */

?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>jQuery.animateauto | Bluecadet Javascript Toolkit</title>
	<link rel="stylesheet" href="../../css/main.css" type="text/css" media="screen" title="no title" charset="utf-8">
</head>
<body>
	<div class="content">
		<hgroup class="main">
			<h1>Bluecadet Javascript Toolkit</h1>
			<h2>jQuery.animateauto <a href="https://github.com/bluecadet/JS_Toolkit/blob/master/js/lib/bc/jquery/jquery.animateauto.js">(https://github.com/bluecadet/JS_Toolkit/blob/master/js/lib/bc/jquery/jquery.animateauto.js)</a></h2>
		</hgroup>
		<p>
			Determines the value of the property when set to auto. Animates that 
			property to the stored value and sets the property to 'auto' once
			animation has completed.
		</p>
		</p>
		<div class="example">
			<div class="demo">
				Bacon ipsum dolor sit amet shoulder tenderloin pork chop, ham 
				leberkas tri-tip hamburger. Brisket meatball chuck pork biltong 
				corned beef filet mignon tongue sirloin flank ham hock turkey. 
				Corned beef ham pastrami meatball bresaola ground round andouille 
				pork loin.
			</div>
			<ul>
				<li><a href="#" class="height">Animate to height auto</a></li>
				<li><a href="#" class="margin">Animate to margin auto</a></li>
				<li><a href="#" class="top">Animate to top auto</a></li>
				<li><a href="#" class="reset">Reset</a></li>
			</ul>
		</div>
	</div>
	<style>
		.demo {
			border: 1px solid #666;
			height: 10em;
			margin: 25px;
			padding: 25px;
			position: relative;
				top: 15px;
		}
	</style>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
	<script>window.jQuery || document.write('<script src="js/libs/jquery-1.7.2.min.js"><\/script>');</script>
	<script src="../../js/lib/bc/jquery/jquery.animateauto.js"></script>
	<script>
		/**
		 * Demo code
		 */
		(function($, exports) {
			
			/**
			 * Animate height attribute of .demo to auto
			 */
			$('.height').bind('click', function(event) {
				event.preventDefault();
				$('.demo').animateauto('height', {
					duration: 250,
					complete: function() {
						console.log('Finished animating height');
					}
				});
			});
			
			/**
			 * Animate margin attribute of .demo to auto
			 */
			$('.margin').bind('click', function(event) {
				event.preventDefault();
				$('.demo').animateauto('margin', {
					duration: 250,
					complete: function() {
						console.log('Finished animating margin');
					}
				});
			});
			
			/**
			 * Animate top attribute of .demo to auto
			 */
			$('.top').bind('click', function(event) {
				event.preventDefault();
				$('.demo').animateauto('top', {
					duration: 250,
					complete: function() {
						console.log('Finished animating top');
					},
					step: function(now, fx) {
						//console.log(this, now, fx);
					}
				});
			});
			
			/**
			 * Delete style attribute on .demo to reset demo
			 */
			$('.reset').bind('click', function(event) {
				event.preventDefault();
				$('.demo').removeAttr('style');
			});
			
		})(jQuery, window);
	</script>
</body>
</html>
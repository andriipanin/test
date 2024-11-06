<?php
/**
 * Block Name: Bubbels top banner
 *
 * @param array $block The block settings and attributes.
 * @param string $content The block inner HTML (empty).
 * @param bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

$page_fields = get_fields();
$post_id     = get_queried_object_id();

// Getting block fields
$additional_class         = ( isset($block['className']) ) ? $block['className'] : '';
$content                  = getFieldValue($page_fields, 'content');
?>

<div class="top-banner-bubbles <?php echo $additional_class; ?>">
	<div class="container top-banner-bubbles__container">
		<div class="fish fish-1 rellax" data-rellax-speed="2"></div>
		<div class="fish fish-2 rellax" data-rellax-speed="2"></div>
		<div class="fish fish-3 rellax"></div>
		<div class="fish fish-4 rellax" data-rellax-speed="1"></div>
		<div class="fish fish-5 rellax" data-rellax-speed="2"></div>
		<div class="bubbels bubbels-1 rellax" ></div>
		<div class="bubbels bubbels-2 rellax" data-rellax-speed="0"></div>
		<div class="bubbels bubbels-3 rellax"></div>
		<div class="top-banner-bubbles__content wow animate__fadeInUp">
			<?php echo ( $content ) ? do_shortcode( wpautop($content) ) : ''; ?>
		</div>
	</div>
</div>

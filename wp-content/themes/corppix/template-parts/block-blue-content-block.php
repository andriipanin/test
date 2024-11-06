<?php
/**
 * Block Name: Content block
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
$full_width_content       = getFieldValue($page_fields, 'content_for_full_width_section');
if (getFieldValue($page_fields, 'waves')) {
    $additional_class .= ' wave-block ';
}
?>

<div class="blue-content-block <?php echo $additional_class; ?>">
	<div class="container blue-content-block__container">
		<div class="bubble bubble-1 rellax"></div>
		<div class="bubble bubble-2 rellax"></div>
		<div class="blue-content-block__content page-content wow animate__fadeInUp">
			<?php echo ( $full_width_content ) ? do_shortcode( wpautop($full_width_content) ) : ''; ?>
		</div>
	</div>
</div>
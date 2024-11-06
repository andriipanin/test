<?php
/**
 * Block Name: Block form
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
$block_title       = getFieldValue($page_fields, 'title');
$block_form       = getFieldValue($page_fields, 'form');
?>

<div class="block-form-section <?php echo $additional_class; ?>">
	<div class="container block-form-section__container">
	<div class="block-form-section__wrapper">
		<h2 class="block-form-section__title"><?php echo $block_title; ?></h2>
		<?php echo do_shortcode($block_form); ?>
	</div>
	</div>
</div>

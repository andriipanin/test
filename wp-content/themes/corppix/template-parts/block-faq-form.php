<?php
/**
 * Block Name: FAQ form
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
$faq_title       = getFieldValue($page_fields, 'title');
?>

<div class="faq-form-section <?php echo $additional_class; ?>">
	<div class="container faq-form-section__container">
	<div class="faq-form-section__wrapper">
		<h2 class="faq-form-section__title"><?php echo $faq_title; ?></h2>
		<?php echo do_shortcode('[contact-form-7 id="200" title="Ask us anything"]'); ?>
	</div>
	</div>
</div>

<?php
/**
 * Block Name: Block form
 *
 * @param array $block The block settings and attributes.
 * @param string $content The block inner HTML (empty).
 * @param bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */
global $global_options;
$block_form_sticky = '';
$block_additional_class = '';
if(isset($args['type']) && $args['type'] == 'fixed'){
	$block_form_sticky	= 'id="block-form-sticky"';
}else{
	$block_additional_class = ' resources-form';
}
// Getting block fields
$block_title       = getFieldValue($global_options, 'sign_up_title');
$block_form       = getFieldValue($global_options, 'sign_up_form');
?>

<div class="block-form-section block-form-resources<?php echo $block_additional_class; ?>" <?php echo $block_form_sticky; ?>>
	<?php
		if(is_home()){
			echo '<div id="sign-up-for-updates"></div>';
		}
	?>
	<div class="container block-form-section__container block-form-resources__container">
	<div class="block-form-section__wrapper block-form-resources__wrapper">
		<h2 class="block-form-section__title block-form-resources__title"><?php echo $block_title; ?></h2>
		<?php echo do_shortcode($block_form); ?>
	</div>
	</div>
</div>

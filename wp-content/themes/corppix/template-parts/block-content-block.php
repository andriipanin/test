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
$block_style           = getFieldValue($page_fields, 'block_style');
$full_width_content       = getFieldValue($page_fields, 'content_for_full_width_section');
if($block_style == 2){
    $additional_class .= ' content-style-block-fish';
}elseif($block_style == 3){
    $additional_class .= ' content-style-block-bubbles';
}

if (getFieldValue($page_fields, 'waves')) {
    $additional_class .= ' wave-block ';
}
$background_color = getFieldValue($page_fields, 'background_color') ?? 'white';
$additional_class .= " background-{$background_color} ";
?>

<div class="content-full-width-block <?php echo $additional_class; ?>">
	<div class="container content-full-width-block__container content">
		<?php
			if($block_style == 3 || $block_style == 2){
				echo '
				<div class="bubble bubble-1 rellax"></div> 
				<div class="bubble bubble-2 rellax" data-rellax-speed="-2"></div> 
				';
			}
			if($block_style == 2){
				echo '
				<div class="fish fish-1 rellax" data-rellax-speed="-3"></div> 
				';
			}
		?>
		<div class="content-full-width-block__content page-content wow animate__fadeInUp">
			<?php
            echo ( $full_width_content ) ? do_shortcode( wpautop($full_width_content) ) : ''; ?>
		</div>
	</div>
</div>
<?php
/**
 * Block Name: Check/cross content list
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
$check_title           = getFieldValue($page_fields, 'check_title');
$check_content           = getFieldValue($page_fields, 'check_content');
$cross_title           = getFieldValue($page_fields, 'cross_title');
$cross_content           = getFieldValue($page_fields, 'cross_content');
?>

<div class="check-cross-list <?php echo $additional_class; ?>">
	<div class="container check-cross-list__container">
		<div class="bubble bubble-1 rellax"></div>
		<div class="check-cross-list__wrapper">
		<?php
			if($check_title){
				echo '<h2 class="check-cross-list__title">'.$check_title.'</h2>';
			}
			echo '<div class="check-cross-list__content check-cross-list__content-check">';
				echo ( $check_content ) ? do_shortcode( wpautop($check_content) ) : '';    
			echo '</div>'; 
		?>
		</div>
		<div class="check-cross-list__wrapper">
		<?php
			if($cross_title){
				echo '<h2 class="check-cross-list__title">'.$cross_title.'</h2>';
			}
			echo '<div class="check-cross-list__content check-cross-list__content-cross">';
				echo ( $cross_content ) ? do_shortcode( wpautop($cross_content) ) : '';    
			echo '</div>'; 
		?>
		</div>
	</div>
</div>
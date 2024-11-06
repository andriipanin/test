<?php
/**
 * Block Name: Small text content
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
$title           = getFieldValue($page_fields, 'title');
$content           = getFieldValue($page_fields, 'content');
?>

<div class="small-text-content <?php echo $additional_class; ?>">
	<div class="container small-text-content__container">
		
		<?php
			if($title){
				echo '<h2 class="small-text-content__title">
					'.$title.
				'
					<span class="bubble bubble-1 rellax"></span> 
				</h2>';
			}
			echo '<div class="small-text-content__content">';
				echo ( $content ) ? do_shortcode( wpautop($content) ) : '';    
			echo '</div>';  
		?>
	</div>
</div>
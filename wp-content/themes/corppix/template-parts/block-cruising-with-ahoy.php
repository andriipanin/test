<?php
/**
 * Block Name: Cruising with Ahoy
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
$cruising_title       = getFieldValue($page_fields, 'cruising_title');
$cruising_text       = getFieldValue($page_fields, 'cruising_text');
$cruising_slider       = getFieldValue($page_fields, 'cruising_slider');
$cruising_link       = getFieldValue($page_fields, 'cruising_link');
$boat_json_animation       = getFieldValue($page_fields, 'boat_json_animation');
?>

<div class="cruising-section <?php echo $additional_class; ?>">
	<div class="container cruising-section__container">
	<?php
		if($cruising_title){
			echo '<h2 class="cruising-section__title wow animate__fadeInUp">'.$cruising_title.'</h2>';
		}
		if($cruising_text){
			echo '<p class="cruising-section__text wow animate__fadeInUp">'.$cruising_text.'</p>';
		}
		if($cruising_slider){
			echo '<div class="cruising-section__scroll" id="cruising-section__scroll">';
				echo '<div class="cruising-section__boat start boatAnimation" data-file="'.$boat_json_animation['url'].'">

					</div>
				';
				echo '<div class="cruising-section__slider" id="cruising-section__slider">';
				echo '<div class="item"></div>';
				foreach($cruising_slider as $item){
					echo '<div class="item">';
						echo '<h3 class="cruising-section__slider-title"><span>'.$item['title'].'</span></h3>';
						echo '<p class="cruising-section__slider-text">'.$item['text'].'</p>';
					echo '</div>';
				}
				echo '</div>';
				echo '<input type="hidden" name="cruising-step" id="cruising-step" data-count="'.count($cruising_slider).'" value="0" />';
			echo '</div>';
		}
    if($cruising_link){
			echo '<div class="link-wrapper cruising-section__link"><a class="btn-primary" href="'.$cruising_link['url'].'">'.$cruising_link['title'].'</a></div>';
		}
	?>	
	</div>
</div>
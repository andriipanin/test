<?php
/**
 * Block Name: Ensuring slider
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
$ensuring_title       = getFieldValue($page_fields, 'ensuring_title');
$ensuring_text       = getFieldValue($page_fields, 'ensuring_text');
$ensuring_slider       = getFieldValue($page_fields, 'ensuring_slider');
$ensuring_link       = getFieldValue($page_fields, 'ensuring_link');
if (getFieldValue($page_fields, 'waves')) {
    $additional_class .= ' wave-block ';
}
$background_color = getFieldValue($page_fields, 'background_color') ?? 'white';
$additional_class .= " background-{$background_color} ";
?>

<div class="ensuring-slider-section <?php echo $additional_class; ?>">
	<div class="container ensuring-slider-section__container">
	<?php
		if($ensuring_title){
			echo '<h2 class="ensuring-slider-section__title wow animate__fadeInUp">'.$ensuring_title.'</h2>';
		}
		if($ensuring_text){
			echo '<p class="ensuring-slider-section__text wow animate__fadeInUp">'.$ensuring_text.'</p>';
		}
		if($ensuring_slider){
			echo '<div class="ensuring-slider-section__slider">';
        foreach($ensuring_slider as $item){
            echo '<div class="item">';
							echo '<div class="ensuring-slider-section__image-wrapper">';
									echo '<img src="#" data-src="'.$item['image']['url'].'" alt="'.$item['image']['alt'].'" width="'.$item['image']['width'].'" height="'.$item['image']['height'].'" class="ensuring-slider-section__image lozad" />';
							echo '</div>';
							echo '<h3 class="ensuring-slider-section__slider-text"><span>'.$item['text'].'</span></h3>';
            echo '</div>';
        }
        echo '</div>';
		}
    if($ensuring_link){
			echo '<div class="link-wrapper ensuring-slider-section__link"><a class="btn-primary-white" href="'.$ensuring_link['url'].'">'.$ensuring_link['title'].'</a></div>';
		}
	?>	
	</div>
</div>
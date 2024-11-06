<?php
/**
 * Block Name: Technology slider
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
$technology_title       = getFieldValue($page_fields, 'technology_title');
$technology_text       = getFieldValue($page_fields, 'technology_text');
$technology_slider       = getFieldValue($page_fields, 'technology_slider');
$technology_link       = getFieldValue($page_fields, 'technology_link');
$id = rand(000,999);
if (getFieldValue($page_fields, 'waves')) {
    $additional_class .= ' wave-block ';
}
$background_color = getFieldValue($page_fields, 'background_color') ?? 'white';
$additional_class .= " background-{$background_color} ";
?>

<div class="technology-slider-section <?php echo $additional_class; ?>">
	<div class="container technology-slider-section__container">
	<?php
		if($technology_title){
			echo '<h2 class="technology-slider-section__title wow animate__fadeInUp">'.$technology_title.'</h2>';
		}
		if($technology_text){
			echo '<p class="technology-slider-section__text wow animate__fadeInUp">'.$technology_text.'</p>';
		}
		if($technology_slider){
			echo '<div class="technology-slider-section__slider" data-id="'.$id.'">';
        foreach($technology_slider as $item){
            echo '<div class="item">';
							echo '<div class="technology-slider-section__image-wrapper">';
									echo '<img src="#" data-src="'.$item['image']['url'].'" alt="'.$item['image']['alt'].'" width="'.$item['image']['width'].'" height="'.$item['image']['height'].'" class="technology-slider-section__image lozad" />';
							echo '</div>';
            echo '</div>';
        }
        echo '</div>';
				echo '<div class="technology-slider-section__slider-text-wrapper">';
				$i = 0;
				foreach($technology_slider as $item){
					echo '<h3 class="technology-slider-section__slider-text'.($i == 0 ? ' active' : '').'"'.($i == 0 ? ' style="display:block;"' : '').' id="text-'.$i.$id.'">'.$item['text'].'</h3>';
					$i++;
				}
				echo '</div>';
		}
    if($technology_link){
			echo '<div class="link-wrapper technology-slider-section__link"><a class="btn-primary" href="'.$technology_link['url'].'">'.$technology_link['title'].'</a></div>';
		}
	?>	
	</div>
</div>
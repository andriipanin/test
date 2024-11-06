<?php
/**
 * Block Name: Benefits block new
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
$benefits_title       = getFieldValue($page_fields, 'benefits_title');
$benefits_text       = getFieldValue($page_fields, 'benefits_text');
$benefits_list       = getFieldValue($page_fields, 'benefits_list');
if (getFieldValue($page_fields, 'waves')) {
    $additional_class .= ' wave-block ';
}
$background_color = getFieldValue($page_fields, 'background_color') ?? 'white';
$additional_class .= " background-{$background_color} ";
?>

<div class="benefits-new-section <?php echo $additional_class; ?>">
	<div class="container benefits-new-section__container">
	<?php
		if($benefits_title){
			echo '<h2 class="benefits-new-section__title wow animate__fadeInUp">'.$benefits_title.'</h2>';
		}
		if($benefits_text){
			echo '<p class="benefits-new-section__text wow animate__fadeInUp">'.$benefits_text.'</p>';
		}
		if($benefits_list){
			echo '<div class="benefits-new-section__list">';
			foreach($benefits_list as $item){
				echo '<div class="benefit">';
					echo '
						<div class="benefit__wrapper">
							<div class="benefit__icon wow animate__fadeInUp">
								<img src="#" data-src="'.$item['icon']['url'].'" alt="'.$item['icon']['alt'].'" width="'.$item['icon']['width'].'" height="'.$item['icon']['height'].'" class="lozad benefit__image" />
							</div>
							<h3 class="benefit__title wow animate__fadeInUp">'.$item['title'].'</h3>
						</div>
						<p class="benefit__text wow animate__fadeInUp">'.$item['text'].'</p>
					';
				echo '</div>';
			}
			echo '</div>';
		}
	?>	
	</div>
</div>
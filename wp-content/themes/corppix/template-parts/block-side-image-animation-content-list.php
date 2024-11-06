<?php
/**
 * Block Name: Side image animation content list
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
$text           = getFieldValue($page_fields, 'text');
$content_list           = getFieldValue($page_fields, 'content_list');
?>

<div class="side-animation-list <?php echo $additional_class; ?>">
	<div class="container side-animation-list__container">
		<?php
			if($title){
				echo '<h2 class="side-animation-list__title">
					'.$title.'
					<span class="bubble bubble-1 rellax"></span> 
          <span class="bubble bubble-2 rellax"></span> 
				</h2>';
			}
			if($text){
				echo '<p class="side-animation-list__text">'.$text.'</p>';
			}
			if($content_list){
				echo '<div class="side-animation-list__list">';
				foreach($content_list as $key => $item){
					echo '<div class="side-animation-list__list-item">';
						echo '<div class="bubble bubble-'.$key.' rellax"></div>';
						echo '<figure class="side-animation-list__list-image-wrapper">';
						if($item['add_json_animation']){
							if(!empty($item['json_animation_file'])){
								echo '<div class="side-animation-list__list-svg svg-json-animation" data-file="'.$item['json_animation_file']['url'].'"></div>';
							}
						}else{
							if(!empty($item['image'])) {
								echo '<img class="side-animation-list__list-image lozad"  src="#" data-src="'.$item['image']['url'].'" width="'.$item['image']['width'].'" height="'.$item['image']['height'].'" alt="'.$item['image']['alt'].'" />';
							} 
						} 
						echo '</figure>';
						echo '<div class="side-animation-list__list-content-wrapper">';
							echo '<div class="side-animation-list__list-content">';
								echo $item['content'];
							echo '</div>';
						echo '</div>';
					echo '</div>';
				}
				echo '</div>';
			}
		?>
	</div>
</div>
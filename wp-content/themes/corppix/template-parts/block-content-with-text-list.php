<?php
/**
 * Block Name: Content with text list
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
$sub_title           = getFieldValue($page_fields, 'sub_title');
$sub_text           = getFieldValue($page_fields, 'sub_text');
$list           = getFieldValue($page_fields, 'list');

?>

<div class="content-with-text-list <?php echo $additional_class; ?>">
	<div class="container content-with-text-list__container">
		<div class="content-with-text-list__content">
			<div class="content-with-text-list__content-top">
			<?php
				if($title){
					echo '<h2 class="content-with-text-list__title">'.$title.'</h2>';
				}
				if($text){
					echo '<div class="content-with-text-list__text">'
						.do_shortcode( wpautop($text) ).'
					</div>';  
				}
			?>
			</div>
			<div class="content-with-text-list__content-bottom">
			<?php
				if($sub_title){
					echo '<h3 class="content-with-text-list__subtitle">'.$sub_title.'</h3>';
				}
				if($sub_text){
					echo '<div class="content-with-text-list__text">'
						.do_shortcode( wpautop($sub_text) ).'
					</div>';  
				}
			?>
			</div>
			<?php
				if($list){
					echo '<div class="content-with-text-list__list">';
						echo '<div class="bubble bubble-1 rellax"></div>';
						foreach($list as $item){
							echo '<div class="content-with-text-list__list-item">';
							if($item['title']){
								echo '<h4 class="content-with-text-list__list-title">'.$item['title'].'</h4>';
							}
							if($item['content']){
								echo '<div class="content-with-text-list__list-text">'.do_shortcode( wpautop($item['content']) ).'</div>';
							}
							echo '</div>';
						}
					echo '</div>';
				}
			?>
		</div>
		
	</div>
</div>
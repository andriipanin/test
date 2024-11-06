<?php
/**
 * Block Name: News block
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
$news_title       = getFieldValue($page_fields, 'news_title');
$news_text       = getFieldValue($page_fields, 'news_text');
$news_list       = getFieldValue($page_fields, 'news_list');
$news_link       = getFieldValue($page_fields, 'news_link');
?>

<div class="news-section <?php echo $additional_class; ?>">
	<div class="container news-section__container">
	<div class="bubble bubble-1 rellax" data-rellax-speed="1"></div> 
	<?php
		if($news_title){
			echo '<h2 class="news-section__title wow animate__fadeInUp">'.$news_title.'</h2>';
		}
		if($news_text){
			echo '<p class="news-section__text wow animate__fadeInUp">'.$news_text.'</p>';
		}
		if($news_list){
			echo '<div class="news-section__list">';
        foreach($news_list as $item){ 
					$thumb   = get_post_thumbnail_id($item->ID);
					$cat = get_the_category( $item->ID );
					$author = get_field('author', $item->ID);
					echo '<div class="post">';
						echo '<div class="post__image-wrapper">';
							echo '<a href="'.get_permalink($item->ID).'" class="post__link">';
								echo wp_get_attachment_image( $thumb, 'home-resources', "", array( "class" => "post__image" ) );
							echo '</a>';
						echo '</div>';
						echo '<a href="' . esc_url( get_category_link( $cat[0]->term_id ) ) . '" class="post__category">'. $cat[0]->name .'</a>';
						echo '<a href="'.get_permalink($item->ID).'" class="post__title">'.$item->post_title.'</a>';
						if(!empty($author)){
							echo '<span class="post__author">'.$author.'</span>';
						}
					echo '</div>';
        }
        echo '</div>';
		}
    if($news_link){
			echo '<div class="link-wrapper news-section__link"><a class="btn-primary" href="'.$news_link['url'].'">'.$news_link['title'].'</a></div>';
		}
	?>	
	</div>
</div>
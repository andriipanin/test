<?php
/**
 * Block Name: Image with content and two CTA
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
$image           = getFieldValue($page_fields, 'image');
$title           = getFieldValue($page_fields, 'title');
$content           = getFieldValue($page_fields, 'content');
$link_1           = getFieldValue($page_fields, 'link_1');
$link_2           = getFieldValue($page_fields, 'link_2');

?>

<div class="side-image-cta <?php echo $additional_class; ?>">
	<div class="container side-image-cta__container">
    <?php
            
        echo '<figure class="side-image-cta__side-image">';
            if($image) {
                echo '<img class="side-image-cta__image lozad"  src="#" data-src="'.$image['url'].'" width="'.$image['width'].'" height="'.$image['height'].'" alt="'.$image['alt'].'" />';
            }    
        echo '</figure>';
        echo '<div class="side-image-cta__main-content wow animate__fadeInUp '.$small_text.'">';
            if($title){
                echo '<h2 class="side-image-cta__title">'.$title.'</h2>';
            }
            echo '<div class="side-image-cta__content">';
                echo ( $content ) ? do_shortcode( wpautop($content) ) : '';
            echo '</div>';
            if($link_1 || $link_2){
                echo '<div class="side-image-cta__link-wrapper">';
                if($link_1){
                    echo '<div class="side-image-cta__link-block">
                        <a class="btn-primary-border side-image-cta__link" href="'.$link_1['url'].'"'.($link_1['target'] ? ' target="_blank"' : '').'>'.$link_1['title'].'</a>
                    </div>';
                }
                if($link_2){
                    echo '<div class="side-image-cta__link-block">
                        <a class="btn-primary-arrow side-image-cta__link" href="'.$link_2['url'].'"'.($link_2['target'] ? ' target="_blank"' : '').'>'.$link_2['title'].'</a>
                    </div>';
                }
                echo '</div>';
            }
        echo '</div>';
    ?>
	</div>
</div>
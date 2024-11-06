<?php
/**
 * Block Name: Partners block
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
$title                    = getFieldValue($page_fields, 'title');
$partners_repeater        = getFieldValue($page_fields, 'partners_repeater');

?>

<div class="partners-block <?php echo $additional_class; ?>">
	<div class="container partners-block__container">
        <?php
            if ( $title ) {
                echo '<h2 class="partners-block__title">'.do_shortcode($title).'</h2>';
            }
        ?>
        <div class="partners-block__slider swiper js-partners">
            <div class="swiper-wrapper partners-block__content">
                <?php
                if ( $partners_repeater ) {
                    foreach ( $partners_repeater as $partners_item ) {
                        $item_image         = $partners_item['image'];
                        if ( $item_image ) {
                        echo '<figure class="swiper-slide partners-block__item">';
                                echo '<img class="partners-block__image lozad" src="#" data-src="'.$item_image.'" alt="side image" />';
                        echo '</figure>';
                        }
                    }
                }
                
                ?>
        </div>
		</div>
	</div>
</div>
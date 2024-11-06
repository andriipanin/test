<?php
/**
 * Block Name: Testimonials block
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
$testimonials_list           = getFieldValue($page_fields, 'testimonials_list');
if (getFieldValue($page_fields, 'waves')) {
    $additional_class .= ' wave-block ';
}
$background_color = getFieldValue($page_fields, 'background_color') ?? 'white';
$additional_class .= " background-{$background_color} ";
if($testimonials_list){
?>

<div class="testimonials-block <?php echo $additional_class; ?>">
	<div class="container testimonials-block__container">
        <div class="bubble bubble-1 rellax"></div> 
        <?php
            echo '<div class="testimonials-block__slider">';
            foreach($testimonials_list as $item){
                echo '<div class="item">';
                    echo '<div class="testimonials-block__testimonial">';
                        echo '<div class="testimonials-block__content">';
                        echo '<p class="testimonials-block__text"><span class="quote-start"></span>'.$item['testimonial'].'<span class="quote-end"></span></p>';
                        echo '<h3 class="testimonials-block__full-name">'.$item['full_name'].'</h3>';
                        echo '<span class="testimonials-block__from">'.$item['from'].'</span>';
                        echo '</div>';
                        echo '<div class="testimonials-block__image-wrapper">';
                            echo '<img src="#" data-src="'.$item['image']['url'].'" alt="'.$item['image']['alt'].'" width="'.$item['image']['width'].'" height="'.$item['image']['height'].'" class="testimonials-block__image lozad" />';
                        echo '</div>';
                    echo '</div>';
                echo '</div>';
            }
            echo '</div>';
        ?>
	</div>
</div>
<?php
    }
?>

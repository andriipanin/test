<?php
/**
 * Block Name: Image with content block
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
$side_image_url           = getFieldValue($page_fields, 'side_image');
$side_image_url_mobile    = getFieldValue($page_fields, 'side_image_mobile');
$reversed_block_check     = getFieldValue($page_fields, 'is_it_reversed_block');
$title                    = getFieldValue($page_fields, 'title_block');
$small_text               = getFieldValue($page_fields, 'small_text');
$main_content             = getFieldValue($page_fields, 'main_content');
$full_width_content       = getFieldValue($page_fields, 'content_for_full_width_section');
$block_style           = getFieldValue($page_fields, 'block_style');
$add_json_animation           = getFieldValue($page_fields, 'add_json_animation');
$json_file           = getFieldValue($page_fields, 'json_file');
$id = rand(000,999);
$reversed_block_check     = $reversed_block_check ? 'block-revert' : '';
$small_text               = $small_text ? 'small-text' : '';

$image_desktop = '';
if ($side_image_url_mobile) {
	$image_desktop = 'content-image-block__image_desktop';
}

if($block_style == 2){
    $additional_class .= ' content-style-block-fish';
}elseif($block_style == 3){
    $additional_class .= ' content-style-block-bubbles';
}
if (getFieldValue($page_fields, 'waves')) {
    $additional_class .= ' wave-block ';
}
$background_color = getFieldValue($page_fields, 'background_color') ?? 'white';
$additional_class .= " background-{$background_color} ";
?>

<div class="content-image-block <?php echo $additional_class; ?>">
	<div class="container content-image-block__container">
        <?php
        	if($block_style == 3 || $block_style == 2){
				echo '
				<div class="bubble bubble-1 rellax"></div> 
				<div class="bubble bubble-2 rellax" data-rellax-speed="-2"></div> 
				';
			}
            if($block_style == 2){
				echo '
				<div class="fish fish-1 rellax" data-rellax-speed="-3"></div> 
				';
			}
            if ( $title ) {
                echo '<h2 class="content-image-block__title wow animate__fadeInUp">'.do_shortcode($title).'</h2>';
            }
        ?>
		<div class="content-image-block__sides-sections flex-block <?php echo $reversed_block_check; ?>">
			<?php
            
                echo '<figure class="content-image-block__side-image flex-block-image">';
                    if($add_json_animation == true){
                        echo '<div class="content-image-block__side-svg svg-json-animation" data-file="'.$json_file['url'].'"></div>';
                    }elseif ( $side_image_url  || $side_image_url_mobile) {
                        if($side_image_url) {
                            echo '<img class="content-image-block__image '.$image_desktop.' lozad"  src="#" data-src="'.$side_image_url['url'].'" width="'.$side_image_url['width'].'" height="'.$side_image_url['height'].'" alt="'.$side_image_url['alt'].'" />';
                        }
                        if($side_image_url_mobile) {
                            echo '<img class="content-image-block__image content-image-block__image_mobile lozad"  src="#" data-src="'.$side_image_url_mobile['url'].'" width="'.$side_image_url_mobile['width'].'" height="'.$side_image_url_mobile['height'].'" alt="'.$side_image_url_mobile['alt'].'" />';
                        }
                    }      
                echo '</figure>';
            

            if ( $main_content ) {
			    echo '<div class="content-image-block__main-content flex-block-content wow animate__fadeInUp '.$small_text.'">';
                    echo ( $main_content ) ? do_shortcode( wpautop($main_content) ) : '';
                echo '</div>';
            }
            ?>
             <?php if ( $full_width_content ) { ?>
                <div class="content-image-block__full-width-content">
                    <?php
                    echo ( $full_width_content ) ? do_shortcode( wpautop($full_width_content) ) : ''; ?>
                </div>
            <?php } ?>
		</div>
       
	</div>
</div>
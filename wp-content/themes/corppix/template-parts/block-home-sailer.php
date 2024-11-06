<?php
/**
 * Block Name: Sailer block
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
$title                    = getFieldValue($page_fields, 'home_title_block');
$main_content             = getFieldValue($page_fields, 'home_main_content');
$json_file           = getFieldValue($page_fields, 'home_json_file');

?>

<div class="sailer-block <?php echo $additional_class; ?>">
	<div class="container sailer-block__container">
		<div class="sailer-block__sides-sections flex-block <?php echo $reversed_block_check; ?>">
			<?php
                echo '
                    <div class="bubble bubble-1 rellax"></div> 
                    <div class="bubble bubble-2 rellax"></div> 
                ';
                echo '<figure class="sailer-block__side-image  flex-block-image">';
                    if($json_file){
                        echo '<div class="sailer-block__side-svg svg-json-animation" data-file="'.$json_file['url'].'"></div>';
                    }
                    
                echo '</figure>';
            

            if ( $main_content ) {
			    echo '<div class="sailer-block__main-content flex-block-content wow animate__fadeInUp">';
                    if ( $title ) {
                        echo '<h2 class="sailer-block__title">'.do_shortcode($title).'</h2>';
                    }
                    echo ( $main_content ) ? do_shortcode( wpautop($main_content) ) : '';
                echo '</div>';
            }
            ?>
		</div>
       
	</div>
</div>
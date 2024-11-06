<?php
/**
 * Block Name: Team block
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
$team_repeater            = getFieldValue($page_fields, 'team_repeater');

?>

<div class="team-block <?php echo $additional_class; ?>">
	<div class="container team-block__container">
        <?php
            if ( $title ) {
                echo '<div class="team-block__title wow animate__fadeInUp">'.do_shortcode($title).'</div>';
            }
        ?>
		<div class="team-block__content">
			<?php
            if ( $team_repeater ) {
                foreach ( $team_repeater as $team_item ) {
                    $item_image         = $team_item['image'];
	                $item_image_mobile  = $team_item['image_mobile'];
	                $item_image_hover   = $team_item['image_hover'];
	                $item_content       = $team_item['team_content'];
	                $reversed_block_check     = $team_item['reversed_block_check'];
	                $reversed_block_check     = $reversed_block_check ? 'block-revert' : '';
	                
	                echo '<div class="team-block__item '.$reversed_block_check.' " style="background-image:url('.$item_image_hover.');">';
                        if ( $item_image || $item_image_mobile) {
                            echo '<figure class="team-block__side-image">';
                            if($item_image) {
	                            echo '<img class="team-block__image lozad" src="#" data-src="'.$item_image.'" alt="side image" />';
                            }
	                        if($item_image_mobile) {
		                        echo '<img class="team-block__image team-block__image_mobile lozad"  src="#" data-src="'.$item_image_mobile.'" alt="side image" />';
	                        }
                          echo '</figure>';
                        }
                        if ( $item_content ) {
                            echo '<div class="team-block__main-content">';
                            echo ( $item_content ) ? do_shortcode( wpautop($item_content) ) : '';
                            echo '</div>';
                        }
	                echo '</div>';
                }
            }
            
            ?>
		</div>
	</div>
</div>
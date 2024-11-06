<?php
/**
 * Block Name: Tab content block
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
$tabs                     = getFieldValue($page_fields, 'tabs');

?>

<div class="tabs-block <?php echo $additional_class; ?>">
	<div class="tabs-block__container">
        <?php
            if ( $title ) {
                echo '<h2 class="tabs-block__title wow animate__fadeInUp">'.do_shortcode($title).'</h2>';
            }
        ?>
        <div class="tabs-block__buttons-wrapper">
            <div class="container tabs-block__buttons js-tabs-block-buttons">
                <?php
                    if ( $tabs ) {
                        foreach ( $tabs as $key => $tab ) {
                            $active = '';
                            if ($key===0) {
                                $active = 'active';
                            }
                            $tab_title = $tab['tab_title'];
                            echo '<button data-href="#tab'.++$key.'" class="tabs-block__item-button js-tabs-nav-btn '.$active.'">'.do_shortcode($tab_title).'</button>';
                        }
                    }
                ?>
            </div>
        </div>
        <div class="tabs-block__content">
			<?php
			if ( $tabs ) {
				foreach ( $tabs as $key_panel => $tab ) {
					$tab_content = $tab['tab_content'];
					$active_panel = '';
					if ($key_panel===0) {
						$active_panel = 'active';
					}
					
					echo '<div id="tab'.++$key_panel.'" class="tabs-block__item-content js-tabs-nav-panel '.$active_panel.'">';
                        if( $tab_content ) {
                         
	                        foreach ( $tab_content as $tab_content_item ) {
		                        
		                        $side_image_url           = $tab_content_item['image'];
		                        $reversed_block_check     = $tab_content_item['reversed_block'];
		                        $main_content             = $tab_content_item['main_content'];
		                        $white_background         = $tab_content_item['white_background'];
		                        $block_style              = $tab_content_item['bubbles'];
		                        $reversed_block_check     = $reversed_block_check ? 'block-revert' : '';
		                        $white_background         = $white_background ? 'white-background' : '';
		                        $bubbles_class = '';
		                        if($block_style == 2){
			                        $bubbles_class .= ' content-style-block-type1';
		                        }elseif($block_style == 3){
			                        $bubbles_class .= ' content-style-block-type2';
		                        }
		                        
		                        echo '<div class="tabs-block__content-item '.$white_background.'">';
                                    echo '<div class="container tabs-block__content-container '.$reversed_block_check.'">';
                                    if ( $side_image_url ) {
                                        echo '<figure class="tabs-block__side-image '.$bubbles_class.'">';
                                        if($block_style == 3){
                                            echo '<div class="bubble-type bubble-type2 rellax" data-rellax-speed="-2"></div>';
//                                                  <div class="bubble bubble-2 rellax" data-rellax-speed="-2"></div>';
                                        }
                                        if($block_style == 2){
                                            echo '<div class="bubble-type rellax" data-rellax-speed="-3"></div>';
                                        }
                                        echo ' <img class="tabs-block__image lozad" src="#" data-src="'.$side_image_url.'" alt="side image" />
                                                          </figure>';
                                    }
            
                                    if ( $main_content ) {
                                        echo '<div class="tabs-block__main-content wow animate__fadeInUp">';
                                        echo ( $main_content ) ? do_shortcode( wpautop($main_content) ) : '';
                                        echo '</div>';
                                    }
                                    echo '</div>';
		                        echo '</div>';
                            }
                        }
					echo '</div>';
				}
			}
			?>
        </div>
	</div>
</div>
<?php
/**
 * Block Name: Cutting edge technology content block
 *
 * @param array $block The block settings and attributes.
 * @param string $content The block inner HTML (empty).
 * @param bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

$page_fields = get_fields();
$post_id     = get_queried_object_id();
$randId = rand(000,999);
// Getting block fields
$additional_class = ( isset($block['className']) ) ? $block['className'] : '';
$edge_title = getFieldValue($page_fields, 'edge_title');
$edge_text = getFieldValue($page_fields, 'edge_text');
$edge_link = getFieldValue($page_fields, 'edge_link');
$edge_list = getFieldValue($page_fields, 'edge_list');

?>

<div class="cutting-edge-technology <?php echo $additional_class; ?>">
	<div class="cutting-edge-technology__container">
        <div class="cutting-edge-technology__mobile">
        <?php
            if($edge_title){
                echo '<h2 class="cutting-edge-technology__title">'.$edge_title.'</h2>';
            }
            if($edge_text){
                echo '<p class="cutting-edge-technology__text">'.$edge_text.'</p>';
            }
        ?>
        </div>
        <div class="cutting-edge-technology__phone-container">
            <?php
            if($edge_list){
                $c = 0;
                foreach($edge_list as $item){
                    echo '<div class="cutting-edge-technology__phone-btn-container cutting-edge-technology__phone-btn-container-'.$c.' cutting-edge-technology__phone-btn-container-'.$randId.($c == 0 ? ' active' : '').'" id="cutting-edge-'.$randId.'-'.$c.'">
                        <p class="cutting-edge-technology__phone-btn-text">'.$item['title'].'</p>
                        <button type="button" class="cutting-edge-technology__phone-btn cutting-edge-technology__phone-btn-'.$randId.($c == 0 ? ' active' : '').'" data-slide="'.$c.'" data-id="'.$randId.'">
                            <img src="#" data-src="'.$item['icon']['url'].'" alt="'.$item['icon']['alt'].'" width="'.$item['icon']['width'].'" height="'.$item['icon']['height'].'" class="lozad cutting-edge-technology__phone-btn-icon" />
                        </button>
                    </div>';
                    echo '';
                    $c++;
                }
            } 
            ?>
            <div class="cutting-edge-technology__phone">
                <div class="cutting-edge-technology__phone-tile">
                    <img src="#" data-src="<?php echo get_template_directory_uri(); ?>/build/img/tile.png" alt="Phone" width="243" height="185" class="lozad cutting-edge-technology__phone-tile-img" />
                </div>
                <img src="#" data-src="<?php echo get_template_directory_uri(); ?>/build/img/phone-frame.png" alt="Phone" width="230" height="431" class="lozad cutting-edge-technology__phone-frame" />
                <div class="cutting-edge-technology__phone-images">
                    <div class="cutting-edge-technology__phone-images-wrapper">
                    <?php
                        if($edge_list){
                            $c = 0;
                            foreach($edge_list as $item){
                                echo '<img src="#" data-src="'.$item['image']['url'].'" alt="'.$item['image']['alt'].'" width="'.$item['image']['width'].'" height="'.$item['image']['height'].'" class="lozad cutting-edge-technology__phone-image cutting-edge-technology__phone-image-'.$randId.' cutting-edge-technology__phone-image-'.$randId.'-'.$c.($c == 0 ? ' active' : '').'" />';
                                $c++;
                            }
                        } 
                    ?>
                    </div>
                </div>
            </div> 
        </div>   
        <div class="cutting-edge-technology__content-container">
            <?php
                if($edge_title){
                    echo '<h2 class="cutting-edge-technology__title cutting-edge-technology__title-desctop">'.$edge_title.'</h2>';
                }
                if($edge_text){
                    echo '<p class="cutting-edge-technology__text cutting-edge-technology__text-desctop">'.$edge_text.'</p>';
                }
            ?>
            <div class="cutting-edge-technology__wave"></div>
            <?php
                if($edge_list){
                    echo '<div class="cutting-edge-technology__slider" id="cutting-edge-slider-'.$randId.'" data-id="'.$randId.'">';
                    foreach($edge_list as $item){
                        echo '<div class="item">';
                            echo '<div class="cutting-edge-technology__slider-content">';
                               echo '<h3 class="cutting-edge-technology__slider-title">'.$item['title'].'</h3>'; 
                               echo '<p class="cutting-edge-technology__slider-text">'.$item['text'].'</p>'; 
                            echo '</div>';
                        echo '</div>';
                    }
                    echo '</div>';
                }
                
                if($edge_link){
                    echo '<div class="cutting-edge-technology__link-wrapper">
                        <a class="btn-primary cutting-edge-technology__link" href="'.$edge_link['url'].'"'.($edge_link['target'] ? ' target="_blank"' : '').'>'.$edge_link['title'].'</a>
                    </div>';
                }
            ?>
        </div>     
	</div>
</div>
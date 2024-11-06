<?php
/**
 * Block Name: Hop onboard content block
 *
 * @param array $block The block settings and attributes.
 * @param string $content The block inner HTML (empty).
 * @param bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

$page_fields = get_fields();
$post_id     = get_queried_object_id();

// Getting block fields
$additional_class = ( isset($block['className']) ) ? $block['className'] : '';
$hop_title = getFieldValue($page_fields, 'hop_title');
$hop_text = getFieldValue($page_fields, 'hop_text');
$hop_link = getFieldValue($page_fields, 'hop_link');
$hop_json_file = getFieldValue($page_fields, 'hop_json_file');
$hop_json_file_mobile = getFieldValue($page_fields, 'hop_json_file_mobile');
$hop_list = getFieldValue($page_fields, 'hop_list');

?>

<div class="hop-onboard <?php echo $additional_class; ?>">
	<div class="container hop-onboard__container">
        <div class="bubble bubble-1 rellax"></div>
        <div class="hop-onboard__content">
        <?php
            if($hop_title){
                echo '<h2 class="hop-onboard__title">'.$hop_title.'</h2>';
            }
            if($hop_text){
                echo '<p class="hop-onboard__text">'.$hop_text.'</p>';
            }
            if($hop_link){
                echo '<div class="hop-onboard__link-wrapper hop-onboard__link-wrapper-desctop">
                    <a class="btn-primary hop-onboard__link" href="'.$hop_link['url'].'"'.($hop_link['target'] ? ' target="_blank"' : '').'>'.$hop_link['title'].'</a>
                </div>';
            }
        ?> 
        </div>
        <div class="hop-onboard__list">
        <?php
            if($hop_json_file){
                echo '<div class="hop-onboard__svg hop-onboard__svg-desctop svg-json-animation" data-file="'.$hop_json_file['url'].'"></div>';
            }
            if($hop_list){
                foreach($hop_list as $item){
                    echo '<div class="hop-onboard__list-item">';
                        echo '<div class="hop-onboard__list-icon-block">
                            <img src="#" data-src="'.$item['icon']['url'].'" alt="'.$item['icon']['alt'].'" width="'.$item['icon']['width'].'" height="'.$item['icon']['height'].'" class="lozad hop-onboard__list-icon" />
                        </div>';
                        echo '<div class="hop-onboard__list-content">';
                            if($item['title']){
                                echo '<h2 class="hop-onboard__list-title">'.$item['title'].'</h2>';
                            }
                            if($item['text']){
                                echo '<p class="hop-onboard__list-text">'.$item['text'].'</p>';
                            } 
                        echo '</div>';
                    echo '</div>';
                }
            }
        ?>
        </div>
        <?php
        if($hop_json_file_mobile){
            echo '<div class="hop-onboard__svg hop-onboard__svg-mobile svg-json-animation" data-file="'.$hop_json_file_mobile['url'].'"></div>';
        }
        if($hop_link){
            echo '<div class="hop-onboard__link-wrapper hop-onboard__link-wrapper-mobile">
                <a class="btn-primary hop-onboard__link" href="'.$hop_link['url'].'"'.($hop_link['target'] ? ' target="_blank"' : '').'>'.$hop_link['title'].'</a>
            </div>';
        }
        ?>
	</div>
</div>
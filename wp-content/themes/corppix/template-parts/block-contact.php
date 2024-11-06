<?php
/**
 * Block Name: Contact block
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
$contact_repeater         = getFieldValue($page_fields, 'contact_repeater');
$item_background          = getFieldValue($page_fields, 'item_background');
$contact_form             = getFieldValue($page_fields, 'contact_form');
?>

<div class="contact-block <?php echo $additional_class; ?>">
	<div class="container contact-block__container">
        <?php
            if ( $title ) {
                echo '<h2 class="contact-block__title wow animate__fadeInUp">'.do_shortcode($title).'</h2>';
            }
        ?>
        
        <div class="contact-block__content">
            <?php
                if ( $contact_repeater ) {
                    foreach ( $contact_repeater as $key => $contact_item ) {
                     
	                    $item_icon         = $contact_item['icon'];
	                    $item_info         = $contact_item['info'];
                        
                        echo '<div class="contact-block__item contact-block__item_'.++$key.'">';
                            if ( $item_background ) {
                                echo '<img class="style-svg contact-block__item-image" src="'.$item_background.'" alt="contact image" />';
                            }
	                    echo '<div class="contact-block__item-content">';
                            if ( $item_icon ) {
                                echo '<figure class="contact-block__icon-wrapper">';
                                echo '<img class="style-svg contact-block__item-icon" src="' . $item_icon . '" alt="contact icon" />';
                                echo '</figure>';
                            }
                            echo '<div class="contact-block__item-info">'.$item_info.'</div>';
	                    echo '</div>';
                        echo '</div>';
                        
                    }
                }
                
                ?>
		</div>
	</div>
</div>

<?php
    if($contact_form) {
	    echo do_shortcode('[popup_box box_id="get-contact-form-popup"]'.do_shortcode($contact_form).'[/popup_box]');
    }
    global $global_options;
    $states_list = getFieldValue($global_options, 'states_list');
?>
<script>
    let state_list = {
        <?php  
            foreach($states_list as $state){
                echo $state['state_abbreviation'].':'.$state['selling_insurance'].',';
            }    
        ?>
    }
</script>

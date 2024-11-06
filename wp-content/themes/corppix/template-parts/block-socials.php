<?php
/**
 * Block Name: Socials block
 *
 * @param array $block The block settings and attributes.
 * @param string $content The block inner HTML (empty).
 * @param bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

$page_fields = get_fields();
$post_id     = get_queried_object_id();

global $global_options;
// Getting block fields
$additional_class           = ( isset($block['className']) ) ? $block['className'] : '';
$title                      = getFieldValue($page_fields, 'socials_title');
$social_links_repeater      = getFieldValue($global_options, 'social_links');
$socials_background         = getFieldValue($page_fields, 'socials_background');
$small_icons         = getFieldValue($page_fields, 'small_icons');
if($small_icons == true){
    $additional_class .= ' small-icons';
}
?>

<div class="socials-block <?php echo $additional_class; ?>">
	<div class="container socials-block__container">
        <?php
            if($small_icons == true){
                echo '
                    <div class="bubbels bubbels-1 rellax"></div>
                    <div class="bubbels bubbels-2 rellax"></div>
                    <div class="bubbels bubbels-3 rellax"></div>
                    <div class="bubbels bubbels-4 rellax"></div>
                    <div class="bubbels bubbels-5 rellax"></div>
                    <div class="bubbels bubbels-6 rellax"></div>
                ';
            }
            if ( $title ) {
                echo '<h2 class="socials-block__title wow animate__fadeInUp">'.do_shortcode($title).'</h2>';
            }
        ?>
        <?php if ( $social_links_repeater ) { ?>
            
            <div class="socials-block__social-links">
                <?php
                foreach ( $social_links_repeater as $item ) {
                    $link  = $item['link'];
                    $name  = $item['name'];
                    ?>
                    <a href="<?php echo $link; ?>"
                       target="_blank"
                       class="socials-block__social-link social-link socials-block__social-link_<?php echo strtolower($name); ?>">
                    </a>
                <?php } ?>
            </div>
        <?php } ?>
	</div>
</div>
<?php
/**
 * Block Name: Top Banner block
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
$image_url                = getFieldValue($page_fields, 'banner_image');
$image_url_mobile                = getFieldValue($page_fields, 'banner_image_mobile');
$use_featured_image_check = getFieldValue($page_fields, 'use_featured_image_as_banner_image');
$hide_bottom_wave                  = getFieldValue($page_fields, 'hide_bottom_wave');
$content                  = getFieldValue($page_fields, 'content');
$is_video            = getFieldValue($page_fields, 'add_video');
$video_list               = getFieldValue($page_fields, 'video_list');
// Getting featured image
$featured_image     = wp_get_attachment_image_src( get_post_thumbnail_id( $post_id ), 'full' );
$featured_image_url = ( is_array($featured_image) && !empty($featured_image) ) ? $featured_image[0] : '';
$id = rand(000,999);

// Getting featured image
$featured_image     = wp_get_attachment_image_src( get_post_thumbnail_id( $post_id ), 'full' );
$featured_image_url = ( is_array($featured_image) && !empty($featured_image) ) ? $featured_image[0] : '';

// Getting final image URL
$banner_image_url   = ( $image_url ) ?: ( $featured_image_url ) ?: '';
$detect = new Mobile_Detect;
// Any mobile device (phones or tablets).
if ( $detect->isMobile() && !$detect->isTablet() && $image_url_mobile ) {
    $banner_image_url = $image_url_mobile;
}
if ( $is_video && $video_list ) {
    $additional_class .= ' top-banner-video';
}
if ( $hide_bottom_wave ) {
    $additional_class .= ' hide-wave';
}
if(is_front_page()){
    $additional_class .= ' home-banner';
}
?>

<div class="top-banner <?php echo $additional_class; ?>">
    <?php
    if ( $is_video && $video_list ) {
        $i = rand(0, count($video_list) - 1);
        $video['url'] = $video_list[$i]['video']['url'];
        $video['poster'] = $video_list[$i]['video_poster']['url'];
        if ( $detect->isMobile() && !$detect->isTablet() && !empty($video_list[$i]['video_mobile']) && !empty($video_list[$i]['video_poster_mobile']) ) {
            $video['url'] = $video_list[$i]['video_mobile']['url'];
            $video['poster'] = $video_list[$i]['video_poster_mobile']['url'];
        }
        echo '
        <video class="top-banner__video'.($video_list[$i]['flip_video'] ? ' flip' : '').' lozad" playsinline autoplay="autoplay" muted="muted" loop="loop" preload="none" id="video-'.$id.'" data-poster="'.$video['poster'].'">
            <source src="#" data-src="'.$video['url'].'" type="video/mp4" />
        </video>
        ';
    }else{
        if ( $banner_image_url ) {
            echo '<img src="#" data-src="'.$banner_image_url.'" alt="top image" class="top-banner__image lozad" />';
        }
    }
    /*if(is_front_page()){
        echo '<div class="scroll-hint"></div>';
    }*/
    ?>

	<div class="container top-banner__container">
		<div class="top-banner__content wow animate__fadeInUp">
			<?php
            echo ( $content ) ? do_shortcode( wpautop($content) ) : ''; ?>
		</div>

	</div>
</div>


<?php
// Show "get-a-quote-video" popup
/*if ( $video_link ) {
    echo do_shortcode('[popup_box box_id="get-a-quote-video-popup"]'.$video_link.'[/popup_box]');
}*/
?>
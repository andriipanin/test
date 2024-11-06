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
// Getting block fields
$image_url                = getFieldValue($page_fields, 'careers_image');
$image_url_mobile                = getFieldValue($page_fields, 'careers_image_mobile');

$title                  = getFieldValue($page_fields, 'careers_title');
$banner_image_url = $image_url;
$detect = new Mobile_Detect;
// Any mobile device (phones or tablets).
if ( $detect->isMobile() && !$detect->isTablet() && $image_url_mobile ) {
    $banner_image_url = $image_url_mobile;
}
?>

<div class="top-banner careers-top-banner">
    <?php
    if ( $banner_image_url ) {
        echo '<img src="#" data-src="'.$banner_image_url.'" alt="top image" class="top-banner__image careers-top-banner__image lozad" />';
    }
    ?>
	<div class="container top-banner__container careers-top-banner__container">
		<div class="top-banner__content careers-top-banner__content wow animate__fadeInUp">
			<?php
            echo '<h1 class="careers-top-banner__title">'.do_shortcode( $title ).'</h1>'; ?>
		</div>
	</div>
</div>
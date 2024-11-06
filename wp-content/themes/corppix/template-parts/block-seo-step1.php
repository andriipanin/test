<?php
/**
 * Block Name: SEO Page Hero Screen
 *
 * @param array $block The block settings and attributes.
 * @param string $content The block inner HTML (empty).
 * @param bool $is_preview True during AJAX preview.
 * @param (int|string) $post_id The post ID this block is saved to.
 */

// Get block fields
$image_url = get_field('hero_image');
$image_url_mobile = get_field('mobile_image');
$small_title = get_field('small_title');
$big_title = get_field('big_title');
$paragraph = get_field('paragraph');
$button = get_field('button');

$detect = new Mobile_Detect;
// Any mobile device (phones or tablets).
if ( $detect->isMobile() && !$detect->isTablet() && $image_url_mobile ) {
    $image_url = $image_url_mobile;
}
?>

<div class="hero-screen">
    <?php if ($image_url) : ?>
    <div class="hero-container-img">
        <img  class="hero_img" src="<?php echo esc_url($image_url); ?>" alt="Hero Image">
    </div>
    <?php endif; ?>
    <div class="container hero-wrap-container">
    <div class="hero-wrap-content">
    <?php if ($small_title) : ?>
        <h3 class="hero-wrap-content__small-title"><?php echo esc_html($small_title); ?></h3>
    <?php endif; ?>

    <?php if ($big_title) : ?>
        <h1 class="hero-wrap-content__big-title"><?php echo esc_html($big_title); ?></h1>
    <?php endif; ?>

    <?php if ($paragraph) : ?>
        <p class="hero-wrap-content__paragraph"><?php echo esc_html($paragraph); ?></p>
    <?php endif; ?>

    <?php if ($button) : ?>
        <a href="<?php echo esc_url($button['url']); ?>" class="hero-wrap-content__button btn-primary"><?php echo esc_html($button['title']); ?></a>
    <?php endif; ?>
    </div>
    </div>
</div>

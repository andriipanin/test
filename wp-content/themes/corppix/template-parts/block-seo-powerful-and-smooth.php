<?php
/**
 * Block Name: SEO Page Powerful and Smooth
 *
 * @param array $block The block settings and attributes.
 * @param string $content The block inner HTML (empty).
 * @param bool $is_preview True during AJAX preview.
 * @param (int|string) $post_id The post ID this block is saved to.
 */

// Get block fields
$title = get_field('title');
$paragraph = get_field('paragraph');
$image_url = get_field('image');
$note = get_field('note');
?>

<div class="seo-section curve">
    <div class="seo-section__container container">
        <div class="seo-section__content">
            <div class="seo-section__content-image">
                <?php if ($image_url) : ?>
                    <div class="seo-section__image-wrapper">
                        <img class="seo-section__image" src="<?php echo esc_url($image_url); ?>" alt="icon">
                    </div>
                <?php endif; ?>
            </div>
            <div class="seo-section__content-text">
                <?php if ($title) : ?>
                    <h3 class="seo-section__title"><?php echo esc_html($title); ?></h3>
                <?php endif; ?>
                <?php if ($paragraph) : ?>
                    <p class="seo-section__paragraph"><?php echo esc_html($paragraph); ?></p>
                <?php endif; ?>
            </div>
        </div>
        <?php if ($note) : ?>
            <span class="seo-section__span"><?php echo esc_html($note); ?></span>
        <?php endif; ?>
    </div>
</div>


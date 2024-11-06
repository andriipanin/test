<?php
/**
 * Block Name: SEO Page Just the Right Size
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

?>
<div class="right-size">
  <div class="right-size__container container">
    <div class="right-size__content">
      <div class="right-size__content-left">
        <?php if ($title) : ?>
          <h3 class="right-size__title"><?php echo esc_html($title); ?></h3>
        <?php endif; ?>
        <?php if ($paragraph) : ?>
          <p class="right-size__paragraph"><?php echo esc_html($paragraph); ?></p>
        <?php endif; ?>
      </div>
      <div class="right-size__content-right">
        <?php if ($image_url) : ?>
         <div class="right-size__image-wrapper">
          <img class="right-size__image" src="<?php echo esc_url($image_url); ?>" alt="icon">
          </div>
        <?php endif; ?>
      </div>
    </div>
  </div>
</div>


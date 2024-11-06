<?php
/**
 * Block Name: SEO Page Cabin Cruiser Insurance
 *
 * @param array $block The block settings and attributes.
 * @param string $content The block inner HTML (empty).
 * @param bool $is_preview True during AJAX preview.
 * @param (int|string) $post_id The post ID this block is saved to.
 */

// Get block fields
$title = get_field('title');
$text = get_field('text');
$image_url = get_field('image');

?>
<div class="cabin-cruiser-section">
   <div class="cabin-cruiser container">
    <?php if ($title) : ?>
        <h3 class="cabin-cruiser-title"><?php echo esc_html($title); ?></h3>
    <?php endif; ?>
  <div class="cruiser-wrap-content">
      <div class="cruiser-wrap-content__text">
          <?php if ($text) : ?>
              <p><?php echo $text; ?></p>
          <?php endif; ?>
      </div>
      <div class="cruiser-wrap-content__image">
          <?php if ($image_url) : ?>
              <div class="pelican-wrap-img">
                  <img src="<?php echo esc_url($image_url); ?>" alt="Hero Image">
              </div>
          <?php endif; ?>
      </div>
  </div>
  </div>
</div>

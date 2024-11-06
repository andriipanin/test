<?php
/**
 * Block Name: SEO Page The Cozy cabin
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
<div class="cozy-cabin curve-block">
  <div class="cozy-cabin__container container">
    <div class="cozy-cabin__content">
      <div class="cozy-cabin__content-image">
      <?php if ($image_url) : ?>
        <div class="cozy-cabin__image-wrapper">
          <img class="cozy-cabin__image" src="<?php echo esc_url($image_url); ?>" alt="icon">
        </div>
      <?php endif; ?>
      </div>
      <div class="cozy-cabin__text">
        <?php if ($title) : ?>
          <h3 class="cozy-cabin__title"><?php echo esc_html($title); ?></h3>
        <?php endif; ?>

        <?php if ($paragraph) : ?>
          <p class="cozy-cabin__description"><?php echo esc_html($paragraph); ?></p>
        <?php endif; ?>
      </div>
    </div>
  </div>
</div>


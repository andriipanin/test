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
$flip_block_check = get_field('flip_content');
$flip_block_check = $flip_block_check ? 'flip-flop' : '';
$background_color = get_field('background_color') ?? 'white';
$additional_class = ( isset($block['className']) ) ? $block['className'] : '';
$additional_class .= " background-{$background_color} ";

?>
<div class="block-seo-step2-section <?php echo $additional_class; ?>">
   <div class="block-seo-step2 container">
    <?php if ($title) : ?>
        <h3 class="block-seo-step2-title"><?php echo esc_html($title); ?></h3>
    <?php endif; ?>
  <div class="block-seo-step2-wrap-content <?php echo $flip_block_check; ?>">
      <div class="block-seo-step2-wrap-content__text">
          <?php if ($text) : ?>
              <?php echo $text; ?>
          <?php endif; ?>
      </div>
      <div class="block-seo-step2-wrap-content__image">
          <?php if ($image_url) : ?>
              <div class="pelican-wrap-img">
                  <img src="<?php echo esc_url($image_url); ?>" alt="Hero Image">
              </div>
          <?php endif; ?>
      </div>
  </div>
  </div>
</div>

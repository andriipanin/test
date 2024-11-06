<?php
/**
 * Block Name: SEO Page Benefits for boaters
 *
 * @param array $block The block settings and attributes.
 * @param string $content The block inner HTML (empty).
 * @param bool $is_preview True during AJAX preview.
 * @param (int|string) $post_id The post ID this block is saved to.
 */

// Get block fields
$title = get_field('title');
$image_and_title1 = get_field('image_and_title1');
$image_and_title2 = get_field('image_and_title2');
$image_and_title3 = get_field('image_and_title3');
$background_color = get_field('background_color') ?? 'white';
$additional_class = ( isset($block['className']) ) ? $block['className'] : '';
$additional_class .= " background-{$background_color} ";

?>
<div class="benefits-section-boaters container <?php echo $additional_class; ?>">
  <?php if ($title) : ?>
    <h3 class="benefits-section-boaters__title"><?php echo esc_html($title); ?></h3>
  <?php endif; ?>

  <div class="benefits-section-boaters__wrap-icons">
    <?php if ($image_and_title1) : ?>
      <div class="benefits-section-boaters__container-content">
        <div class="benefits-section-boaters__benefit">
          <div class="benefits-section-boaters__icon">
            <?php if ($image_and_title1['icon1']) : ?>
              <img src="<?php echo esc_url($image_and_title1['icon1']); ?>" alt="Icon 1">
            <?php endif; ?>
          </div>
        </div>
        <div class="benefits-section-boaters__text">
          <?php if ($image_and_title1['description_icon1']) : ?>
            <p><?php echo esc_html($image_and_title1['description_icon1']); ?></p>
          <?php endif; ?>
        </div>
      </div>
    <?php endif; ?>

    <?php if ($image_and_title2) : ?>
      <div class="benefits-section-boaters__container-content">
        <div class="benefits-section-boaters__benefit">
          <div class="benefits-section-boaters__icon">
            <?php if ($image_and_title2['icon2']) : ?>
              <img src="<?php echo esc_url($image_and_title2['icon2']); ?>" alt="Icon 2">
            <?php endif; ?>
          </div>
        </div>
        <div class="benefits-section-boaters__text">
          <?php if ($image_and_title2['description_icon2']) : ?>
            <p><?php echo esc_html($image_and_title2['description_icon2']); ?></p>
          <?php endif; ?>
        </div>
      </div>
    <?php endif; ?>

    <?php if ($image_and_title3) : ?>
      <div class="benefits-section-boaters__container-content">
        <div class="benefits-section-boaters__benefit">
          <div class="benefits-section-boaters__icon">
            <?php if ($image_and_title3['icon3']) : ?>
              <img src="<?php echo esc_url($image_and_title3['icon3']); ?>" alt="Icon 3">
            <?php endif; ?>
          </div>
        </div>
        <div class="benefits-section-boaters__text">
          <?php if ($image_and_title3['description_icon3']) : ?>
            <p><?php echo esc_html($image_and_title3['description_icon3']); ?></p>
          <?php endif; ?>
        </div>
      </div>
    <?php endif; ?>
  </div>
</div>



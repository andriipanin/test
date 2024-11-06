<?php
/**
 * SEO step 4: Multiple Content boxes with wave
 *
 * @param array $block The block settings and attributes.
 * @param string $content The block inner HTML (empty).
 * @param bool $is_preview True during AJAX preview.
 * @param (int|string) $post_id The post ID this block is saved to.
 */

// Get block fields
$content_box_items = get_field('content');
$background_color = get_field('background_color') ?? 'white';
$additional_class = (isset($block['className'])) ? $block['className'] : '';
$additional_class .= " background-{$background_color} ";
$add_waves_check = get_field('add_waves');
$add_waves_check = $add_waves_check ? 'wave-block' : '';
?>

<div class="block-seo-step8-section <?php echo $add_waves_check; ?> <?php echo $additional_class; ?>">
    <div class="block-seo-step8-section__container container">
        <?php if ($content_box_items) : ?>
            <?php foreach ($content_box_items as $content_box) : ?>
                <?php
                $title = $content_box['title'];
                $paragraph = $content_box['paragraph'];
                $image_url = $content_box['image'];
                $note = $content_box['note'];
                $flip_block_check = $content_box['flip_content'];
                $flip_block_check = $flip_block_check ? 'flip_flop' : '';
                $cozy_cabin_content_class = !empty($title) ? 'block-seo-step8-section__content' : 'block-seo-step8-section__content__without_title';
                ?>
                <div class="<?php echo $cozy_cabin_content_class . ' ' . $flip_block_check; ?>">
                    <div class="block-seo-step8-section__content-image">
                        <?php if ($image_url) : ?>
                            <div class="block-seo-step8-section__image-wrapper">
                                <img class="block-seo-step8-section__image" src="<?php echo esc_url($image_url); ?>" alt="icon">
                            </div>
                        <?php endif; ?>
                    </div>
                    <div class="block-seo-step8-section__text">
                        <?php if ($title) : ?>
                            <h3 class="block-seo-step8-section__title"><?php echo esc_html($title); ?></h3>
                        <?php endif; ?>

                        <?php if ($paragraph) : ?>
                            <p class="block-seo-step8-section__description"><?php echo esc_html($paragraph); ?></p>
                        <?php endif; ?>


                    </div>
                </div>
                 <?php if ($note) : ?>
                      <span class="seo-section__span"><?php echo esc_html($note); ?></span>
                 <?php endif; ?>
            <?php endforeach; ?>
        <?php endif; ?>
    </div>
</div>

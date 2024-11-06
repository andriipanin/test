<?php
/**
 * Block Name: SEO step 7: Title + Image + Paragraph + Button
 *
 * @param array $block The block settings and attributes.
 * @param string $content The block inner HTML (empty).
 * @param bool $is_preview True during AJAX preview.
 * @param (int|string) $post_id The post ID this block is saved to.
 */

// Get block fields
$title = get_field('title');
$text_items = get_field('text');
$image_url = get_field('image');
$button = get_field('button');
$flip_block_check = get_field('flip_content');
$flip_block_check = $flip_block_check ? 'flip-flop' : '';
$background_color = get_field('background_color') ?? 'white';
$additional_class = ( isset($block['className']) ) ? $block['className'] : '';
$additional_class .= " background-{$background_color} ";

?>
<div class="block-seo-step7-section <?php echo $additional_class; ?>">
    <div class="block-seo-step7 container">
        <?php if ($title) : ?>
            <h3 class="block-seo-step7-title"><?php echo esc_html($title); ?></h3>
        <?php endif; ?>
        <div class="block-seo-step7-wrap-content <?php echo $flip_block_check; ?>">
            <div class="block-seo-step7__text">
                <?php if ($text_items) : ?>
                    <?php foreach ($text_items as $text) : ?>
                        <?php $paragraph = $text['paragraph']; ?>
                        <?php if ($paragraph) : ?>
                            <p><?php echo $paragraph; ?></p>
                        <?php endif; ?>
                    <?php endforeach; ?>
                    <?php if ($button) : ?>
                                <div class="block-seo-step7__wrap"><a href="<?php echo esc_url($button['url']); ?>" class="block-seo-step7__btn"><?php echo esc_html($button['title']); ?></a></div>
                            <?php endif; ?>
                <?php endif; ?>
            </div>
            <div class="block-seo-step7__image">
                <?php if ($image_url) : ?>
                    <div class="pelican-wrap-img">
                        <img src="<?php echo esc_url($image_url); ?>" alt="Hero Image">
                    </div>
                <?php endif; ?>
            </div>
        </div>

    </div>
</div>

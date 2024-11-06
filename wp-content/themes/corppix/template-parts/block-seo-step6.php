<?php
/**
 * Block Name: SEO step 6: Title + 4  icons + descriptions
 *
 * @param array $block The block settings and attributes.
 * @param string $content The block inner HTML (empty).
 * @param bool $is_preview True during AJAX preview.
 * @param (int|string) $post_id The post ID this block is saved to.
 */

// Get block fields
$title = get_field('title');
$step1 = get_field('step1');
$step2 = get_field('step2');
$step3 = get_field('step3');
$step4 = get_field('step4');
$background_color = get_field('background_color') ?? 'white';
$additional_class = ( isset($block['className']) ) ? $block['className'] : '';
$additional_class .= " background-{$background_color} ";

?>
<div class="step-section <?php echo $additional_class; ?>">
<div class="step-by-step-guide container">
    <?php if ($title) : ?>
        <h3 class="step-main-title"><?php echo esc_html($title); ?></h3>
    <?php endif; ?>
<div class="step-list">
    <?php if ($step1) : ?>
        <div class="step">
        <div class="step-icon">
            <?php if ($step1['image1']) : ?>
                <img src="<?php echo esc_url($step1['image1']); ?>" alt="Step 1 Image">
            <?php endif; ?>
        </div>
             <?php if ($step1['step_title1']) : ?>
                            <h4 class="step-title"><?php echo esc_html($step1['step_title1']); ?></h4>
                        <?php endif; ?>
                        <?php if ($step1['step_description1']) : ?>
                            <span class="step-title"><?php echo esc_html($step1['step_description1']); ?></span>
                        <?php endif; ?>
            <?php if ($step1['paragraph1']) : ?>
                <p class="step-description"><?php echo esc_html($step1['paragraph1']); ?></p>
            <?php endif; ?>
        </div>
    <?php endif; ?>

    <?php if ($step2) : ?>
        <div class="step">
         <div class="step-icon">
            <?php if ($step2['image2']) : ?>
                <img src="<?php echo esc_url($step2['image2']); ?>" alt="Step 2 Image">
            <?php endif; ?>
         </div>
            <?php if ($step2['step_title2']) : ?>
                            <h4 class="step-title"><?php echo esc_html($step2['step_title2']); ?></h4>
                        <?php endif; ?>
                        <?php if ($step2['step_description2']) : ?>
                            <span class="step-title"><?php echo esc_html($step2['step_description2']); ?></span>
                        <?php endif; ?>
            <?php if ($step2['paragraph2']) : ?>
                <p class="step-description"><?php echo esc_html($step2['paragraph2']); ?></p>
            <?php endif; ?>
        </div>
    <?php endif; ?>

    <?php if ($step3) : ?>
        <div class="step">
         <div class="step-icon">
            <?php if ($step3['image3']) : ?>
                <img src="<?php echo esc_url($step3['image3']); ?>" alt="Step 3 Image">
            <?php endif; ?>
            </div>
             <?php if ($step3['step_title3']) : ?>
                            <h4 class="step-title"><?php echo esc_html($step3['step_title3']); ?></h4>
                        <?php endif; ?>
                        <?php if ($step3['step_description3']) : ?>
                            <span class="step-title"><?php echo esc_html($step3['step_description3']); ?></span>
                        <?php endif; ?>
            <?php if ($step3['paragraph3']) : ?>
                <p class="step-description"><?php echo esc_html($step3['paragraph3']); ?></p>
            <?php endif; ?>
        </div>
    <?php endif; ?>

    <?php if ($step4) : ?>
        <div class="step">
         <div class="step-icon">
            <?php if ($step4['image4']) : ?>
                <img src="<?php echo esc_url($step4['image4']); ?>" alt="Step 4 Image">
            <?php endif; ?>
            </div>
            <?php if ($step4['step_title4']) : ?>
                            <h4 class="step-title"><?php echo esc_html($step4['step_title4']); ?></h4>
                        <?php endif; ?>
                        <?php if ($step4['step_description4']) : ?>
                            <span class="step-title"><?php echo esc_html($step4['step_description4']); ?></span>
                        <?php endif; ?>
            <?php if ($step4['paragraph4']) : ?>
                <p class="step-description"><?php echo esc_html($step4['paragraph4']); ?></p>
            <?php endif; ?>
        </div>
    <?php endif; ?>
    </div>
</div>
</div>


<?php
/**
 * Block Name: SEO Page FAQ
 *
 * @param array $block The block settings and attributes.
 * @param string $content The block inner HTML (empty).
 * @param bool $is_preview True during AJAX preview.
 * @param (int|string) $post_id The post ID this block is saved to.
 */

// Get block fields
$title = get_field('title');
$faq_items = get_field('faq_repeater');

?>

<div class="faq faq--seo container">
    <?php if ($title) : ?>
        <h2 class="faq__title"><?php echo esc_html($title); ?></h2>
    <?php endif; ?>

    <?php
    // Retrieve ACF fields
    $faq_group = get_field('faq_repeater');

    if ($faq_group) {
        foreach ($faq_group as $faq) {
            $section_title = $faq['title'];
            $questions = $faq['questions_list'];

            echo '<div class="faq__section">';
            echo '<h2 class="faq__section-title">' . esc_html($section_title) . '</h2>';

            if ($questions) {
                echo '<div class="faq__content">';
                foreach ($questions as $question) {
                    $question_title = $question['question'];
                    $answer = $question['answer'];

                    echo '<div class="faq__item">';
                    echo '<h3 class="faq__question">' . esc_html($question_title) . '</h3>';
                    echo '<div class="faq__answer">' . wpautop($answer) . '</div>';
                    echo '</div>'; // faq-item
                }
                echo '</div>'; // faq-items
            }

            echo '</div>'; // faq-section
        }
    }
    ?>
</div>



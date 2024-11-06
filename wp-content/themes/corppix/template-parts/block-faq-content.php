<?php
/**
 * Block Name: FAQ
 *
 * @param array $block The block settings and attributes.
 * @param string $content The block inner HTML (empty).
 * @param bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

$page_fields = get_fields();
$post_id     = get_queried_object_id();

// Getting block fields
$additional_class         = ( isset($block['className']) ) ? $block['className'] : '';
$faq_repeater       = getFieldValue($page_fields, 'faq_repeater');
$faq_title          = getFieldValue($page_fields, 'faq_title');
$faq_form_shortcode = getFieldValue($page_fields, 'faq_form_shortcode');
if($faq_repeater){
?>

<div class="faq-section <?php echo $additional_class; ?>">
	<div class="container faq-section__container">
        <div class="faq-section__wrapper">
	<?php
		foreach($faq_repeater as $item){
			if($item['show_section'] == false){ continue; };
			echo '<div class="faq-section__item">';
				echo '<h2 class="faq-section__title" data-role="faq">'.$item['title'].'</h2>';
				echo '<div class="faq-section__questions" >';
				if(!empty($item['questions_list'])){
					foreach($item['questions_list'] as $question){
						if($question['show_question'] == false){ continue; };
						echo '
							<div class="faq-section__question-wrapper">
								<h4 class="faq-section__question">'.$question['question'].'</h4>
								<div class="faq-section__answer">'.do_shortcode( wpautop($question['answer']) ).'</div>
							</div>
						';
					}
				}
				echo '</div>';
			echo '</div>';
		}
	?>
        </div>
        <div class="faq-form-section">
            <div class="faq-form-section__wrapper">
                <h2 class="faq-form-section__title"><?php echo $faq_title; ?></h2>
	            <?php echo do_shortcode($faq_form_shortcode); ?>
<!--				--><?php //echo do_shortcode('[contact-form-7 id="200" title="Ask us anything"]'); ?>
            </div>
        </div>
	</div>
</div>
<?php } ?>
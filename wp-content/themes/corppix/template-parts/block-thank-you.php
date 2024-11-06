<?php
/**
 * Block Name: Benefits block
 *
 * @param array $block The block settings and attributes.
 * @param string $content The block inner HTML (empty).
 * @param bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

$page_fields = get_fields();
$post_id     = get_queried_object_id();
global $global_options;
// Getting block fields
$additional_class         = ( isset($block['className']) ) ? $block['className'] : '';
$title       = getFieldValue($page_fields, 'title');
$text       = getFieldValue($page_fields, 'text');
$image       = getFieldValue($page_fields, 'image');
$social_media_title       = getFieldValue($page_fields, 'social_media_title');
$social_links_repeater      = getFieldValue($global_options, 'social_links');
?>

<div class="thank-you-section <?php echo $additional_class; ?>">
	<div class="container thank-you-section__container">
		<?php
			if($title){
				echo '<h1 class="thank-you-section__title">'.do_shortcode($title).'</h1>';
			}
			if($text){
				echo '<div class="thank-you-section__text-wrapper">';
					echo '<div class="thank-you-section__text">'.do_shortcode($text).'</div>';
				echo '</div>';
			}
			if($image){
				echo '<div class="thank-you-section__image-wrapper">';
					echo '<img src="#" data-src="'.$image['url'].'" alt="'.$image['alt'].'" width="'.$image['width'].'" height="'.$image['height'].'" class="lozad thank-you-section__image" />';
				echo '</div>';
			}
		?>	
		<div class="thank-you-section__socials">
			<div class="bubbels bubbels-1 rellax" ></div>
			<div class="bubbels bubbels-2 rellax" ></div>
			<div class="bubbels bubbels-3 rellax"></div>
			<div class="bubbels bubbels-4 rellax" ></div>
			<div class="bubbels bubbels-5 rellax" ></div>
			<div class="bubbels bubbels-6 rellax"></div>
			<?php
					if ( $social_media_title ) {
							echo '<h5 class="thank-you-section__socials-title">'.do_shortcode($social_media_title).'</h5>';
					}
			?>
			<?php if ( $social_links_repeater ) { ?>
					
					<div class="thank-you-section__socials-links">
							<?php
							foreach ( $social_links_repeater as $item ) {
									$link  = $item['link'];
									$name  = $item['name'];
									?>
									<a href="<?php echo $link; ?>"
										target="_blank"
										class="thank-you-section__socials-link social-link thank-you-section__socials-link_<?php echo strtolower($name); ?>">
									</a>
							<?php } ?>
					</div>
			<?php } ?>
		</div>
	</div>
</div>
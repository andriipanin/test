<?php
/**
 * Block Name: Our Partners
 *
 * @param array $block The block settings and attributes.
 * @param string $content The block inner HTML (empty).
 * @param bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

$page_fields = get_fields();
//$post_id     = get_queried_object_id();

// Getting block fields
$additional_class         = ( isset($block['className']) ) ? $block['className'] : '';
$partners_title       = getFieldValue($page_fields, 'partners_title');
$partners       = getFieldValue($page_fields, 'partners');
if(!empty($partners)){
?>

<div class="our-partners <?php echo $additional_class; ?>">
	<div class="container our-partners__container">
	<?php
		if($partners_title){
			echo '<h2 class="our-partners__title">'.$partners_title.'</h2>';
		}
		echo '<div class="our-partners__wrapper">';
		foreach($partners as $item){
			if(!empty($item['logos'])){
				echo '<div class="our-partners__block">';
					if($item['title']){
						echo '<h3 class="our-partners__block-title">'.$item['title'].'</h3>';
					}
					echo '<div class="our-partners__block-wrapper">';
					foreach($item['logos'] as $logo){
						echo '
							<div class="our-partners__block-item">
								<div class="our-partners__block-logo-bg" style="background-image:url('.$logo['logo']['url'].')">
									<img src="'.$logo['logo']['url'].'" alt="'.$logo['logo']['alt'].'" width="'.$logo['logo']['width'].'" height="'.$logo['logo']['height'].'" class="our-partners__block-logo" />
								</div>
							</div>
						';
					}
					echo '</div>';
				echo '</div>';
			}
			
		}
		echo '</div>';
	?>	
	</div>
</div>
<?php } ?>
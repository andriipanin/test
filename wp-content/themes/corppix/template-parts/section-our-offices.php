<?php
global $global_options;

// Getting block fields
$offices_title   = getFieldValue($global_options, 'offices_title');
$offices   = getFieldValue($global_options, 'offices');
$block_form_sticky = '';
if(isset($args['type']) && $args['type'] == 'fixed'){
	$block_form_sticky	= 'id="bottom-section"';
}

$hide_office_section = true; // Set to true to hide the section

?>
<?php if (!$hide_office_section) : ?>

<div class="our-offices-section our-offices-section-grey" <?php echo $block_form_sticky; ?>>
	<div class="container our-offices-section__container">
	<?php
		if($offices_title){
			echo '<h2 class="our-offices-section__title">'.$offices_title.'</h2>';
		}
		if($offices){
			echo '<div class="our-offices-section__locations">';
			foreach($offices as $item){
				echo '<div class="our-offices-section__location">';
					echo '<div class="our-offices-section__image-wrapper">';
					echo '<a href="'.$item['google_maps_url'].'" class="our-offices-section__link">'.wp_get_attachment_image( $item['image']['ID'], 'thumbnail', "", array( "class" => "our-offices-section__image" ) ).'</a>';
					echo '</div>';
					echo '<a href="'.$item['google_maps_url'].'" class="our-offices-section__info">';
						if($item['country']){
							echo '<span class="our-offices-section__country">'.$item['country'].'</span>';
						}
						if($item['street']){
							echo '<span class="our-offices-section__street">'.$item['street'].'</span>';
						}
						if($item['city']){
							echo '<span class="our-offices-section__city">'.$item['city'].'</span>';
						}
					echo '</a>';
				echo '</div>';
			}
			echo '</div>';
		}
	?>
	</div>
</div>
<?php endif; ?>
<?php
/**
 * Block Name: Top Banner block
 *
 * @param array $block The block settings and attributes.
 * @param string $content The block inner HTML (empty).
 * @param bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */
if(is_search()){
    global $global_options;
    $page_fields = $global_options;
}else{
    $page_for_posts = get_option( 'page_for_posts' );
    $page_fields = get_fields($page_for_posts);
    
    $curent = get_queried_object();
    if($curent->ID == $page_for_posts){
        $page_fields = get_fields($page_for_posts);
    }else{
        $page_fields = get_fields($curent);
    }
}


// Getting block fields
$image_url                = getFieldValue($page_fields, 'image');
$image_url_mobile                = getFieldValue($page_fields, 'image_mobile');

$title                  = getFieldValue($page_fields, 'title');
if(!is_search() && !$title){
    if($curent->ID == $page_for_posts){
        $title = $curent->post_title;
    }else{
        $title = $curent->name;
    }
}
// Getting final image URL
$banner_image_url   = $image_url;
$detect = new Mobile_Detect;
// Any mobile device (phones or tablets).
if ( $detect->isMobile() && !$detect->isTablet() && $image_url_mobile ) {
    $banner_image_url = $image_url_mobile;
}
?>

<div class="top-banner resources-top-banner">
    <?php
    if ( $banner_image_url ) {
        echo '<div class="top-banner__image top-banner__overlay"></div>';
        echo '<img src="#" data-src="'.$banner_image_url.'" alt="top image" class="top-banner__image resources-top-banner__image lozad" />';
    }
    ?>
	<div class="container top-banner__container resources-top-banner__container">
		<div class="top-banner__content resources-top-banner__content wow animate__fadeInUp">
			<?php
            echo '<h1>'.do_shortcode( $title ).'</h1>'; ?>
		</div>
	</div>
</div>
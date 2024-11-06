<?php
/**
 * Block Name: Top Banner block
 *
 * @param array $block The block settings and attributes.
 * @param string $content The block inner HTML (empty).
 * @param bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

$page_fields = get_fields();
global $post;
// Getting block fields
$additional_class         = ( isset($block['className']) ) ? $block['className'] : '';
$image_url                = getFieldValue($page_fields, 'banner_image');
$image_url_mobile                = getFieldValue($page_fields, 'banner_image_mobile');

$title                  = getFieldValue($page_fields, 'title');
$author                  = getFieldValue($page_fields, 'author');
if(!$title){
    $title = get_the_title();
}
// Getting final image URL
$detect = new Mobile_Detect;
// Any mobile device (phones or tablets).
if ( $detect->isMobile() && !$detect->isTablet() && $image_url_mobile ) {
    $image_url = $image_url_mobile;
}
?>

<div class="top-banner blog-top-banner <?php echo $additional_class; ?>">
    <?php
    if ( $image_url ) {
        echo '<div class="top-banner__image top-banner__overlay"></div>';
        echo '<img src="#" data-src="'.$image_url.'" alt="top image" class="top-banner__image  blog-top-banner__image lozad" />';
    }
    ?>
	<div class="container top-banner__container blog-top-banner__container">
		<div class="top-banner__content blog-top-banner__content wow animate__fadeInUp">
            <button onclick="history.back()" class="blog-top-banner__back">
                <svg width="11" height="21" viewBox="0 0 11 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.4555 18.901L1.92947 10.1545L10.4555 1.40799C10.6081 1.25172 10.6936 1.04194 10.6936 0.823491C10.6936 0.605043 10.6081 0.395262 10.4555 0.238991C10.3813 0.163325 10.2928 0.103213 10.1952 0.0621751C10.0975 0.0211376 9.99265 -3.07142e-08 9.88672 -3.53447e-08C9.78079 -3.99752e-08 9.67592 0.0211376 9.57826 0.0621751C9.4806 0.103213 9.39211 0.163325 9.31797 0.238991L0.24597 9.54374C0.086696 9.70714 -0.00244565 9.9263 -0.00244566 10.1545C-0.00244567 10.3827 0.086696 10.6018 0.24597 10.7652L9.31622 20.07C9.39041 20.1462 9.47912 20.2068 9.5771 20.2481C9.67509 20.2895 9.78036 20.3108 9.88672 20.3108C9.99307 20.3108 10.0984 20.2895 10.1963 20.2481C10.2943 20.2068 10.383 20.1462 10.4572 20.07C10.6099 19.9137 10.6953 19.7039 10.6953 19.4855C10.6953 19.267 10.6099 19.0573 10.4572 18.901L10.4555 18.901Z" fill="white"/>
                </svg>
            </button>
			<?php
                $cat = get_the_category( $post->ID );
                echo '
                    <div class="blog-top-banner__category-wrapper">
                        <a href="' . esc_url( get_category_link( $cat[0]->term_id ) ) . '" class="blog-top-banner__category">'. $cat[0]->name .'</a>
                    </div> 
                ';
                echo '<h1 class="blog-top-banner__title">'.do_shortcode( $title ).'</h1>'; 
            ?>
            <?php if (!empty($author)){ ?>
            <div class="blog-top-banner__author">By <?php echo $author; ?></div>
            <?php } ?>
		</div>
	</div>
</div>
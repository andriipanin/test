<?php
// Collect all ACF option fields to global variable
global $global_options;

if ( function_exists('get_fields') ) {
	$global_options = get_fields('theme-general-settings');
}

/**
 * Main theme's class init
 */
$corppix = new Corppix();
add_action( 'after_setup_theme', array( $corppix, 'px_site_setup' ) );


/**
 * Sanitize uploaded file name
 */
add_filter( 'sanitize_file_name', array( $corppix, 'custom_sanitize_file_name' ), 10, 1 );


/**
 * Set custom upload size limit
 */
$corppix->px_custom_upload_size_limit( 50 );


/**
 * Remove tag <p> и <br> in plugin contact form.
 */
add_filter( 'wpcf7_autop_or_not', '__return_false' );

/**
 * Enable to upload SVG images
 * @param $mimes
 * @return mixed
 */
function cc_mime_types( $mimes )
{
	$mimes['svg'] = 'image/svg+xml';
	return $mimes;
}

add_filter( 'upload_mimes', 'cc_mime_types' );



/**
 * Check field and return its value or return null
 *
 * @param $dataArr
 * @param $key
 * @return mixed|null
 */
function getFieldValue($dataArr, $key) {
	return ( isset( $dataArr[$key] ) ) ? $dataArr[$key] : null;
}


/**
 * Init new menu location area
 */
add_action( 'after_setup_theme', 'register_site_menu');
function register_site_menu () {
	register_nav_menu( 'footer', 'Menu in footer' );
}

function my_acf_add_local_field_groups() {
	add_filter('acf_the_content', 'wpautop' );
}
add_action('acf/init', 'my_acf_add_local_field_groups');